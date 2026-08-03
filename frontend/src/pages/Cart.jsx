import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await API.get('/cart');
      setCart(res.data);
    } catch (err) {
      setMessage('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await API.delete(`/cart/${productId}`);
      fetchCart();
    } catch (err) {
      setMessage('Failed to remove item');
    }
  };

  const handleCheckout = async () => {
    try {
      await API.post('/orders');
      setMessage('Order placed successfully!');
      setTimeout(() => navigate('/orders'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Checkout failed');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;

  const total = cart?.items?.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  ) || 0;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {message && <p className="text-green-600 mb-4">{message}</p>}

      {!cart || cart.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded shadow mb-3 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-sm text-gray-500">
                  ₹{item.product.price} × {item.quantity}
                </p>
              </div>
              <button
                onClick={() => handleRemove(item.product._id)}
                className="text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <span className="text-lg font-bold">Total: ₹{total}</span>
            <button
              onClick={handleCheckout}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;