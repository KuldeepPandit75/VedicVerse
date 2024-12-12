import React, { useState, useRef, useEffect } from "react";

export default function Intro() {
  const contentRef = useRef(null); // Reference to the content div
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        setIsOverflowing(
          contentRef.current.scrollHeight > contentRef.current.clientHeight
        );
      }
    };

    // Check overflow on mount and window resize
    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="intro relative overflow-hidden">
      <img
        className="w-full h-screen object-cover"
        src="/pagedesign.png"
        alt="VedicVerse Background"
      />
      <div
        ref={contentRef}
        className="absolute top-5 left-10 md:left-56 text-white p-6 bg-opacity-70 rounded-lg md:w-[850px] overflow-y-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#5a040dfa]">
          Introduction to Vedic Knowledge
        </h1>
        <p className="mt-3 text-2xl md:text-2xl font-bold text-red-800">
          The Vedas are the oldest and most revered scriptures in Hinduism,
          representing the core of ancient Indian knowledge and spirituality.
          Written in Sanskrit, they form the foundation of Hindu philosophy,
          rituals, and cultural heritage. The word "Veda" translates to
          "knowledge" or "wisdom," and these texts were preserved for thousands
          of years through rigorous oral traditions.
        </p>

        <h3 className="mt-6 text-xl font-semibold text-[#5a040dfa]">
          The Four Vedas
        </h3>
        <p className="mt-3 text-2xl font-bold text-red-800">
          The Vedas are divided into four primary collections, each serving a
          distinct purpose:
        </p>
        <ul className="mt-2 list-decimal pl-6 text-xl text-red-800">
          <li>
            <strong>Rigveda:</strong> The oldest of the Vedas, consisting of
            over 1,000 hymns (suktas) that praise various deities, including
            Agni (fire), Indra (thunder), and Varuna (cosmic order). These hymns
            explore cosmology, philosophy, and spiritual insight.
          </li>
          <li>
            <strong>Yajurveda:</strong> A compilation of mantras and rituals
            used during sacrifices and ceremonies. It serves as a guide for
            priests conducting Vedic rituals and emphasizes the precise
            performance of sacred rites.
          </li>
          <li>
            <strong>Samaveda:</strong> Known as the "Veda of Melodies," it
            contains chants and songs derived from the Rigveda. These verses are
            meant to be sung during rituals, making it the foundation for Indian
            classical music.
          </li>
          <li>
            <strong>Atharvaveda:</strong> Focuses on practical knowledge,
            including spells, charms, and remedies for daily life. It addresses
            health, prosperity, and protection against harm.
          </li>
        </ul>

        <p className="mt-6">
          These ancient texts preserve the mythology, rituals, and philosophical
          insights of Hinduism. They guide ethical living, spiritual growth, and
          the understanding of the universe. The rich traditions of the Vedas
          continue to inspire millions worldwide, connecting the past to the
          present.
        </p>
      </div>

      {/* Optional CTA Button */}
      {isOverflowing && (
        <div className="text-center mt-8">
          <button
            onClick={scrollToContent}
            className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700 transition"
          >
            Scroll to Read More
          </button>
        </div>
      )}
    </section>
  );
}
