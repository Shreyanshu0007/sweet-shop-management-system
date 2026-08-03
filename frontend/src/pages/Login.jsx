import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/login', formData);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'radial-gradient(circle at 50% 0%, #6b1d2e 0%, #4a1220 55%, #2e0b13 100%)',
      }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="relative w-full max-w-sm">
        {/* Gold paisley corner flourish - top left */}
        <svg
          className="absolute -top-6 -left-6 w-16 h-16 opacity-80 pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M10 90 Q10 40 40 30 Q60 22 55 8 Q50 -2 40 5 Q30 12 38 22"
            stroke="#D4A017"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="38" cy="22" r="3" fill="#D4A017" />
        </svg>

        {/* Gold paisley corner flourish - bottom right */}
        <svg
          className="absolute -bottom-6 -right-6 w-16 h-16 opacity-80 pointer-events-none rotate-180"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M10 90 Q10 40 40 30 Q60 22 55 8 Q50 -2 40 5 Q30 12 38 22"
            stroke="#D4A017"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="38" cy="22" r="3" fill="#D4A017" />
        </svg>

        {/* Ribbon tab */}
        <div className="flex justify-center">
          <div
            className="px-6 py-1.5 rounded-t-md text-sm tracking-widest uppercase"
            style={{
              background: 'linear-gradient(180deg, #E8B84B 0%, #D4A017 100%)',
              color: '#4A1220',
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              letterSpacing: '0.15em',
            }}
          >
            Est. Sweet Shop
          </div>
        </div>

        {/* Main card */}
        <div
          className="rounded-lg p-8 shadow-2xl border"
          style={{
            background: '#FFF8E9',
            borderColor: '#D4A017',
            borderWidth: '1.5px',
          }}
        >
          <h1
            className="text-center mb-1"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: '1.9rem',
              color: '#4A1220',
            }}
          >
            Sweet Shop
          </h1>
          <p
            className="text-center mb-6 text-xs tracking-wide"
            style={{ color: '#5C7A52', fontFamily: "'Poppins', sans-serif" }}
          >
            Welcome back — good things await
          </p>

          <form onSubmit={handleSubmit} style={{ fontFamily: "'Poppins', sans-serif" }}>
            {error && (
              <p
                className="text-sm mb-4 px-3 py-2 rounded"
                style={{ background: '#FBE4E4', color: '#8A2E2E' }}
              >
                {error}
              </p>
            )}

            <label className="block text-xs mb-1 font-medium" style={{ color: '#4A1220' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2.5 rounded mb-4 outline-none transition-colors"
              style={{ border: '1.5px solid #E0D0A8', background: '#FFFDF7' }}
              onFocus={(e) => (e.target.style.borderColor = '#D4A017')}
              onBlur={(e) => (e.target.style.borderColor = '#E0D0A8')}
              required
            />

            <label className="block text-xs mb-1 font-medium" style={{ color: '#4A1220' }}>
              Password
            </label>
            <div className="relative mb-6">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2.5 rounded pr-16 outline-none transition-colors"
                style={{ border: '1.5px solid #E0D0A8', background: '#FFFDF7' }}
                onFocus={(e) => (e.target.style.borderColor = '#D4A017')}
                onBlur={(e) => (e.target.style.borderColor = '#E0D0A8')}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium"
                style={{ color: '#5C7A52' }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded font-medium text-sm transition-transform hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(180deg, #6b1d2e 0%, #4A1220 100%)',
                color: '#FFF8E9',
              }}
            >
              Login
            </button>

            <p className="text-sm text-center mt-5" style={{ color: '#6b5540' }}>
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium" style={{ color: '#8A2E2E' }}>
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
