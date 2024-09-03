/* eslint-disable no-unused-vars */
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      window.location.href = `http://localhost:5000/api/auth/google?access_token=${credentialResponse.credential}`;
    } catch (error) {
      console.error('Login Failed:', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={handleLoginFailure}
    />
  );
};

export default GoogleLoginButton;
