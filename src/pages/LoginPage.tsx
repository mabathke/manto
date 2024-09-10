// src/pages/LoginPage.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';  // <-- Import Link

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    // Simulate login logic
    setIsAuthenticated(true);
    navigate('/home');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('username')} placeholder="Username" required />
        <input {...register('password')} type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>  {/* Add Register link */}
    </div>
  );
};

export default LoginPage;
