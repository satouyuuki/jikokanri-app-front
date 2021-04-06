import { useState } from 'react';
import { api } from 'service/apiService';
import { UserAPI } from 'model/requestModel';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps{ };

const SignUp = ({ history }: Props) => {
  const [form, setForm] = useState({email: '', password: ''});
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
    const res = await api.post<UserAPI[]>('auth/invitation', data);
    // 成功した時
    if (res.data === null) {
      alert('登録しました。入力いただいたメールアドレスを確認ください');
      history.push('/');
    }
  }
  return (
    <div>
      <h1>Sign Up Page</h1>
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
      <button onClick={handleClickSubmit}>登録</button>
    </div>
  )
}

export default SignUp;