import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white px-6">
      <div className="relative flex flex-col items-center text-center">
        {/* Glow effect */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(220,30,80,0.4) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <h1 className="relative z-10 text-8xl md:text-[150px] font-bold text-white mb-4 tracking-tighter" style={{ textShadow: "0 0 40px rgba(255,255,255,0.1)" }}>
          404
        </h1>
        
        <h2 className="relative z-10 text-2xl sm:text-3xl font-semibold mb-6">
          Page Not Found
        </h2>
        
        <p className="relative z-10 text-gray-400 max-w-md mx-auto mb-10 text-sm sm:text-base leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back to the portfolio!
        </p>
        
        <Link 
          href="/"
          className="relative z-10 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
