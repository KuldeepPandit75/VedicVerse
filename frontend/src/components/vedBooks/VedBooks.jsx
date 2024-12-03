import React from "react";
import Navbar from "../header/Navbar";
import { useNavigate } from "react-router";

export default function VedBooks() {
  const coverPhoto = [
    { name: "samved", path: "/samved.jpeg" },
    { name: "rigved", path: "/rigved.jpeg" },
    { name: "yajurved", path: "/yajurved.jpeg" },
    { name: "arthved", path: "/arthved.jpeg" },
    { name: "gita", path: "/gita.jpg" },
    { name: "bhagwat", path: "/bhagwat.jpeg" },
    { name: "nard", path: "/narad.jpeg" },
    { name: "shiv", path: "/shiv.jpeg" },
    { name: "vaman", path: "/vaman.jpeg" },
    { name: "vishnu", path: "/vishnu.jpeg" },
  ];

  const navigate = useNavigate();
  const navtobook = (bookName) => {
    navigate("/uploadBook", { state: { bookName } });
  };
  return (
    <div className="min-h-screen backdrop-blur-[10px]">
      <Navbar />
      <div className="p-8 backdrop-blur-lg h-screen overflow-y-auto m-3">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {coverPhoto.map((book, index) => (
            <li
              key={index}
              className="w-full hover:scale-105  cursor-pointer transition-transform duration-400"
            >
              <img
                src={book.path}
                alt="Book Cover"
                className="w-full h-full object-cover rounded-lg shadow-md "
                onClick={() => navtobook(book.name)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
