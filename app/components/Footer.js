import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-links">
          <a href="https://github.com/afields727" target="_blank" title="GitHub">⚡</a>
          <a href="#" target="_blank" title="LinkedIn">🔗</a>
          <a href="#" target="_blank" title="Twitter">🐦</a>
          <a href="mailto:afiel0072@launchpadphilly.org" title="Email">📧</a>
        </div>
        <p style={{ color: '#ffffffff', fontSize: '1.1em', marginBottom: '10px' }}>
          Building the future, one project at a time
        </p>
        <p style={{ color: '#fff3f3ff' }}>
          Mental Health Matters • Technology for Good
        </p>
        <p className="copyright">
          © 2025 Aaron Fields. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
