import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Vedic Tree data
const treeData = {
  name: "Vedas",
  children: [
    { name: "Rigveda" },
    { name: "Yajurveda" },
    { name: "Samaveda" },
    { name: "Atharvaveda" },
  ],
};

// TreeNode component to display each node
const TreeNode = ({ node, level = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: level * 0.8, duration: 0.8 }}
      className="flex flex-col items-center relative mt-6"
    >
      {/* Node Box */}
      <div className="text-[#4d2305] text-lg z-10 md:text-base border-2 border-[#d4af37] rounded-full bg-[#bf842c] px-6 py-3 md:px-8 md:py-4 shadow-md relative">
        {node.name}
      </div>

      {/* Render children nodes */}
      {node.children && (
        <div className="flex gap-12 md:gap-20 mt-6 relative">
          {node.children.map((child, index) => (
            <div key={index} className="relative flex flex-col items-center">
              {/* Vertical line from parent to child */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "90px" }}
                transition={{ duration: 0.8, delay: (level + 1) * 0.8 }}
                className="absolute top-[-50px] left-1/2 w-0.5 bg-[#0c0a05]"
              />
              {/* Recursively render child node */}
              <TreeNode node={child} level={level + 1} />
            </div>
          ))}
        </div>
      )}

      {/* Expanding Horizontal Line */}
      <motion.div
        style={{
          width: "100%",
          height: "3px",
          backgroundColor: "#000",
          position: "absolute",
          top: "30px", // Adjust top margin for better alignment
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1, // Increased z-index to ensure visibility
        }}
        initial={{ width: 0 }}
        animate={{ width: "90%" }}
        transition={{ duration: 2 }}
        className="-z-10"
      />
    </motion.div>
  );
};

const AnimatedTree = () => {
  return <TreeNode node={treeData} />;
};

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
        src="https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241191/pagedesign_dfgion.png"
        alt="VedicVerse Background"
      />
      <div
        ref={contentRef}
        className="absolute top-5 left-10 md:left-56 text-white p-6 bg-opacity-70 rounded-lg md:w-[850px] w-full max-w-full overflow-y-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#5a040dfa]">
          Introduction to Vedic Knowledge
        </h1>

        <div className="mt-10 ml-3 w-full flex justify-center">
          <AnimatedTree />
        </div>

        <p className="mt-3 text-xl md:text-2xl font-bold text-red-800">
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
