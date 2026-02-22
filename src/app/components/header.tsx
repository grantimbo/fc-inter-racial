import Link from 'next/link';
import Image from 'next/image';


const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          <div className="flex items-center gap-4">
            <div className="relative w-22 h-22 flex overflow-hidden items-center justify-center rounded-full">
              <Image alt='Inter Racial' src="/imgs/logo.jpg" width={100} height={100}/>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-black ">
              FC Inter Racial
            </h1>
          </div>

          <nav className="hidden md:flex space-x-12">
            <Link href="#news" className="text-xl font-medium text-black hover:text-gray-600 transition-colors">
              News
            </Link>
            <Link href="#players" className="text-xl font-medium text-black hover:text-gray-600 transition-colors">
              Players
            </Link>
            <Link href="#our-story" className="text-xl font-medium text-black hover:text-gray-600 transition-colors">
              Our Story
            </Link>
          </nav>
        </div>
      </div>

    </header>
  );
};

export default Header;