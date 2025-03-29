import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../header/Navbar";


const ShopHome = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories = [
    { id: "all", name: "All Items" },
    { id: "mala", name: "Prayer Malas" },
    { id: "yantra", name: "Sacred Yantras" },
    { id: "altar", name: "Altar Items" },
    { id: "ritual", name: "Ritual Supplies" }
  ];
  
  const products = [
    {
      id: 1,
      name: "Rudraksha Mala",
      category: "mala",
      price: 49,
      image: "rudraksha_mala.png",
      description: "108-bead prayer mala made from sacred Rudraksha seeds, traditionally used for japa meditation.",
      customizable: true
    },
    {
      id: 2,
      name: "Sri Yantra",
      category: "yantra",
      price: 79,
      image: "sri_yantra.png",
      description: "The most revered sacred geometry pattern in Vedic tradition, representing the cosmos and divine feminine energy.",
      customizable: true
    },
    {
      id: 3,
      name: "Copper Puja Thali",
      category: "altar",
      price: 65,
      image: "puja_thali.png",
      description: "Traditional copper plate for offering flowers, incense, and other items during puja ceremonies.",
      customizable: false
    },
    {
      id: 4,
      name: "Sandalwood Mala",
      category: "mala",
      price: 59,
      image: "sandalwood_mala.png",
      description: "Fragrant sandalwood mala beads known for their calming properties and spiritual significance.",
      customizable: true
    },
    {
      id: 5,
      name: "Lakshmi Yantra",
      category: "yantra",
      price: 85,
      image: "lakshmi_yantra.png",
      description: "Sacred geometric pattern dedicated to Goddess Lakshmi, deity of wealth and prosperity.",
      customizable: true
    },
    {
      id: 6,
      name: "Brass Diya Lamp",
      category: "altar",
      price: 45,
      image: "diya_lamp.png",
      description: "Traditional oil lamp used in daily rituals and special ceremonies to represent divine light.",
      customizable: false
    },
    {
      id: 7,
      name: "Dhoop Incense Cones",
      category: "ritual",
      price: 15,
      image: "dhoop_cones.png",
      description: "Pure herbal incense cones made with traditional Vedic herbs for purification and meditation.",
      customizable: false
    },
    {
      id: 8,
      name: "Crystal Mala",
      category: "mala",
      price: 89,
      image: "crystal_mala.png",
      description: "Prayer beads crafted from clear quartz crystal, known for amplifying spiritual energy.",
      customizable: true
    }
  ];
  
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  const handleProductClick = (product) => {
    if (product.customizable) {
      navigate(`/shop/customize/${product.category}/${product.id}`);
    } else {
      navigate(`/shop/product/${product.id}`);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      <div className="min-h-screen bg-gradient-to-b from-[#1a0f00] to-[#3a2a1a] p-4">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-[#FFB563] text-4xl font-samarkan text-center mb-8">
            Sacred Artifacts Marketplace
          </h1>
          
          {/* Featured Banner */}
          <div className="relative h-64 mb-10 overflow-hidden md:h-80 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f00] to-transparent z-10"></div>
            <img 
              src="shop_banner.jpg" 
              alt="Sacred Artifacts" 
              className="absolute inset-0 object-cover w-full h-full"
            />
            <div className="relative z-20 flex flex-col justify-center h-full p-8">
              <h2 className="text-[#FFB563] text-3xl md:text-4xl font-samarkan mb-2">
                Traditional Craftsmanship
              </h2>
              <p className="max-w-lg text-lg text-white md:text-xl">
                Each item is handcrafted by skilled artisans following ancient Vedic traditions
              </p>
              <button 
                onClick={() => navigate('/shop/customize')}
                className="mt-4 bg-[#FFB563] hover:bg-[#e9a050] text-[#3a2a1a] font-bold py-3 px-6 rounded-lg transition-colors duration-300 w-fit"
              >
                Create Custom Items
              </button>
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex pb-4 mb-8 space-x-4 overflow-x-auto scrollbar-hide">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full whitespace-nowrap transition-colors duration-300 ${
                  activeCategory === category.id 
                    ? 'bg-[#FFB563] text-[#3a2a1a] font-bold' 
                    : 'bg-gray-700 bg-opacity-70 text-white hover:bg-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map(product => (
              <div 
                key={product.id}
                className="bg-gradient-to-b from-[#a8661cb5] to-[#a8661c80] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="object-cover w-full h-full"
                  />
                  {product.customizable && (
                    <div className="absolute top-2 right-2 bg-[#FFB563] text-[#3a2a1a] text-xs font-bold px-2 py-1 rounded">
                      Customizable
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-[#FFB563] text-xl font-samarkan mb-1">{product.name}</h3>
                  <p className="h-12 mb-3 overflow-hidden text-sm text-white">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#FFB563] font-bold">USD {product.price}</span>
                    <button className="px-3 py-1 text-sm text-white transition-colors duration-300 bg-gray-700 rounded-lg hover:bg-gray-600">
                      {product.customizable ? 'Customize' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Custom Creation Call-to-Action */}
          <div className="mt-12 bg-[#a8661cb5] rounded-xl p-6 text-center">
            <h2 className="text-[#FFB563] text-2xl font-samarkan mb-2">
              Can't Find What You're Looking For?
            </h2>
            <p className="mb-4 text-white">
              Create your own custom sacred items with our personalization tools.
              Our artisans will craft them according to your specifications.
            </p>
            <button 
              onClick={() => navigate('/shop/customize')}
              className="bg-[#FFB563] hover:bg-[#e9a050] text-[#3a2a1a] font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Start Custom Design
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopHome;
