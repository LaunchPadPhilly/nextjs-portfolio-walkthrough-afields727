"use client";
import { useEffect, useRef } from 'react';

const StarTrekEffect = () => {
  const canvasRef = useRef(null);
  const codeEditorRef = useRef(null);
  const errorRef = useRef(null);
  const indicatorRef = useRef(null);
  const btnToggleViewRef = useRef(null);
  const btnToggleResolutionRef = useRef(null);

  useEffect(() => {
    /*********\n     * made by Matthias Hurrle (@atzedent)\n     */
    let editMode = false // set to false to hide the code editor on load
    let resolution = .5 // set 1 for full resolution or to .5 to start with half resolution on load
    let renderDelay = 1000 // delay in ms before rendering the shader after a change
    let dpr = Math.max(1, resolution * window.devicePixelRatio)
    let frm, source, editor, store, renderer, pointers
    const shaderId = 'Star Treck'

    const canvas = canvasRef.current;
    const codeEditor = codeEditorRef.current;
    const error = errorRef.current;
    const indicator = indicatorRef.current;
    const btnToggleView = btnToggleViewRef.current;
    const btnToggleResolution = btnToggleResolutionRef.current;

    function resize() {
      if(!canvas) return;
      const { innerWidth: width, innerHeight: height } = window

      canvas.width = width * dpr
      canvas.height = height * dpr

      if (renderer) {
        renderer.updateScale(dpr)
      }
    }
    function toggleView() {
      if(editor) editor.hidden = btnToggleView.checked
    }
    function reset() {
      let shader = source
      if(editor) editor.text = shader ? shader.textContent : renderer.defaultSource
      if(store) store.putShaderSource(shaderId, editor.text)
      renderThis()
    }
    function toggleResolution() {
      resolution = btnToggleResolution.checked ? .5 : 1
      dpr = Math.max(1, resolution * window.devicePixelRatio)
      if(pointers) pointers.updateScale(dpr)
      resize()
    }
    function loop(now) {
      if(renderer && pointers) {
        renderer.updateMouse(pointers.first)
        renderer.updatePointerCount(pointers.count)
        renderer.updatePointerCoords(pointers.coords)
        renderer.updateMove(pointers.move)
        renderer.render(now)
      }
      frm = requestAnimationFrame(loop)
    }
    function renderThis() {
      if(editor) editor.clearError()
      if(store) store.putShaderSource(shaderId, editor.text)

      const result = renderer.test(editor.text)

      if (result) {
        if(editor) editor.setError(result)
      } else {
        if(renderer) renderer.updateShader(editor.text)
      }
      cancelAnimationFrame(frm) // Always cancel the previous frame!
      loop(0)
    }
    const debounce = (fn, delay) => {
      let timerId
      return (...args) => {
        clearTimeout(timerId)
        timerId = setTimeout(() => fn.apply(this, args), delay)
      }
    }
    const render = debounce(renderThis, renderDelay)
    function init() {
      source = document.querySelector("script[type='x-shader/x-fragment']")
      if(!source) return;

      renderer = new Renderer(canvas, dpr)
      pointers = new PointerHandler(canvas, dpr)
      store = new Store(window.location)
      editor = new Editor(codeEditor, error, indicator)
      editor.text = source.textContent
      renderer.setup()
      renderer.init()

      if (!editMode) {
        if(btnToggleView) btnToggleView.checked = true
        toggleView()
      }
      if (resolution === .5) {
        if(btnToggleResolution) btnToggleResolution.checked = true
        toggleResolution()
      }
      canvas.addEventListener('shader-error', e => editor.setError(e.detail))

      resize()

      if (renderer.test(source.textContent) === null) {
        renderer.updateShader(source.textContent)
      }
      loop(0)
      window.onresize = resize
    }
    class Renderer {
      #vertexSrc = "#version 300 es\nprecision highp float;\nin vec4 position;\nvoid main(){gl_Position=position;}"
      #fragmtSrc = "#version 300 es\nprecision highp float;\nout vec4 O;\nuniform float time;\nuniform vec2 resolution;\nvoid main() {\n\tvec2 uv=gl_FragCoord.xy/resolution;\n\tO=vec4(uv,sin(time)*.5+.5,1);\n}"
      #vertices = [-1, 1, -1, -1, 1, 1, 1, -1]
      constructor(canvas, scale) {
        this.canvas = canvas
        this.scale = scale
        this.gl = canvas.getContext("webgl2")
        this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale)
        this.shaderSource = this.#fragmtSrc
        this.mouseMove = [0, 0]
        this.mouseCoords = [0, 0]
        this.pointerCoords = [0, 0]
        this.nbrOfPointers = 0
      }
      get defaultSource() { return this.#fragmtSrc }
      updateShader(source) {
        this.reset()
        this.shaderSource = source
        this.setup()
        this.init()
      }
      updateMove(deltas) {
        this.mouseMove = deltas
      }
      updateMouse(coords) {
        this.mouseCoords = coords
      }
      updatePointerCoords(coords) {
        this.pointerCoords = coords
      }
      updatePointerCount(nbr) {
        this.nbrOfPointers = nbr
      }
      updateScale(scale) {
        this.scale = scale
        this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale)
      }
      compile(shader, source) {
        const gl = this.gl
        gl.shaderSource(shader, source)
        gl.compileShader(shader)

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error(gl.getShaderInfoLog(shader))
          this.canvas.dispatchEvent(new CustomEvent('shader-error', { detail: gl.getShaderInfoLog(shader) }))
        }
      }
      test(source) {
        let result = null
        const gl = this.gl
        const shader = gl.createShader(gl.FRAGMENT_SHADER)
        gl.shaderSource(shader, source)
        gl.compileShader(shader)

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          result = gl.getShaderInfoLog(shader)
        }
        if (gl.getShaderParameter(shader, gl.DELETE_STATUS)) {
          gl.deleteShader(shader)
        }
        return result
      }
      reset() {
        const { gl, program, vs, fs } = this
        if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return
        if (gl.getShaderParameter(vs, gl.DELETE_STATUS)) {
          gl.detachShader(program, vs)
          gl.deleteShader(vs)
        }
        if (gl.getShaderParameter(fs, gl.DELETE_STATUS)) {
          gl.detachShader(program, fs)
          gl.deleteShader(fs)
        }
        gl.deleteProgram(program)
      }
      setup() {
        const gl = this.gl
        this.vs = gl.createShader(gl.VERTEX_SHADER)
        this.fs = gl.createShader(gl.FRAGMENT_SHADER)
        this.compile(this.vs, this.#vertexSrc)
        this.compile(this.fs, this.shaderSource)
        this.program = gl.createProgram()
        gl.attachShader(this.program, this.vs)
        gl.attachShader(this.program, this.fs)
        gl.linkProgram(this.program)

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
          console.error(gl.getProgramInfoLog(this.program))
        }
      }
      init() {
        const { gl, program } = this
        this.buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.#vertices), gl.STATIC_DRAW)

        const position = gl.getAttribLocation(program, "position")

        gl.enableVertexAttribArray(position)
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

        program.resolution = gl.getUniformLocation(program, "resolution")
        program.time = gl.getUniformLocation(program, "time")
        program.move = gl.getUniformLocation(program, "move")
        program.touch = gl.getUniformLocation(program, "touch")
        program.pointerCount = gl.getUniformLocation(program, "pointerCount")
        program.pointers = gl.getUniformLocation(program, "pointers")
      }
      render(now = 0) {
        const { gl, program, buffer, canvas, mouseMove, mouseCoords, pointerCoords, nbrOfPointers } = this
        
        if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return

        gl.clearColor(0, 0, 0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.useProgram(program)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.uniform2f(program.resolution, canvas.width, canvas.height)
        gl.uniform1f(program.time, now * 1e-3)
        gl.uniform2f(program.move, ...mouseMove)
        gl.uniform2f(program.touch, ...mouseCoords)
        gl.uniform1i(program.pointerCount, nbrOfPointers)
        gl.uniform2fv(program.pointers, pointerCoords)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }
    }
    class Store {
      constructor(key) {
        this.key = key
        this.store = window.localStorage
      }
      #ownShadersKey = 'ownShaders'
      #StorageType = Object.freeze({
        shader: 'fragmentSource',
        config: 'config'
      })
      #getKeyPrefix(type) {
        return `${type}${btoa(this.key)}`
      }
      #getKey(type, name) {
        return `${this.#getKeyPrefix(type)}${btoa(name)}`
      }
      putShaderSource(name, source) {
        const storageType = this.#StorageType.shader
        this.store.setItem(this.#getKey(storageType, name), source)
      }
      getShaderSource(name) {
        const storageType = this.#StorageType.shader
        return this.store.getItem(this.#getKey(storageType, name))
      }
      deleteShaderSource(name) {
        const storageType = this.#StorageType.shader
        this.store.removeItem(this.#getKey(storageType, name))
      }
      /** @returns {{title:string, uuid:string}[]} */
      getOwnShaders() {
        const storageType = this.#StorageType.config
        const result = this.store.getItem(this.#getKey(storageType, this.#ownShadersKey))
        
        return result ? JSON.parse(result) : []
      }
      /** @param {{title:string, uuid:string}[]} shader */
      putOwnShader(shader) {
        const ownShaders = this.getOwnShaders()
        const storageType = this.#StorageType.config
        const index = ownShaders.findIndex((s) => s.uuid === shader.uuid)
        if (index === -1) {
          ownShaders.push(shader)
        } else {
          ownShaders[index] = shader
        }
        this.store.setItem(this.#getKey(storageType, this.#ownShadersKey), JSON.stringify(ownShaders))
      }
      deleteOwnShader(uuid) {
        const ownShaders = this.getOwnShaders()
        const storageType = this.#StorageType.config
        this.store.setItem(this.#getKey(storageType, this.#ownShadersKey), JSON.stringify(ownShaders.filter((s) => s.uuid !== uuid) ))
        this.deleteShaderSource(uuid)
      }
      /** @param {string[]} keep The names of the shaders to keep*/
      cleanup(keep=[]) {
        const storageType = this.#StorageType.shader
        const ownShaders = this.getOwnShaders().map((s) => this.#getKey(storageType, s.uuid))
        const premadeShaders = keep.map((name) => this.#getKey(storageType, name))
        const keysToKeep = [...ownShaders, ...premadeShaders]
        const result = []

        for (let i = 0; i < this.store.length; i++) {
          const key = this.store.key(i)

          if (key.startsWith(this.#getKeyPrefix(this.#StorageType.shader)) && !keysToKeep.includes(key)) {
            result.push(key)
          }
        }

        result.forEach((key) => this.store.removeItem(key))
      }
    }
    class PointerHandler {
      constructor(element, scale) {
        this.scale = scale
        this.active = false
        this.pointers = new Map()
        this.lastCoords = [0,0]
        this.moves = [0,0]
        const map = (element, scale, x, y) => [x * scale, element.height - y * scale]
        element.addEventListener("pointerdown", (e) => {
          this.active = true
          this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY))
        })
        element.addEventListener("pointerup", (e) => {
          if (this.count === 1) {
            this.lastCoords = this.first
          }
          this.pointers.delete(e.pointerId)
          this.active = this.pointers.size > 0
        })
        element.addEventListener("pointerleave", (e) => {
          if (this.count === 1) {
            this.lastCoords = this.first
          }
          this.pointers.delete(e.pointerId)
          this.active = this.pointers.size > 0
        })
        element.addEventListener("pointermove", (e) => {
          if (!this.active) return
          this.lastCoords = [e.clientX, e.clientY]
          this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY))
          this.moves = [this.moves[0]+e.movementX, this.moves[1]+e.movementY]
        })
      }
      getScale() {
        return this.scale
      }
      updateScale(scale) { this.scale = scale }
      reset() {
        this.pointers.clear()
        this.active = false
        this.moves = [0,0]
      }
      get count() {
        return this.pointers.size
      }
      get move() {
        return this.moves
      }
      get coords() {
        return this.pointers.size > 0 ? Array.from(this.pointers.values()).map((p) => [...p]).flat() : [0, 0]
      }
      get first() {
        return this.pointers.values().next().value || this.lastCoords
      }
    }
    class Editor {
      constructor(textarea, errorfield, errorindicator) {
        this.textarea = textarea
        this.errorfield = errorfield
        this.errorindicator = errorindicator
        textarea.addEventListener('keydown', this.handleKeydown.bind(this))
        textarea.addEventListener('scroll', this.handleScroll.bind(this))
      }
      get hidden() { return this.textarea.classList.contains('hidden') }
      set hidden(value) { value ? this.#hide() : this.#show() }
      get text() { return this.textarea.value }
      set text(value) { this.textarea.value = value }
      get scrollTop() { return this.textarea.scrollTop }
      set scrollTop(value) { this.textarea.scrollTop = value }
      setError(message) {
        this.errorfield.innerHTML = message
        this.errorfield.classList.add('opaque')
        const match = message.match(/ERROR: \d+:(\d+):/)
        const lineNumber = match ? parseInt(match[1]) : 0
        const overlay = document.createElement('pre')

        overlay.classList.add('overlay')
        overlay.textContent = '\n'.repeat(lineNumber)

        document.body.appendChild(overlay)

        const offsetTop = parseInt(getComputedStyle(overlay).height)

        this.errorindicator.style.setProperty('--top', offsetTop + 'px')
        this.errorindicator.style.visibility = 'visible'

        document.body.removeChild(overlay)
      }
      clearError() {
        this.errorfield.textContent = ''
        this.errorfield.classList.remove('opaque')
        this.errorfield.blur()
        this.errorindicator.style.visibility = 'hidden'
      }
      focus() {
        this.textarea.focus()
      }
      #hide() {
        for (const el of [this.errorindicator, this.errorfield, this.textarea]) {
          el.classList.add('hidden')
        }
      }
      #show() {
        for (const el of [this.errorindicator, this.errorfield, this.textarea]) {
          el.classList.remove('hidden')
        }
        this.focus()
      }
      handleScroll() {
        this.errorindicator.style.setProperty('--scroll-top', `${this.textarea.scrollTop}px`)
      }
      handleKeydown(event) {
        if (event.key === "Tab") {
          event.preventDefault()
          this.handleTabKey(event.shiftKey)
        } else if (event.key === "Enter") {
          event.preventDefault()
          this.handleEnterKey()
        }
      }
      handleTabKey(shiftPressed) {
        if (this.#getSelectedText() !== "") {
          if (shiftPressed) {
            this.#unindentSelectedText()
            return
          }
          this.#indentSelectedText()
        } else {
          this.#indentAtCursor()
        }
      }
      #getSelectedText() {
        const editor = this.textarea
        const start = editor.selectionStart
        const end = editor.selectionEnd
        return editor.value.substring(start, end)
      }
      #indentAtCursor() {
        const editor = this.textarea
        const cursorPos = editor.selectionStart

        document.execCommand('insertText', false, '\t')
        editor.selectionStart = editor.selectionEnd = cursorPos + 1
      }
      #indentSelectedText() {
        const editor = this.textarea
        const cursorPos = editor.selectionStart
        const selectedText = this.#getSelectedText()
        const lines = selectedText.split('\n')
        const indentedText = lines.map(line => '\t' + line).join('\n')

        document.execCommand('insertText', false, indentedText)
        editor.selectionStart = cursorPos
      }
      #unindentSelectedText() {
        const editor = this.textarea
        const cursorPos = editor.selectionStart
        const selectedText = this.#getSelectedText()
        const lines = selectedText.split('\n')
        const indentedText = lines.map(line => line.replace(/^\t/, '').replace(/^ /, '')).join('\n')

        document.execCommand('insertText', false, indentedText)
        editor.selectionStart = cursorPos
      }
      handleEnterKey() {
        const editor = this.textarea
        const visibleTop = editor.scrollTop
        const cursorPosition = editor.selectionStart

        let start = cursorPosition - 1
        while (start >= 0 && editor.value[start] !== '\n') {
          start--
        }

        let newLine = ''
        while (start < cursorPosition - 1 && (editor.value[start + 1] === ' ' || editor.value[start + 1] === '\t')) {
          newLine += editor.value[start + 1]
          start++
        }

        document.execCommand('insertText', false, '\n' + newLine)
        editor.selectionStart = editor.selectionEnd = cursorPosition + 1 + newLine.length
        editor.scrollTop = visibleTop // Prevent the editor from scrolling
        const lineHeight = editor.scrollHeight / editor.value.split('\n').length
        const line = editor.value.substring(0, cursorPosition).split('\n').length

        // Do the actual layout calculation in order to get the correct scroll position
        const visibleBottom = editor.scrollTop + editor.clientHeight
        const lineTop = lineHeight * (line - 1)
        const lineBottom = lineHeight * (line + 2)

        // If the cursor is outside the visible range, scroll the editor
        if (lineTop < visibleTop) editor.scrollTop = lineTop
        if (lineBottom > visibleBottom) editor.scrollTop = lineBottom - editor.clientHeight
      }
    }

    init();
    
    const handleKeyDown = (e) => {
      if (e.key === "L" && e.ctrlKey) {
        e.preventDefault();
        if(btnToggleView) btnToggleView.checked = !btnToggleView.checked;
        toggleView();
      }
    };
    window.addEventListener("keydown", handleKeyDown);


    // Cleanup
    return () => {
      window.onresize = null;
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(frm);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} id="canvas"></canvas>
      <div id="editor-container" style={{ position: 'absolute', top: 0, left: 0, zIndex: 10, display: 'none' }}>
        <textarea ref={codeEditorRef} id="codeEditor"></textarea>
        <div ref={errorRef} id="error"></div>
        <div ref={indicatorRef} id="indicator"></div>
        <input type="checkbox" ref={btnToggleViewRef} id="btnToggleView" />
        <input type="checkbox" ref={btnToggleResolutionRef} id="btnToggleResolution" />
      </div>
      <script type="x-shader/x-fragment" id="Star Treck">
        {
          `
          #version 300 es
          precision highp float;

          out vec4 O;
          uniform float time;
          uniform vec2 resolution;
          uniform vec2 touch;
          uniform int pointerCount;

          #define MAX_STEPS 64
          #define MAX_DIST 10.
          #define SURF_DIST .001

          #define S(a, b, t) smoothstep(a, b, t)

          mat2 Rot(float a) {
              float s = sin(a);
              float c = cos(a);
              return mat2(c, -s, s, c);
          }

          float sdBox(vec3 p, vec3 s) {
              p = abs(p) - s;
              return length(max(p, 0.)) + min(max(p.x, max(p.y, p.z)), 0.);
          }

          float GetDist(vec3 p) {
              p.z -= 1.;
              
              vec3 p1 = p;
              p1.xy *= Rot(p.z*.1);
              float d = sdBox(p1, vec3(1.5, .5, 100));
              
              vec3 p2 = p;
              p2.xy *= Rot(p.z*.1);
              p2.xy += vec2(S(10., 0., abs(p.z-10.)),0);
              float d2 = sdBox(p2, vec3(.5, 1.5, 100));
              
              d = min(d,d2);
              
              d = abs(d)-.05;
              d = abs(d)-.02;
              
              return d;
          }

          float RayMarch(vec3 ro, vec3 rd) {
              float dO = 0.;
              
              for(int i = 0; i < MAX_STEPS; i++) {
                  vec3 p = ro + rd * dO;
                  float dS = GetDist(p);
                  dO += dS;
                  if(dO > MAX_DIST || abs(dS) < SURF_DIST) break;
              }
              
              return dO;
          }

          vec3 GetNormal(vec3 p) {
              float d = GetDist(p);
              vec2 e = vec2(.001, 0);
              
              vec3 n = d - vec3(
                  GetDist(p-e.xyy),
                  GetDist(p-e.yxy),
                  GetDist(p-e.yyx));
              
              return normalize(n);
          }

          vec3 GetRayDir(vec2 uv, vec3 p, vec3 l, float z) {
              vec3
                  f = normalize(l-p),
                  r = normalize(cross(vec3(0,1,0), f)),
                  u = cross(f,r),
                  c = f*z,
                  i = c + uv.x*r + uv.y*u,
                  d = normalize(i);
              return d;
          }

          void main() {
              vec2 uv = (gl_FragCoord.xy - .5 * resolution.xy) / resolution.y;
              vec2 m = touch.xy / resolution.y;
              
              if(pointerCount == 0) m = vec2(0.);

              vec3 ro = vec3(0, 0, -5. + time);
              ro.xy *= Rot(-time*.1);

              vec3 rd = GetRayDir(uv, ro, vec3(0,0,time), 1.);
              
              float d = RayMarch(ro, rd);
              
              vec3 p = ro + rd * d;
              
              float dif = 1.;
              
              vec3 col = vec3(0);
              
              if(d < MAX_DIST) {
                  vec3 n = GetNormal(p);
                  dif = dot(n, normalize(vec3(1,2,3)));
                  
                  col = vec3(1,0,0) * S(1., .7, d/MAX_DIST);
                  col += .1 * S(.5,1.,dif);
              }
              
              O = vec4(col, 1);
          }
        `
        }
      </script>
    </div>
  );
};

export default StarTrekEffect;