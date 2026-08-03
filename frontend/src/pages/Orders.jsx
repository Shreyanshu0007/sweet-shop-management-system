import { useEffect, useState } from 'react';
import API from '../api/axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders/my-orders');
        setOrders(res.data);
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const statusColor = {
    pending: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bg-white p-4 rounded shadow mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${statusColor[order.status]}`}>
                {order.status}
              </span>
            </div>

            {order.items.map((item) => (
              <div key={item._id} className="flex justify-between text-sm py-1">
                <span>{item.productName} × {item.quantity}</span>
                <span>₹{item.priceAtPurchase * item.quantity}</span>
              </div>
            ))}

            <div className="flex justify-between font-bold mt-2 pt-2 border-t">
              <span>Total</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;