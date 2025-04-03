import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FEF8F1] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-serif text-[#091747] mb-4">404</h1>
        <h2 className="text-2xl font-serif text-[#091747] mb-8">Page Not Found</h2>
        <p className="text-[#091747] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/"
          className="inline-block px-8 py-3 bg-[#091747] text-white rounded hover:bg-[#0c1f5e] transition-colors font-serif"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 