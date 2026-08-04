import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <nav
        className="px-6 py-4 flex justify-between items-center shadow-md"
        style={{ background: '#4A1220', fontFamily: "'Poppins', sans-serif" }}
      >
        <Link
          to="/"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.4rem', color: '#FFF8E9' }}
        >
          Sweet Shop
        </Link>

        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <>
              <span style={{ color: '#E0C89A' }}>Hi, {user.name}</span>

              {user.role === 'admin' && (
                <Link to="/admin" className="hover:underline" style={{ color: '#D4A017', fontWeight: 500 }}>
                  Admin
                </Link>
              )}
              <Link to="/cart" className="hover:underline" style={{ color: '#FFF8E9' }}>
                Cart
              </Link>
              <Link to="/orders" className="hover:underline" style={{ color: '#FFF8E9' }}>
                My Orders
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-full font-medium transition-transform hover:scale-105"
                style={{ background: '#D4A017', color: '#4A1220' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline" style={{ color: '#FFF8E9' }}>
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1.5 rounded-full font-medium"
                style={{ background: '#D4A017', color: '#4A1220' }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;