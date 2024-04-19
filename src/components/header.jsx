import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <a
        className="brand"
        href="https://gsap.com"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="greensock-icon"
          src="https://gsap.com/_img/codepen/gsap-white.svg"
          width="100"
        />
      </a>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/images">Images</Link>
          </li>
          <li>
            <Link to="/layers">Layers</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
