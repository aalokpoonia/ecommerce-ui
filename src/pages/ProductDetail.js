import { useParams, useNavigate } from 'react-router-dom';
import PRODUCTS from '../data/products';

export default function ProductDetail({ cart, setCart, wishlist, setWishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === parseInt(id));

  if (!product) return (
    <div style={{ textAlign: 'center', padding: 80, fontFamily: 'sans-serif' }}>
      <div style={{ fontSize: 60 }}>😕</div>
      <h2>Product not found!</h2>
      <button onClick={() => navigate('/')} style={{ marginTop: 16, padding: '10px 24px', background: '#6366f1', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
        Go Back
      </button>
    </div>
  );

  function addToCart() {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function toggleWishlist() {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.filter(i => i.id !== product.id);
      return [...prev, product];
    });
  }

  const isWishlisted = wishlist.some(i => i.id === product.id);
  const inCart = cart.some(i => i.id === product.id);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* Header */}
      <div style={{ background: '#1e293b', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'white', fontSize: 16, cursor: 'pointer', fontWeight: 600 }}>
          ← Back to Shop
        </button>
        <div style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>🛍️ ShopEase</div>
        <div style={{ width: 100 }} />
      </div>

      <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 16px', display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        
        {/* Product Image */}
        <div style={{ flex: 1, minWidth: 280, background: 'white', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: 120 }}>{product.emoji}</div>
        </div>

        {/* Product Info */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>{product.brand} · {product.category}</p>
          <h1 style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 700, color: '#1e293b' }}>{product.name}</h1>
          
          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 18 }}>⭐</span>
            <span style={{ fontWeight: 700, color: '#1e293b' }}>{product.rating}</span>
            <span style={{ color: '#94a3b8', fontSize: 14 }}>({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div style={{ fontSize: 32, fontWeight: 800, color: '#6366f1', marginBottom: 16 }}>
            ₹{product.price.toLocaleString()}
          </div>

          {/* Stock */}
          <div style={{ marginBottom: 20 }}>
            <span style={{ background: product.stock > 10 ? '#d1fae5' : '#fef3c7', color: product.stock > 10 ? '#065f46' : '#92400e', padding: '4px 12px', borderRadius: 99, fontSize: 13, fontWeight: 600 }}>
              {product.stock > 10 ? `✓ In Stock (${product.stock} left)` : `⚠ Only ${product.stock} left!`}
            </span>
          </div>

          {/* Description */}
          <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: 28, fontSize: 15 }}>{product.description}</p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={addToCart}
              style={{ flex: 1, padding: '14px 0', background: inCart ? '#10b981' : 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
              {inCart ? '✓ Added to Cart' : '+ Add to Cart'}
            </button>
            <button onClick={toggleWishlist}
              style={{ padding: '14px 20px', background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 20, cursor: 'pointer' }}>
              {isWishlisted ? '❤️' : '🤍'}
            </button>
          </div>

          {/* Features */}
          <div style={{ marginTop: 28, padding: 20, background: 'white', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <p style={{ margin: '0 0 12px', fontWeight: 700, color: '#1e293b', fontSize: 15 }}>Why ShopEase?</p>
            {['Free delivery on orders above ₹499', '7-day easy returns', '1 year warranty included', 'Secure payments'].map(f => (
              <p key={f} style={{ margin: '6px 0', fontSize: 14, color: '#64748b' }}>✓ {f}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
