import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { authState } from '../recoil/authAtom';
import banner from '../assets/accessibility-banner.jpg';

const AuthCard = ({ isSignIn }) => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isSignIn ? '/api/auth/login' : '/api/auth/signup';

    try {
      const payload = isSignIn
        ? {
            email: formData.email,
            password: formData.password
          }
        : {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            password: formData.password
          };

      const res = await axios.post(endpoint, payload);
      const { token, user } = res.data;
      setAuth({ user, token, isLoggedIn: true });


      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      navigate('/dashboard');

    } catch (err) {
      setError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden">
      {/* Left Side - Image with Quote */}
      <div className="w-full md:w-1/2 relative">
        <img
          src={banner}
          alt="Accessibility Banner"
          className="w-full h-full object-cover max-h-[500px]"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-start justify-center pt-12 px-6">
          <h2 className="text-2xl font-bold text-center text-yellow-200 drop-shadow-md">
            Accessibility is a Right, Not a Feature.
          </h2>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isSignIn && (
            <>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="w-1/2 p-2 border rounded"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="w-1/2 p-2 border rounded"
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          {!isSignIn && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            {isSignIn ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="text-center text-sm mt-4">
          {isSignIn ? (
            <>
              Not registered?{' '}
              <Link
                to="/signup"
                className="text-green-600 font-medium hover:underline"
              >
                Create an account
              </Link>
            </>
          ) : (
            <>
              Already a user?{' '}
              <Link
                to="/signin"
                className="text-green-600 font-medium hover:underline"
              >
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
