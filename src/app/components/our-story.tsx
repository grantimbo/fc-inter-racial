import React from 'react';
import Image from 'next/image';



const OurStory = () => {
  return (
    <section id="our-story" className="bg-white py-20 px-6 font-sans text-black">
      <div className="max-w-2xl mx-auto text-center">
        {/* Main Section Title */}
        <h2 className="text-6xl font-black mb-16 tracking-tight text-black">
          Our Story
        </h2>

        {/* Story Image Container */}
        <div className="relative  mx-auto aspect-4/3 md:aspect-video mb-12 overflow-hidden rounded-md shadow-sm">
          {/* Replace src with your actual uploaded image path */}
          <Image
            src="/imgs/humble-beginnings.png" 
            alt="FC Inter Racial team in their early days"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Sub-heading */}
        <div className='text-left'>
        <h3 className="text-3xl font-bold mb-6 text-black">
          The IRFC Story
        </h3>


        <h2 className=' font-bold'>The Humble Kickoff</h2>
        <p className="text-sm font-light mb-3">In 2024, in the heart of Dumaguete City, IRFC wasn’t a "club" yet—it was just a simple desire to play. Founded by Engr. Ed Cleo, the mission was straightforward: Ed just wanted a team to get on the pitch with. There were no sponsors, no high-tech training facilities, and certainly no fancy kits.</p>

        <h2 className=' font-bold'>The East Balabag Days</h2>
        <p className="text-sm font-light mb-3">The journey began on the grass of East Balabag. It started with a few friends, a ball, and a lot of sweat. Through word of mouth and a shared love for the game, that small group of friends transformed into a massive 50+ player squad.</p>

        <h2 className=' font-bold'>More Than Just a Game</h2>
        <p className="text-sm font-light mb-3">We proved that you don't need elite facilities to build an elite spirit. Our foundation was built on three simple pillars:</p>

        <ul className='text-md my-6 ml-10 list-disc'>

        <li className='mb-1'><b>Passion:</b> A raw, unapologetic love for football.</li>
        <li className='mb-1'><b>Unity:</b> Embracing our diversity to become one unstoppable force.</li>
        <li className='mb-1'><b>Commitment:</b> The relentless drive to be better today than we were yesterday.</li>
        </ul>






        <h2 className=' font-bold'>The IRFC Legacy</h2>
        <p className="text-sm font-light mb-3">What started as a way to pass the time has evolved into a Family of Champions. We’ve traded the laughter of skeptics for the respect of our rivals. Today, as we travel from Dumaguete to stages like the Thirsty Cup in Cebu & Downtown Derby in Bacolod, we carry the same grit we had in East Balabag.</p>

        <p className='text-sm'>We are IRFC. We are proof that with enough heart, a small club can conquer any field.</p>

        </div>
      </div>
    </section>
  );
};

export default OurStory;