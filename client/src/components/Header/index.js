import { Link } from "react-router-dom";
import LoginLogoutButton from "../LoginLogoutButton";
import SignupPage from "../SignupPage";

const Header = ({ children }) => (
  <header>
    <nav className="navbar navbar-expand-lg">
      <Link className="navbar-brand" to="/" id="typecolor">
        Typster
      </Link>

      <button
        type="button"
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbar-content"
        aria-controls="navbar-content"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbar-content">
        <ul className="navbar-nav ml-auto">
          {(!Array.isArray(children) ? [children] : children).map(
            (child, i) => (
              <li key={i} className="nav-item">
                {child}
              </li>
            )
          )}
        </ul>
        <LoginLogoutButton />
        <SignupPage />
      </div>
    </nav>
  </header>
);

export default Header;
