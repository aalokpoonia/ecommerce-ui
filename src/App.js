import { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'iPhone 15 Pro', price: 129999, category: 'Phones', emoji: '📱', rating: 4.8, reviews: 234 },
  { id: 2, name: 'MacBook Air M2', price: 99999, category: 'Laptops', emoji: '💻', rating: 4.9, reviews: 189 },
  { id: 3, name: 'Nike Air Max', price: 12999, category: 'Shoes', emoji: '👟', rating: 4.7, reviews: 412 },
  { id: 4, name: 'Polo T-Shirt', price: 1499, category: 'Clothing', emoji: '👕', rating: 4.5, reviews: 98 },
  { id: 5, name: 'Samsung Galaxy S24', price: 89999, category: 'Phones', emoji: '📱', rating: 4.7, reviews: 156 },
  { id: 6, name: 'Dell XPS 15', price: 149999, category: 'Laptops', emoji: '💻', rating: 4.6, reviews: 203 },
  { id: 7, name: 'Adidas Ultraboost', price: 15999, category: 'Shoes', emoji: '👟', rating: 4.8, reviews: 321 },
  { id: 8, name: "Levi's Jeans", price: 2999, category: 'Clothing', emoji: '👖', rating: 4.4, reviews: 567 },
];

const CATEGORIES = ['All', 'Phones', 'Laptops', 'Shoes', 'Clothing'];

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [toast, setToast] = useState('');

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

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  function changeQty(id, delta) {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  }

  function toggleWishlist(product) {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) { showToast('Removed from wishlist 💔'); return prev.filter(i => i.id !== product.id); }
      showToast('Added to wishlist ❤️');
      return [...prev, product];
    });
  }

  function isWishlisted(id) { return wishlist.some(i => i.id === id); }

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

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 16, right: 16, background: '#1e293b', color: 'white', padding: '10px 18px', borderRadius: 10, fontSize: 14, zIndex: 999 }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ background: '#1e293b', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ color: 'white', fontSize: 22, fontWeight: 700 }}>🛍️ ShopEase</div>
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '8px 16px', borderRadius: 20, border: 'none', width: 260, fontSize: 14, outline: 'none' }}
        />
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => { setShowWishlist(!showWishlist); setShowCart(false); }}
            style={{ background: showWishlist ? '#e11d48' : '#334155', color: 'white', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
            ❤️ {wishlist.length > 0 && `(${wishlist.length})`}
          </button>
          <button onClick={() => { setShowCart(!showCart); setShowWishlist(false); }}
            style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: 8, padding: '8px 14px', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
            🛒 {cartCount > 0 && `(${cartCount})`}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>

        {/* Filters + Sort */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                style={{ padding: '8px 20px', borderRadius: 99, border: '1.5px solid', cursor: 'pointer', fontWeight: 500, fontSize: 14,
                  background: category === c ? '#6366f1' : 'white',
                  color: category === c ? 'white' : '#64748b',
                  borderColor: category === c ? '#6366f1' : '#e2e8f0' }}>
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
              <div key={p.id} style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'relative' }}>
                {/* Wishlist button */}
                <button onClick={() => toggleWishlist(p)}
                  style={{ position: 'absolute', top: 8, right: 8, background: 'white', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }}>
                  {isWishlisted(p.id) ? '❤️' : '🤍'}
                </button>
                <div style={{ background: '#f1f5f9', height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52 }}>
                  {p.emoji}
                </div>
                <div style={{ padding: 14 }}>
                  <p style={{ margin: '0 0 4px', fontWeight: 600, fontSize: 14, color: '#1e293b' }}>{p.name}</p>
                  <p style={{ margin: '0 0 4px', fontSize: 12, color: '#94a3b8' }}>⭐ {p.rating} ({p.reviews})</p>
                  <p style={{ margin: '0 0 12px', fontWeight: 700, fontSize: 16, color: '#6366f1' }}>₹{p.price.toLocaleString()}</p>
                  <button onClick={() => addToCart(p)}
                    style={{ width: '100%', padding: '8px 0', background: '#6366f1', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
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
                        <p style={{ margin: 0, fontSize: 12, color: '#6366f1' }}>₹{(item.price * item.qty).toLocaleString()}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <button onClick={() => changeQty(item.id, -1)} style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 700 }}>-</button>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{item.qty}</span>
                        <button onClick={() => changeQty(item.id, 1)} style={{ width: 24, height: 24, borderRadius: 6, border: 'none', background: '#6366f1', color: 'white', cursor: 'pointer', fontWeight: 700 }}>+</button>
                        <button onClick={() => removeFromCart(item.id)} style={{ width: 24, height: 24, borderRadius: 6, border: 'none', background: '#fee2e2', color: '#ef4444', cursor: 'pointer', fontWeight: 700 }}>✕</button>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '2px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span style={{ fontWeight: 700, color: '#1e293b' }}>Total:</span>
                      <span style={{ fontWeight: 700, color: '#6366f1', fontSize: 18 }}>₹{total.toLocaleString()}</span>
                    </div>
                    <button style={{ width: '100%', padding: '12px 0', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
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
                    <p style={{ margin: 0, fontSize: 12, color: '#6366f1' }}>₹{item.price.toLocaleString()}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => addToCart(item)}
                      style={{ fontSize: 11, padding: '4px 8px', background: '#6366f1', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
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