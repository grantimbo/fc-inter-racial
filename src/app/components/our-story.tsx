import React from "react";
import Image from "next/image";

const OurStory = () => {
  return (
    <section
      id="our-story"
      className="scroll-mt-16 bg-white px-6 py-20 font-sans text-black md:scroll-mt-20"
    >
      <div className="mx-auto max-w-2xl text-center">
        {/* Main Section Title */}
        <h2 className="mb-16 text-6xl font-black tracking-tight text-black">
          Our Story
        </h2>

        {/* Story Image Container */}
        <div className="relative mx-auto mb-12 aspect-4/3 overflow-hidden rounded-md shadow-sm md:aspect-video">
          {/* Replace src with your actual uploaded image path */}
          <Image
            src="/imgs/first-tournament.jpg"
            alt="FC Inter Racial team in their early days"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Sub-heading */}
        <div className="text-left">
          <h3 className="mb-6 text-3xl font-bold text-black">The IRFC Story</h3>

          <h2 className="font-bold">The Humble Kickoff</h2>
          <p className="mb-3 text-sm font-light">
            In 2024, in the heart of Dumaguete City, IRFC wasn’t a
            &quot;club&quot; yet—it was just a simple desire to play. Founded by
            Engr. Ed Cleo, the mission was straightforward: Ed just wanted a
            team to get on the pitch with. There were no sponsors, no high-tech
            training facilities, and certainly no fancy kits.
          </p>

          <h2 className="font-bold">The East Balabag Days</h2>
          <p className="mb-3 text-sm font-light">
            The journey began on the grass of East Balabag. It started with a
            few friends, a ball, and a lot of sweat. Through word of mouth and a
            shared love for the game, that small group of friends transformed
            into a massive 50+ player squad.
          </p>

          <h2 className="font-bold">More Than Just a Game</h2>
          <p className="mb-3 text-sm font-light">
            We proved that you don&rsquo;t need elite facilities to build an
            elite spirit. Our foundation was built on three simple pillars:
          </p>

          <ul className="text-md my-6 ml-10 list-disc">
            <li className="mb-1">
              <b>Passion:</b> A raw, unapologetic love for football.
            </li>
            <li className="mb-1">
              <b>Unity:</b> Embracing our diversity to become one unstoppable
              force.
            </li>
            <li className="mb-1">
              <b>Commitment:</b> The relentless drive to be better today than we
              were yesterday.
            </li>
          </ul>

          <h2 className="font-bold">The IRFC Legacy</h2>
          <p className="mb-3 text-sm font-light">
            What started as a way to pass the time has evolved into a Family of
            Champions. We’ve traded the laughter of skeptics for the respect of
            our rivals. Today, as we travel from Dumaguete to stages like the
            Thirsty Cup in Cebu & Downtown Derby in Bacolod, we carry the same
            grit we had in East Balabag.
          </p>

          <p className="text-sm">
            We are IRFC. We are proof that with enough heart, a small club can
            conquer any field.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
