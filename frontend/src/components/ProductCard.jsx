import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import { useState } from 'react';

function ProductCard({ product }) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');

  const handleAddToCart = async () => {
    try {
      await API.post('/cart', { productId: product._id, quantity: 1 });
      setMessage('Added to cart!');
      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <div className="bg-gray-100 h-32 rounded mb-3 flex items-center justify-center text-gray-400">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="h-full object-cover rounded" />
        ) : (
          'No Image'
        )}
      </div>
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-500 text-sm mb-1">{product.category}</p>
      <p className="text-blue-600 font-bold mb-1">₹{product.price}</p>
      <p className="text-sm text-gray-500 mb-3">Stock: {product.stock}</p>

      {user && (
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="mt-auto bg-blue-600 text-white py-1 rounded hover:bg-blue-700 disabled:bg-gray-300"
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      )}
      {message && <p className="text-xs text-green-600 mt-1">{message}</p>}
    </div>
  );
}

export default ProductCard;