"use client";
import { useEffect, useRef } from 'react';

const SunsetBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let renderer, pointers, canvas;
    const dpr = Math.max(1, .5 * devicePixelRatio);

    const resize = () => {
      const { innerWidth: width, innerHeight: height } = window;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      if (renderer) {
        renderer.updateScale(dpr);
      }
    };

    const source = document.querySelector("script[type='x-shader/x-fragment']").textContent;

    canvas = canvasRef.current;
    
    // Applying styles directly to the canvas element
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "-1";
    canvas.style.objectFit = "cover";
    canvas.style.userSelect = "none";


    renderer = new Renderer(canvas, dpr);
    pointers = new PointerHandler(canvas, dpr);
    renderer.setup();
    renderer.init();

    resize();

    if (renderer.test(source) === null) {
      renderer.updateShader(source);
    }

    window.onresize = resize;

    const loop = (now) => {
      renderer.updateMouse(pointers.first);
      renderer.updatePointerCount(pointers.count);
      renderer.updatePointerCoords(pointers.coords);
      renderer.render(now);
      requestAnimationFrame(loop);
    };
    loop(0);

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
          program.touch = gl.getUniformLocation(program, "touch")
          program.pointerCount = gl.getUniformLocation(program, "pointerCount")
          program.pointers = gl.getUniformLocation(program, "pointers")
        }
        render(now = 0) {
          const { gl, program, buffer, canvas, mouseCoords, pointerCoords, nbrOfPointers } = this
          
          if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return
      
          gl.clearColor(0, 0, 0, 1)
          gl.clear(gl.COLOR_BUFFER_BIT)
          gl.useProgram(program)
          gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
          gl.uniform2f(program.resolution, canvas.width, canvas.height)
          gl.uniform1f(program.time, now * 1e-3)
          gl.uniform2f(program.touch, ...mouseCoords)
          gl.uniform1i(program.pointerCount, nbrOfPointers)
          gl.uniform2fv(program.pointers, pointerCoords)
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        }
      }
      class PointerHandler {
        constructor(element, scale) {
          this.scale = scale
          this.active = false
          this.pointers = new Map()
          this.lastCoords = [0,0]
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
          })
        }
        getScale() {
          return this.scale
        }
        updateScale(scale) { this.scale = scale }
        get count() {
          return this.pointers.size
        }
        get coords() {
          return this.pointers.size > 0 ? Array.from(this.pointers.values()).map((p) => [...p]).flat() : [0, 0]
        }
        get first() {
          return this.pointers.values().next().value || this.lastCoords
        }
      }


    return () => {
      window.onresize = null;
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} />
      <script type="x-shader/x-fragment" id="shader">
        {`#version 300 es\n\nprecision highp float;\nout vec4 O;\nuniform vec2 resolution;\nuniform float time;\nuniform sampler2D pebbles;\n#define FC gl_FragCoord.xy\n#define T time\n#define R resolution\n#define MN min(R.x,R.y)\n// Returns a pseudo random number for a given point (white noise)\nfloat rnd(vec2 p) {\n  p=fract(p*vec2(12.9898,78.233));\n  p+=dot(p,p+34.56);\n  return fract(p.x*p.y);\n}\n// Returns a pseudo random number for a given point (value noise)\nfloat noise(in vec2 p) {\n  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);\n  float\n  a=rnd(i),\n  b=rnd(i+vec2(1,0)),\n  c=rnd(i+vec2(0,1)),\n  d=rnd(i+1.);\n  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);\n}\n// Returns a pseudo random number for a given point (fractal noise)\nfloat fbm(vec2 p) {\n  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);\n  for (int i=0; i<5; i++) {\n    t+=a*noise(p);\n    p*=2.*m;\n    a*=.5;\n  }\n  return t;\n}\nfloat clouds(vec2 p) {\n	float d=1., t=.0;\n	for (float i=.0; i<3.; i++) {\n		float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);\n		t=mix(t,d,a);\n		d=a;\n		p*=2./(i+1.);\n	}\n	return t;\n}\nvoid main(void) {\n	vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);\n	vec3 col=vec3(0);\n	float bg=clouds(vec2(st.x+T*.5,-st.y));\n	uv*=1.-.3*(sin(T*.2)*.5+.5);\n	for (float i=1.; i<12.; i++) {\n		uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);\n		vec2 p=uv;\n		float d=length(p);\n		col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);\n		float b=noise(i+p+bg*1.731);\n		col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));\n		col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);\n	}\n	O=vec4(col,1);\n}
`}
      </script>
    </>
  );
};

export default SunsetBackground;
