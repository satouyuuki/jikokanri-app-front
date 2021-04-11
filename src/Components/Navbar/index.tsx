import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Cookie } from 'service/cookieService';

interface Props extends RouteComponentProps {
  cookie: Cookie;
};

const Navbar = ({ cookie, history }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    cookie.value = null;
    alert('ログアウトしました');
    history.push('/');
  }
  return (
    <>
      {cookie.isLoggedIn
        ? <nav>
            <ul>
              <li>
              <Link to={{ pathname: "/" }}>ホーム</Link>
            </li>
            <li>
              <a href="#">{ cookie.value?.email}</a>
              <ul>
                <li>
                  <a href="#" onClick={handleClick}>ログアウト</a>
                </li>
              </ul>
            </li>
            </ul>
        </nav>

        : <div>未ログイン</div>
      }
    </>
  )
};
export default withRouter(Navbar);