import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import PRODUCTS from './data/products';
import LoginPage from './pages/LoginPage';
import ProductDetail from './pages/ProductDetail';

const CATEGORIES = ['All', 'Phones', 'Laptops', 'Shoes', 'Clothing', 'Other'];

function HomePage({ cart, setCart, wishlist, setWishlist }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [toast, setToast] = useState('');
  const navigate = useNavigate();

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  }

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast('Added to cart! 🛒');
  }

  function removeFromCart(id) { setCart(prev => prev.filter(i => i.id !== id)); }
  function changeQty(id, delta) { setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)); }

  function toggleWishlist(product) {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) { showToast('Removed from wishlist 💔'); return prev.filter(i => i.id !== product.id); }
      showToast('Added to wishlist ❤️');
      return [...prev, product];
    });
  }

  let filtered = PRODUCTS.filter(p =>
    (category === 'All' || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  if (sortBy === 'low') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === 'high') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'sans-serif' }}>
      {toast && (
        <div style={{ position: 'fixed', top: 16, right: 16, background: '#1e293b', color: 'white', padding: '10px 18px', borderRadius: 10, fontSize: 14, zIndex: 999 }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ background: '#1e293b', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ color: 'white', fontSize: 22, fontWeight: 700 }}>🛍️ ShopEase</div>
        <input type="text" placeholder="🔍 Search products..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ padding: '8px 16px', borderRadius: 20, border: 'none', width: 260, fontSize: 14, outline: 'none' }} />
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => navigate('/login')}
            style={{ background: '#334155', color: 'white', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
            👤 Login
          </button>
          <button onClick={() => { setShowWishlist(!showWishlist); setShowCart(false); }}
            style={{ background: showWishlist ? '#e11d48' : '#334155', color: 'white', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
            ❤️ {wishlist.length > 0 && `(${wishlist.length})`}
          </button>
          <button onClick={() => { setShowCart(!showCart); setShowWishlist(false); }}
            style={{ background: '#0ea5e9', color: 'white', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
            🛒 {cartCount > 0 && `(${cartCount})`}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                style={{ padding: '8px 20px', borderRadius: 99, border: '1.5px solid', cursor: 'pointer', fontWeight: 500, fontSize: 14,
                  background: category === c ? '#0ea5e9' : 'white',
                  color: category === c ? 'white' : '#64748b',
                  borderColor: category === c ? '#0ea5e9' : '#e2e8f0' }}>
                {c}
              </button>
            ))}
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            style={{ padding: '8px 16px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 14, background: 'white', cursor: 'pointer' }}>
            <option value="default">Sort: Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          {/* Product Grid */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
            {filtered.length === 0 ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 60, color: '#94a3b8' }}>
                <div style={{ fontSize: 48 }}>🔍</div>
                <p>No products found!</p>
              </div>
            ) : filtered.map(p => (
              <div key={p.id} style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'relative', cursor: 'pointer' }}>
                <button onClick={() => toggleWishlist(p)}
                  style={{ position: 'absolute', top: 8, right: 8, background: 'white', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.15)', zIndex: 1 }}>
                  {wishlist.some(i => i.id === p.id) ? '❤️' : '🤍'}
                </button>
                <div onClick={() => navigate(`/product/${p.id}`)}
                  style={{ background: '#f1f5f9', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52 }}>
                  {p.emoji}
                </div>
                <div style={{ padding: 14 }}>
                  <p onClick={() => navigate(`/product/${p.id}`)} style={{ margin: '0 0 4px', fontWeight: 600, fontSize: 14, color: '#1e293b', cursor: 'pointer' }}>{p.name}</p>
                  <p style={{ margin: '0 0 4px', fontSize: 12, color: '#94a3b8' }}>⭐ {p.rating} ({p.reviews})</p>
                  <p style={{ margin: '0 0 12px', fontWeight: 700, fontSize: 16, color: '#0ea5e9' }}>₹{p.price.toLocaleString()}</p>
                  <button onClick={() => addToCart(p)}
                    style={{ width: '100%', padding: '8px 0', background: '#0ea5e9', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Panel */}
          {showCart && (
            <div style={{ width: 320, background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', height: 'fit-content', position: 'sticky', top: 80 }}>
              <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, color: '#1e293b' }}>🛒 Your Cart</h2>
              {cart.length === 0 ? (
                <p style={{ color: '#94a3b8', textAlign: 'center', padding: 20 }}>Cart is empty!</p>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                      <div>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{item.emoji} {item.name}</p>
                        <p style={{ margin: 0, fontSize: 12, color: '#0ea5e9' }}>₹{(item.price * item.qty).toLocaleString()}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <button onClick={() => changeQty(item.id, -1)} style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 700 }}>-</button>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{item.qty}</span>
                        <button onClick={() => changeQty(item.id, 1)} style={{ width: 24, height: 24, borderRadius: 6, border: 'none', background: '#0ea5e9', color: 'white', cursor: 'pointer', fontWeight: 700 }}>+</button>
                        <button onClick={() => removeFromCart(item.id)} style={{ width: 24, height: 24, borderRadius: 6, border: 'none', background: '#fee2e2', color: '#ef4444', cursor: 'pointer', fontWeight: 700 }}>✕</button>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '2px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span style={{ fontWeight: 700, color: '#1e293b' }}>Total:</span>
                      <span style={{ fontWeight: 700, color: '#0ea5e9', fontSize: 18 }}>₹{total.toLocaleString()}</span>
                    </div>
                    <button style={{ width: '100%', padding: '12px 0', background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
                      Proceed to Checkout →
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Wishlist Panel */}
          {showWishlist && (
            <div style={{ width: 320, background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', height: 'fit-content', position: 'sticky', top: 80 }}>
              <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 700, color: '#1e293b' }}>❤️ Wishlist</h2>
              {wishlist.length === 0 ? (
                <p style={{ color: '#94a3b8', textAlign: 'center', padding: 20 }}>Wishlist is empty!</p>
              ) : wishlist.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{item.emoji} {item.name}</p>
                    <p style={{ margin: 0, fontSize: 12, color: '#0ea5e9' }}>₹{item.price.toLocaleString()}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => addToCart(item)}
                      style={{ fontSize: 11, padding: '4px 8px', background: '#0ea5e9', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                      Add to Cart
                    </button>
                    <button onClick={() => toggleWishlist(item)}
                      style={{ fontSize: 11, padding: '4px 8px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product/:id" element={<ProductDetail cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
      </Routes>
    </BrowserRouter>
  );
}
