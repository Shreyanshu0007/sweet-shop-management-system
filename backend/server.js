const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');


require('dotenv').config();

const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use('/api/products', productRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/cart', cartRoutes);

app.use('/api/orders', orderRoutes);

// Health check route — just to confirm server is alive
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});