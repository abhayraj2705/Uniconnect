import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user data
      localStorage.setItem('token', data.token);
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      }
      login(data.user);

      // Navigate based on user role
      if (data.user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-1"> {/* Add top padding to account for navbar */}
      <div className="flex min-h-[calc(100vh-80px)] w-full"> {/* Adjust height accounting for navbar */}
        {/* Left side image - hidden on mobile */}
        <div className="w-full hidden md:inline-block">
          <img 
            className="h-full w-full object-cover"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png" 
            alt="Login"
          />
        </div>

        {/* Right side form */}
        <div className="w-full flex flex-col items-center justify-center py-8"> {/* Add vertical padding */}
          <form onSubmit={handleSubmit} className="md:w-96 w-80 flex flex-col items-center justify-center">
            <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
            <p className="text-sm text-gray-500/90 mt-3">Welcome back! Please sign in to continue</p>

            {error && (
              <div className="w-full text-red-500 text-sm text-center mt-4">
                {error}
              </div>
            )}

            <button 
              type="button" 
              className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full"
            >
              <img 
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" 
                alt="Google"
              />
            </button>

            <div className="flex items-center gap-4 w-full my-5">
              <div className="w-full h-px bg-gray-300/90"></div>
              <p className="w-full text-nowrap text-sm text-gray-500/90">or sign in with email</p>
              <div className="w-full h-px bg-gray-300/90"></div>
            </div>

            <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
              </svg>
              <input
                type="email"
                placeholder="Email id"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
                disabled={loading}
              />
            </div>

            <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
              </svg>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
                disabled={loading}
              />
            </div>

            <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-5"
                />
                <label htmlFor="remember" className="text-sm">Remember me</label>
              </div>
              <Link to="/forgot-password" className="text-sm underline">Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>

            <p className="text-gray-500/90 text-sm mt-4">
              Don't have an account? 
              <Link to="/signup" className="text-indigo-400 hover:underline ml-1">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;