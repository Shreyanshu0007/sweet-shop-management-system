import { useEffect, useState } from 'react';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (category !== 'All') params.category = category;

      const res = await API.get('/products', { params });
      setProducts(res.data);

      if (category === 'All' && !search) {
        const uniqueCategories = ['All', ...new Set(res.data.map((p) => p.category))];
        setCategories(uniqueCategories);
      }
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [search, category]);

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Hero */}
      <div
        className="text-center px-6 py-14"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #6b1d2e 0%, #4a1220 60%, #2e0b13 100%)',
        }}
      >
        <p
          className="text-xs tracking-widest uppercase mb-2"
          style={{ color: '#D4A017', letterSpacing: '0.2em' }}
        >
          Freshly Made, Every Day
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
            color: '#FFF8E9',
          }}
        >
          Our Sweets
        </h1>
        <p className="mt-2 text-sm" style={{ color: '#E0C89A' }}>
          Traditional mithai, made with love and a little gold dust of nostalgia
        </p>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 -mt-8 relative z-10">
          <input
            type="text"
            placeholder="Search sweets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 rounded-lg flex-1 shadow-md outline-none"
            style={{ border: '1.5px solid #E0D0A8', background: '#FFFDF7' }}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 rounded-lg shadow-md outline-none"
            style={{ border: '1.5px solid #E0D0A8', background: '#FFFDF7', color: '#4A1220' }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-center mt-10" style={{ color: '#8A7560' }}>Loading products...</p>
        ) : products.length === 0 ? (
          <p style={{ color: '#8A7560' }}>No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;