import Image from 'next/image';

const Footer = () => {

  return (
    <footer className="bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Partners Section */}
        <section className="mb-34 w-full">
          <h2 className="text-2xl font-bold text-center mb-12 tracking-tight">
            Partners
          </h2>
          
          <div className="flex flex-wrap justify-center gap-12 items-center opacity-90">

            <a href="https://www.facebook.com/popsis.official/" target="_blank" className='hover:opacity-50 transition-opacity w-28'>
              <Image alt='Popsis' src="/imgs/sponsors/popsis.png" width={163} height={168}  />
            </a>

            <a href="https://www.facebook.com/BreakroomCafeDGTE" target="_blank" className='hover:opacity-50 transition-opacity w-40'>
              <Image alt='Breakroom Cafe' src="/imgs/sponsors/breakroom.png" width={253} height={175} />
            </a>

            <a href="https://www.instagram.com/kebabkingzdumaguete/" target="_blank" className='hover:opacity-50 transition-opacity w-87.5'>
              <Image alt='Kebab Kings' src="/imgs/sponsors/kebabkings.png" width={454} height={108}   />
            </a>

            <a href="https://www.facebook.com/H2ELq" target="_blank" className='hover:opacity-50 transition-opacity w-18'>
                <Image alt='Liso' src="/imgs/sponsors/liso.png" width={109} height={169}  />
            </a>

            <a href="https://www.youtube.com/@LifeWithLobo" target="_blank" className='hover:opacity-50 transition-opacity w-30'>
              <Image alt='Life with Lobo' src="/imgs/sponsors/lobo.png" width={182} height={173}  />
            </a>
  
          </div>
        </section>

        {/* Social Icons */}
        <div className="flex gap-8 mb-10">
          <a href="https://facebook.com/fcinterracial" target='_blank' className="hover:opacity-70 transition-opacity">
            <Image alt='Facebook' src="/imgs/facebook.svg" width={46} height={46}/>
          </a>
    
          <a href="https://www.youtube.com/@FCInterRacial" target='_blank' className="hover:opacity-70 transition-opacity">
            <Image alt='Facebook' src="/imgs/youtube.svg" width={46} height={46}/>
          </a>
        </div>

        {/* Legal & Credits */}
        <div className="text-center space-y-4">
          <p className="text-lg font-medium text-gray-300">
            Copyright © 2026
          </p>
          <p className="text-sm text-gray-500 tracking-wide font-light">
            This website is built by <a href='https://grantimbo.com' target='_blank' className="text-gray-300">Grant Imbo</a> and <span className="text-gray-300">John Rey Bautista</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;