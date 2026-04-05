import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-dark-200 py-12 px-4 relative">
      <div className="w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
          {/* Left - Contact Info */}
          <div className="text-center md:text-left order-2 md:order-1">
            <p className="text-white text-sm mb-4 uppercase tracking-widest font-semibold">Say hello!</p>
            <a href="tel:+923710720726" className="block text-white hover:text-red-500 transition-all duration-200 mb-3 text-lg font-medium text-[16px]">
              (+92) 371 0720726
            </a>
            <a href="mailto:officialshahzil@gmail.com" className="block text-white hover:text-red-500 transition-all duration-200 text-[16px] sm:text-lg font-medium">
              officialshahzil@gmail.com
            </a>
          </div>

          {/* Center - Copyright */}
          <div className="text-center flex flex-col items-center justify-center order-3 md:order-2 border-t border-gray-800 pt-8 md:border-t-0 md:pt-0">
            <p className="text-white text-sm">© {new Date().getFullYear()} Portoflio. All rights reserved.</p>
            <p className="text-gray-400 text-[10px] mt-1 italic">Developed with passion</p>
          </div>

          {/* Right - Credits */}
          <div className="order-1 md:order-3 text-center md:text-right mb-4 md:mb-0">
            <div className="flex flex-row md:flex-col items-center md:items-end justify-center md:justify-end gap-6 md:gap-3">
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Terms</Link>
              <Link href="/guidelines" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Guidelines</Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
