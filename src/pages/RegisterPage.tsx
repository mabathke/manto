// src/pages/RegisterPage.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface RegisterFormInputs {
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();

  const onSubmit = (data: RegisterFormInputs) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    // Ideally, you'd send the registration data to your backend here
    console.log('User registered with:', data);
    navigate('/login');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('username')} placeholder="Username" required />
        <input {...register('password')} type="password" placeholder="Password" required />
        <input
          {...register('confirmPassword')}
          type="password"
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
