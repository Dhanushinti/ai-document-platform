import { useState, useContext } from 'react';
import { AuthContext } from "../AuthContext";
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Sparkles, Mail, Lock, Loader2 } from 'lucide-react';


import '../index.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await api.post('/register', { email, password });
        alert("Registration successful! Now logging you in...");
        
        // Auto-login after register
        await login(email, password);
        navigate('/dashboard'); 
      } else {
        await login(email, password);
        // Force navigation to dashboard
        window.location.href = '/dashboard'; 
      }
    } catch (err) {
      console.error(err);
      alert("Error: " + (err.response?.data?.detail || "Login Failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      <div className="hidden lg:flex w-1/2 bg-blue-600 text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tight">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-600"><Sparkles size={20} /></div>
            OceanAI
          </div>
        </div>
        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-bold mb-6 leading-tight">Transform your ideas into documents.</h1>
          <p className="text-blue-100 text-lg leading-relaxed">AI-powered generation for Word reports and PowerPoint presentations.</p>
        </div>
        <div className="relative z-10 text-sm text-blue-200">© 2025 OceanAI Platform.</div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
            <p className="text-gray-500">{isRegister ? 'Start generating today.' : 'Enter your credentials.'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" type="email" placeholder="name@company.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2" type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : (isRegister ? 'Sign Up' : 'Sign In')}
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">{isRegister ? 'Already have an account?' : "Don't have an account?"} <button className="text-blue-600 font-bold hover:underline" onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'Log in' : 'Sign up'}</button></p>
          </div>
        </div>
      </div>
    </div>
  );
}