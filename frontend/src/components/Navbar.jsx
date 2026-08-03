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
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">Sweet Shop</Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-700">Hi, {user.name}</span>
            {user.role === 'admin' && (
              <Link to="/admin" className="text-blue-600 hover:underline">Admin</Link>
            )}
            <Link to="/cart" className="text-blue-600 hover:underline">Cart</Link>
            <Link to="/orders" className="text-blue-600 hover:underline">My Orders</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;