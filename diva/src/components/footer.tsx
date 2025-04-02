// components/Footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-white">eRadiologi</h2>
            <p className="text-sm mt-1">© {new Date().getFullYear()} All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/about" className="hover:text-white transition">About</Link>
            <Link href="/services" className="hover:text-white transition">Services</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </div>

          {/* Social Links (Optional) */}
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link href="#" className="hover:text-white transition">
              <span className="sr-only">Twitter</span> 🐦
            </Link>
            <Link href="#" className="hover:text-white transition">
              <span className="sr-only">LinkedIn</span> 🔗
            </Link>
            <Link href="#" className="hover:text-white transition">
              <span className="sr-only">Facebook</span> 📘
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
