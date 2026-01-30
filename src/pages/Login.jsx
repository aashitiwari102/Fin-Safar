import React, { useState, useEffect } from 'react';

const FloatingInput = ({ id, label, type = 'text', value, onChange, error }) => {
  return (
    <div className={`relative z-0 w-full mb-6 group ${error ? 'animate-shake' : ''}`}>
      <input
        type={type}
        name={id}
        id={id}
        className={`block py-3 px-0 w-full text-base text-brand-cream bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer transition-colors duration-300
          ${error 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-brand-pink/30 focus:border-brand-purple'
          }`}
        placeholder=" "
        value={value}
        onChange={onChange}
        required
        aria-invalid={!!error}
      />
      <label
        htmlFor={id}
        className={`absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0
          ${error 
            ? 'text-red-500 peer-focus:text-red-500' 
            : 'text-brand-pink/70 peer-focus:text-brand-purple'
          } peer-focus:font-medium`}
      >
        {label}
      </label>
      {/* Bottom glow effect on focus */}
      <div className={`absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-focus-within:w-full 
        ${error 
          ? 'bg-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' 
          : 'bg-brand-purple drop-shadow-[0_0_8px_rgba(151,125,255,0.8)]'
        }`}></div>
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

  // Clear errors on typing
  useEffect(() => {
    if (errors.email && email) setErrors(prev => ({ ...prev, email: false }));
  }, [email]);

  useEffect(() => {
    if (errors.password && password) setErrors(prev => ({ ...prev, password: false }));
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
      // Optional: Vibrate device if supported for tactile feedback
      if (navigator.vibrate) navigator.vibrate(200);
      return;
    }

    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Reset or redirect would happen here
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[length:400%_400%] bg-[linear-gradient(-45deg,#00033D,#0600AB,#0033FF,#0600AB)] animate-gradient">
      
      {/* Ambient Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-blue/30 blur-[100px] rounded-full animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-purple/20 blur-[100px] rounded-full animate-pulse pointer-events-none delay-1000"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-[400px] p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:shadow-[0_8px_32px_0_rgba(0,51,255,0.25)] transition-all duration-500 hover:-translate-y-1">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-brand-cream mb-2 tracking-tight drop-shadow-md">
            Welcome Back
          </h2>
          <p className="text-brand-pink/80 text-sm font-medium tracking-wide">
            Build your financial confidence
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          <FloatingInput 
            id="email" 
            label="Email Address" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          
          <FloatingInput 
            id="password" 
            label="Password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full py-3.5 px-4 bg-gradient-to-r from-brand-purple to-brand-blue rounded-xl text-white font-semibold text-lg tracking-wide shadow-lg overflow-hidden transition-all duration-300 
                ${isLoading 
                  ? 'opacity-80 cursor-not-allowed scale-[0.98]' 
                  : 'hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(151,125,255,0.4)] active:scale-[0.98] active:shadow-inner cursor-pointer'
                }`}
              aria-busy={isLoading}
            >
              {!isLoading && (
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out blur-md"></div>
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Spinner />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 transition-transform group-hover:translate-x-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-brand-pink/60 text-sm">
            New here?{' '}
            <a href="#" className="text-brand-purple font-semibold hover:text-brand-cream transition-colors duration-200 hover:underline decoration-brand-purple/50 underline-offset-4 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 focus:ring-offset-brand-midnight rounded-sm">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
