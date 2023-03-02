import LoginForm from '../components/LoginForm';
import AuthDetails from '../components/AuthDetails';

const Login = () => {
  return (
    <div>
      <LoginForm text='Login Here!' />
      <AuthDetails />
    </div>
  );
};


export default Login;