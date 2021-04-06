import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Cookie } from 'service/cookieService';

interface Props extends RouteComponentProps {
  cookie: Cookie;
};

const Navbar = ({ cookie, history }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    cookie.token = '';
    alert('ログアウトしました');
    history.push('/');
  }
  return (
    <>
      {cookie.isLoggedIn
        ? <nav>
          <Link to={{ pathname: "/" }}>ホーム</Link>
          <a href="#" onClick={handleClick}>ログアウト</a>
        </nav>

        : <div>未ログイン</div>
      }
    </>
  )
};
export default withRouter(Navbar);