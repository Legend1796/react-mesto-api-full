import logo from '../images/logo.svg';
import { Link, Route } from 'react-router-dom';
function Header({ userEmail, exitProfile }) {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип сайта" />
      <Route exact path="/main">
        <div className="header__nav">
          <p className="header__email">{userEmail}</p>
          <button className="header__link" onClick={exitProfile}>Выйти</button>
        </div>
      </Route>
      <Route path="/signup">
        <Link className="header__link" to="signin">Войти</Link>
      </Route>
      <Route path="/signin">
        <Link className="header__link" to="signup">Регистрация</Link>
      </Route>
    </header>
  )
}

export default Header;