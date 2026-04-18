import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function validate() {
    const e = {};
    if (!isLogin && !form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    if (!form.password || form.password.length < 6) e.password = 'Password must be 6+ characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    navigate('/');
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: 16 }}>
      <div style={{ background: 'white', borderRadius: 20, padding: '40px 36px', width: '100%', maxWidth: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>🛍️</div>
          <h1 style={{ margin: '8px 0 4px', fontSize: 24, fontWeight: 700, color: '#1e293b' }}>ShopEase</h1>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: 14 }}>
            {isLogin ? 'Welcome back! Please login.' : 'Create your account today.'}
          </p>
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: 10, padding: 4, marginBottom: 24 }}>
          <button onClick={() => setIsLogin(true)}
            style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer',
              background: isLogin ? 'white' : 'transparent',
              color: isLogin ? '#6366f1' : '#94a3b8',
              boxShadow: isLogin ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}>
            Login
          </button>
          <button onClick={() => setIsLogin(false)}
            style={{ flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer',
              background: !isLogin ? 'white' : 'transparent',
              color: !isLogin ? '#6366f1' : '#94a3b8',
              boxShadow: !isLogin ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}>
            Sign Up
          </button>
        </div>

        {/* Name field (signup only) */}
        {!isLogin && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Full Name</label>
            <input type="text" placeholder="Enter your name"
              value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              style={{ width: '100%', padding: '11px 14px', border: `1.5px solid ${errors.name ? '#f87171' : '#e2e8f0'}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
            {errors.name && <p style={{ color: '#ef4444', fontSize: 12, margin: '4px 0 0' }}>{errors.name}</p>}
          </div>
        )}

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Email Address</label>
          <input type="email" placeholder="Enter your email"
            value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            style={{ width: '100%', padding: '11px 14px', border: `1.5px solid ${errors.email ? '#f87171' : '#e2e8f0'}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
          {errors.email && <p style={{ color: '#ef4444', fontSize: 12, margin: '4px 0 0' }}>{errors.email}</p>}
        </div>

        {/* Password */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Password</label>
          <input type="password" placeholder="Enter your password"
            value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            style={{ width: '100%', padding: '11px 14px', border: `1.5px solid ${errors.password ? '#f87171' : '#e2e8f0'}`, borderRadius: 8, fontSize: 14, boxSizing: 'border-box', outline: 'none' }} />
          {errors.password && <p style={{ color: '#ef4444', fontSize: 12, margin: '4px 0 0' }}>{errors.password}</p>}
        </div>

        {/* Submit */}
        <button onClick={handleSubmit}
          style={{ width: '100%', padding: '13px 0', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
          {isLogin ? 'Login to ShopEase' : 'Create Account'}
        </button>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
          <span style={{ margin: '0 12px', fontSize: 13, color: '#94a3b8' }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
        </div>

        {/* Google button */}
        <button style={{ width: '100%', padding: '11px 0', background: 'white', border: '1.5px solid #e2e8f0', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer', color: '#374151' }}>
          🌐 Continue with Google
        </button>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#94a3b8' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)} style={{ color: '#6366f1', fontWeight: 600, cursor: 'pointer' }}>
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}
