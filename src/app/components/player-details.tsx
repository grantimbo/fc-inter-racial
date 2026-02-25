"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import { Player, SanityImage } from "@/lib/types";
import { PortableText } from "@portabletext/react";

interface PlayerProps {
  profilePicture: SanityImage;
  name: string;
}
interface PlayerDetailsProps {
  player: Player;
}

const getPositionLabel = (filter: string | undefined): string => {
  if (!filter) return "N/A";

  const positionMap: Record<string, string> = {
    CH: "COACHING STAFF",
    FW: "FORWARD",
    MF: "MIDFIELDER",
    DF: "DEFENDER",
    GK: "GOALKEEPER",
  };

  return positionMap[filter] || "N/A";
};

const PlayerThumbnail = ({ profilePicture, name }: PlayerProps) => {
  return (
    <img
      src={urlFor(profilePicture)
        .width(600) // Increase this if it looks blurry
        .auto("format")
        .url()}
      alt={profilePicture.alt || name}
      loading="lazy"
      className="object-cover"
    />
  );
};

export default function PlayerDetails({ player }: PlayerDetailsProps) {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="pt-24 md:pt-28 flex min-h-screen items-center justify-center bg-[#dde1e4] p-4 font-sans text-black">
      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2">
        {/* Left Side: Player Image */}
        <div className="relative flex justify-center">
          {player.profilePicture ? (
            <PlayerThumbnail
              profilePicture={player.profilePicture}
              name={player.name}
            />
          ) : (
            <Image
              width={896}
              height={1120}
              alt="Unknown player"
              src="/imgs/profile-placeholder.png"
            />
          )}
        </div>

        {/* Right Side: Player Info */}
        <div className="space-y-6">
          <header>
            <h2 className="font-narrow mb-2 text-8xl leading-none font-black">
              {player.squadNumber !== undefined && player.squadNumber !== null
                ? `#${player.squadNumber}`
                : "N/A"}
            </h2>
            <h1 className="text-6xl leading-tight font-bold tracking-tight">
              {player.name}
            </h1>
            <p className="mt-1 text-xl font-bold tracking-widest uppercase">
              {getPositionLabel(player.position)}
            </p>
          </header>

          {/* Social Links */}
          <div className="flex gap-3">
            <a
              href="https://facebook.com/fcinterracial"
              target="_blank"
              className="transition-opacity hover:opacity-70"
            >
              <Image
                alt="Facebook"
                src="/imgs/facebook.svg"
                width={40}
                height={40}
              />
            </a>

            <a
              href="https://www.instagram.com/grntx"
              target="_blank"
              className="transition-opacity hover:opacity-70"
            >
              <Image
                alt="Facebook"
                src="/imgs/instagram.svg"
                width={40}
                height={40}
              />
            </a>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => setActiveTab("profile")}
              className={`rounded-lg border-2 px-8 py-2 font-bold shadow-sm transition-all ${
                activeTab === "profile"
                  ? "border-white bg-white text-black"
                  : "border-black bg-transparent text-black hover:bg-black hover:text-white"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("bio")}
              className={`rounded-lg border-2 px-8 py-2 font-bold shadow-sm transition-all ${
                activeTab === "bio"
                  ? "border-white bg-white text-black"
                  : "border-black bg-transparent text-black hover:bg-black hover:text-white"
              }`}
            >
              Bio
            </button>
          </div>

          {/* Conditional Rendering Logic */}
          <div className="min-h-75 w-full max-w-md">
            {activeTab === "profile" ? (
              /* Stats Table */
              <div className="">
                {[
                  { label: "Date of birth", value: player.dob || "N/A" },
                  { label: "Nationality", value: player.nationality || "N/A" },
                  { label: "Date signed", value: player.dateSigned || "N/A" },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between border-b border-gray-400 py-2 text-sm"
                  >
                    <span className="font-medium">{stat.label}</span>
                    <span className="text-right font-semibold">
                      {stat.value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between border-b border-gray-400 py-2 text-sm">
                  <span className="font-medium">Former clubs</span>
                  <div className="text-right font-semibold">
                    {player.formerClubs && player.formerClubs.length > 0
                      ? player.formerClubs.map((club, i) => (
                          <p key={i}>{club}</p>
                        ))
                      : "N/A"}
                  </div>
                </div>
              </div>
            ) : (
              /* Bio Content */
              <div className="">
                <h3 className="mb-2 font-bold tracking-widest uppercase">
                  Biography
                </h3>
                <div className="prose prose-sm">
                  <div>
                    {player.bio ? (
                      <PortableText value={player.bio} />
                    ) : (
                      `No biography available for this player.`
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
