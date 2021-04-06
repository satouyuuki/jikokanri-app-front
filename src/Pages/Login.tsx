import { useState } from 'react';
import { api } from 'service/apiService';
import { Cookie } from 'service/cookieService'
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Props extends RouteComponentProps { 
  cookie: Cookie;
};
const Login = ({ cookie, history }: Props) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const currentForm = form;
    if (target.id === 'email') {
      currentForm.email = target.value;
    }
    if (target.id === 'password') {
      currentForm.password = target.value;
    }
    setForm(currentForm);
  }
  const handleClickSubmit = async () => {
    const data = {
      username: form.email,
      password: form.password
    }
    const res = await api.post<any>('auth/sign_in', data);
    if (res.data.access_token) {
      alert('ログイン成功しました');
      cookie.token = res.data.access_token;
      history.push('/');
    }
  }
  return (
    <div>
      <h1>Log In Page</h1>
      <input type="text"
        id="email"
        placeholder="email"
        onChange={handleChange}
      />
      <input type="text"
        id="password"
        placeholder="password"
        onChange={handleChange}
      />
      <button onClick={handleClickSubmit}>ログイン</button>
    </div>
  )
}

export default withRouter(Login);