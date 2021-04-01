import { Link } from 'react-router-dom';

interface Props {};

const Navbar = ({}: Props) => {
  return (
    <nav>
      <Link to={{pathname: "/"}}>ホーム</Link>
    </nav>
  )
};
export default Navbar;