import React, { useEffect, useState } from "react";
import Navbar from "../header/Navbar";
import { useNavigate } from "react-router";

export default function VedBooks() {
  const coverPhoto = [
    {
      name: "samved",
      path: "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241086/samved_rvrezh.jpg",
    },
    {
      name: "rigved",
      path: "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241086/rigved_o7vkdb.jpg",
    },
    {
      name: "yajurved",
      path: "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241090/yajurved_lumlob.jpg",
    },
    {
      name: "arthved",
      path: "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241084/arthved_j1c9qe.jpg",
    },
    {
      name: "gita",
      path: "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241086/gita_xkwztu.jpg",
    },
    {
      name: "bhagwat",
      path: "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241084/bhagwat_jjybi7.jpg",
    },
    {
      name: "nard",
      path: "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241085/narad_pdlkpn.jpg",
    },
    {
      name: "shiv",
      path: "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241087/shiv_epdpzb.jpg",
    },
    {
      name: "vaman",
      path: "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241087/vaman_nnzwwl.jpg",
    },
    {
      name: "vishnu",
      path: "https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241092/vishnu_ibaain.jpg",
    },
  ];

  const navigate = useNavigate();
  const [isSpread, setIsSpread] = useState(false);

  const navtobook = (bookName) => {
    navigate("/uploadBook", { state: { bookName } });
  };

  useEffect(() => { 
    // Trigger the spread animation after the component mounts
    const timer = setTimeout(() => {
      setIsSpread(true);
    }, 100); // Delay to allow for initial overlap

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen backdrop-blur-[10px]">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="p-8 backdrop-blur-lg h-screen overflow-y-auto z-10 pt-24">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {coverPhoto.map((book, index) => (
            <li
              key={index}
              className={`w-full cursor-pointer transition-transform duration-700 ${
                isSpread
                  ? "transform scale-100 opacity-100"
                  : "transform scale-50 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`, // Stagger the animation
              }}
              onClick={() => navtobook(book.name)}
            >
              <img
                src={book.path}
                alt="Book Cover"
                className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-xl"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
