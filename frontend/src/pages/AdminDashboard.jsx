import { useEffect, useState } from 'react';
import API from '../api/axios';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [message, setMessage] = useState('');

  const [newProduct, setNewProduct] = useState({
    name: '', price: '', stock: '', category: '', imageUrl: ''
  });

  const fetchProducts = async () => {
    const res = await API.get('/products');
    setProducts(res.data);
  };

  const fetchOrders = async () => {
    const res = await API.get('/orders');
    setOrders(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await API.post('/products', {
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
      });
      setNewProduct({ name: '', price: '', stock: '', category: '', imageUrl: '' });
      setMessage('Product added!');
      fetchProducts();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add product');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      setMessage('Failed to delete');
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await API.put(`/orders/${orderId}/status`, { status });
      fetchOrders();
    } catch (err) {
      setMessage('Failed to update status');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-2 px-2 ${activeTab === 'products' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-2 px-2 ${activeTab === 'orders' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Orders
        </button>
      </div>

      {message && <p className="text-green-600 mb-4">{message}</p>}

      {activeTab === 'products' && (
        <div>
          <form onSubmit={handleAddProduct} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-3">
            <input
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              placeholder="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              placeholder="Price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              placeholder="Stock"
              type="number"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              className="border p-2 rounded"
              required
            />
            <input
              placeholder="Image URL"
              value={newProduct.imageUrl}
              onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
              className="border p-2 rounded col-span-2"
            />
            <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Add Product
            </button>
          </form>

          <div className="space-y-2">
            {products.map((product) => (
              <div key={product._id} className="bg-white p-3 rounded shadow flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {product.imageUrl && (
                    <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  )}
                  <span>{product.name} — ₹{product.price} — Stock: {product.stock}</span>
                </div>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">{order.user?.name} ({order.user?.email})</span>
                <span className="font-bold">₹{order.totalAmount}</span>
              </div>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                className="border p-1 rounded text-sm"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
