
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import SheildButton from '@/components/SheildButton';
import { toast } from 'sonner';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    
    try {
      // Call to your backend API
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }
      
      localStorage.setItem('token', data.token);
      toast.success('Account created successfully');
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error instanceof Error ? error.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sheild-darkblue to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-sheild-darkblue rounded-lg overflow-hidden relative">
        {/* Top right blob decoration */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-sheild-purple rounded-full opacity-20 blur-3xl"></div>
        
        {/* Back button */}
        <div className="absolute top-4 left-4 z-10">
          <Link to="/">
            <button className="text-white p-1 rounded-full hover:bg-white/10">
              <ArrowLeft size={20} />
            </button>
          </Link>
        </div>

        <div className="relative z-10 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>
          
          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <div className="mb-2 text-gray-300 text-sm">Name</div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full py-3 px-4 bg-opacity-20 bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-sheild-purple"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <div className="mb-2 text-gray-300 text-sm">Email address</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 px-4 bg-opacity-20 bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-sheild-purple"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <div className="mb-2 text-gray-300 text-sm">Password</div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 px-4 bg-opacity-20 bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-sheild-purple"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="mt-1 text-xs text-gray-400">
                Password must be at least 8 characters
              </div>
            </div>
            
            <div className="pt-2">
              <SheildButton 
                type="submit" 
                variant="primary" 
                fullWidth 
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Sign up'}
              </SheildButton>
            </div>
          </form>
          
          {/* Login link */}
          <div className="mt-8 text-center text-gray-300">
            Have an account? {' '}
            <Link to="/login" className="text-sheild-lightpurple hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
