import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
      <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded transition-all duration-300 ease-in-out">
          Go Back Home
        </button>
      </Link>
    </div>
  );
}
