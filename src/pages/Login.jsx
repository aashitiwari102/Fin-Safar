import React, { useState, useEffect, useRef } from 'react';
import SideCard from '../components/ui/SideCard';

// Reusable Floating Input Component with Enhanced Interactions
const FloatingInput = ({ id, label, type = 'text', value, onChange, onFocus, onBlur, error }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;
  const isActive = isFocused || hasValue;

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <div className={`relative z-0 w-full mb-8 group ${error ? 'animate-shake' : ''}`}>
      <input
        type={type}
        name={id}
        id={id}
        className={`block py-3 px-0 w-full text-base text-[#A7EBF2] bg-transparent border-0 border-b appearance-none focus:outline-none focus:ring-0 transition-colors duration-300
          ${error 
            ? 'border-red-500' 
            : 'border-[#26658C]'
          }`}
        placeholder=" "
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required
        aria-invalid={!!error}
      />
      
      {/* Floating Label with precise positioning logic */}
      <label
        htmlFor={id}
        className={`absolute left-0 duration-300 ease-in-out pointer-events-none origin-[0]
          ${isActive 
            ? '-translate-y-7 scale-75 text-[#A7EBF2] font-medium' 
            : 'translate-y-0 scale-100 text-[#54ACBF] top-3'
          }
          ${error && isActive ? 'text-red-500' : ''}
          `}
      >
        {label}
      </label>

      {/* Animated Underline: Expands from center */}
      <div className={`absolute bottom-0 left-1/2 w-full h-[2px] -translate-x-1/2 bg-[#A7EBF2] transform transition-transform duration-500 ease-out origin-center
        ${isFocused 
          ? 'scale-x-100 shadow-[0_0_8px_rgba(167,235,242,0.8)]' 
          : 'scale-x-0'
        }
        ${error ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : ''}
        `}>
      </div>
    </div>
  );
};

const Spinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: false, password: false });
  const [isLoading, setIsLoading] = useState(false);
  const [interactionState, setInteractionState] = useState('idle'); // idle, email, password, typing, submit
  
  // 3D Tilt State
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Clear errors on typing and handle typing state
  useEffect(() => {
    if (errors.email && email) setErrors(prev => ({ ...prev, email: false }));
    if (email) setInteractionState('typing');
    const timeout = setTimeout(() => {
        if (interactionState === 'typing') setInteractionState('email'); // Return to focused state
    }, 500);
    return () => clearTimeout(timeout);
  }, [email]);

  useEffect(() => {
    if (errors.password && password) setErrors(prev => ({ ...prev, password: false }));
    if (password) setInteractionState('typing');
    const timeout = setTimeout(() => {
        if (interactionState === 'typing') setInteractionState('password'); // Return to focused state
    }, 500);
    return () => clearTimeout(timeout);
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {
      email: !email,
      password: !password
    };

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      if (navigator.vibrate) navigator.vibrate(200);
      return;
    }

    setIsLoading(true);
    setInteractionState('submit');
    setTimeout(() => {
      setIsLoading(false);
      setInteractionState('idle');
    }, 2000);
  };

  // Card Tilt Logic
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 8 degrees for subtle effect)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[length:400%_400%] bg-[linear-gradient(-45deg,#011C40,#023859)] animate-gradient perspective-1000">
      
      {/* Ambient Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#54ACBF]/30 blur-[120px] rounded-full animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#26658C]/20 blur-[120px] rounded-full animate-pulse pointer-events-none delay-1000"></div>

      {/* Main Layout Container: Flex Row for Desktop */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-5xl z-10">
        
        {/* Interactive Side Card - Hidden on Mobile */}
        <SideCard interactionState={interactionState} />

        {/* Login Card Container with 3D Perspective */}
        <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[420px] transition-transform duration-200 ease-out"
            style={{
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d'
            }}
        >
            <div className="relative p-10 rounded-2xl bg-[#023859]/5 backdrop-blur-xl border border-[#26658C] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(167,235,242,0.2)]">
            
            {/* Header - Staggered Fade In */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#A7EBF2] mb-2 tracking-tight drop-shadow-md animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Welcome Back
                </h2>
                <p className="text-[#54ACBF] text-sm font-medium tracking-wide animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                Build your financial confidence
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <FloatingInput 
                id="email" 
                label="Email Address" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setInteractionState('email')}
                onBlur={() => setInteractionState('idle')}
                error={errors.email}
                />
                
                <FloatingInput 
                id="password" 
                label="Password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setInteractionState('password')}
                onBlur={() => setInteractionState('idle')}
                error={errors.password}
                />

                <div className="pt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`group relative w-full py-4 px-4 bg-[length:200%_200%] bg-gradient-to-r from-[#54ACBF] to-[#26658C] rounded-xl text-white font-semibold text-lg tracking-wide shadow-lg overflow-hidden transition-all duration-300 ease-out
                    ${isLoading 
                        ? 'opacity-80 cursor-not-allowed scale-[0.98]' 
                        : 'hover:bg-right hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(167,235,242,0.35)] active:scale-[0.97] active:shadow-inner cursor-pointer'
                    }`}
                    aria-busy={isLoading}
                >
                    {!isLoading && (
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out blur-md"></div>
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                        <div className="flex items-center animate-fade-in">
                        <Spinner />
                        <span className="text-white/90">Signing In...</span>
                        </div>
                    ) : (
                        <>
                        Sign In
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                        </>
                    )}
                    </span>
                </button>
                </div>
            </form>

            {/* Footer */}
            <div className="mt-10 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <p className="text-[#54ACBF]/70 text-sm transition-opacity duration-300 hover:text-[#54ACBF]/90">
                New here?{' '}
                <a href="#" className="text-[#A7EBF2] font-semibold hover:text-[#A7EBF2] transition-colors duration-200 hover:underline decoration-[#A7EBF2]/50 underline-offset-4 focus:outline-none focus:ring-2 focus:ring-[#A7EBF2] focus:ring-offset-2 focus:ring-offset-[#011C40] rounded-sm">
                    Create an account
                </a>
                </p>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
