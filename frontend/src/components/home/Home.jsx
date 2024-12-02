// src Home.jsx
import React from "react";
// import Navbar from "./compone";
// import {Feature as Card} from "./components/F"
import Card from "../features/Feature";
const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('temple-background.jpg')",
      }}
    >
      <Card
        image="collection-icon.svg"
        title="Collection of Vedas"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut metus finibus."
      />
      <Card
        image="translate-icon.svg"
        title="Translate Vedic Texts"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut metus finibus."
      />
    </div>
  );
};

export default Home;
