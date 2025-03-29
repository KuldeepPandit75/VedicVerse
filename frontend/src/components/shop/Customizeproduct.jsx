import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../header/Navbar";

// This would be in a separate file in a real implementation
const ProductRenderer = ({ productType, customization, rotating }) => {
  // Base colors for materials
  const materialColors = {
    sandalwood: "#cd7f32",
    rudraksha: "#8B4513",
    crystal: "#f0f0ff",
    copper: "#b87333",
    silver: "#C0C0C0"
  };
  
  // Symbol components - in real implementation these would be SVGs or images
  const symbols = {
    om: "ॐ",
    lotus: "✿",
    swastika: "卐",
    shiva: "🔱",
    ganesha: "🐘",
    lakshmi: "💫",
    krishna: "🎭"
  };
  
  const renderMala = () => {
    return (
      <div className={`relative w-full h-full flex items-center justify-center ${rotating ? 'animate-spin-slow' : ''}`}>
        <div className="absolute w-64 h-64 rounded-full border-8" 
             style={{borderColor: materialColors[customization.material]}}></div>
        
        {/* Beads - simplified representation */}
        {Array.from({length: 12}).map((_, i) => (
          <div 
            key={i}
            className="absolute w-4 h-4 rounded-full"
            style={{
              backgroundColor: materialColors[customization.material],
              transform: `rotate(${i * 30}deg) translateY(-120px)`,
            }}
          ></div>
        ))}
        
        {/* Center symbol */}
        <div className="absolute bottom-16 text-4xl font-bold" style={{color: materialColors[customization.material]}}>
          {symbols[customization.centerpiece] || "❖"}
        </div>
        
        {/* Text showing bead count */}
        <div className="absolute top-16 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
          {customization.beadCount} beads
        </div>
        
        {/* Energy infusion visualization */}
        {customization.energyInfusion !== "none" && (
          <div className="absolute inset-0 rounded-full opacity-30"
               style={{
                 background: customization.energyInfusion === "peace" ? "radial-gradient(circle, #7bb0ff, transparent)" :
                           customization.energyInfusion === "prosperity" ? "radial-gradient(circle, #ffd700, transparent)" :
                           customization.energyInfusion === "protection" ? "radial-gradient(circle, #ff7b7b, transparent)" :
                           customization.energyInfusion === "healing" ? "radial-gradient(circle, #7bff7b, transparent)" :
                           "radial-gradient(circle, #ffffff, transparent)"
               }}
          ></div>
        )}
      </div>
    );
  };
  
  const renderYantra = () => {
    return (
      <div className={`relative w-full h-full flex items-center justify-center ${rotating ? 'animate-spin-slow' : ''}`}>
        {/* Simplified yantra representation with nested geometric shapes */}
        <div className="absolute w-56 h-56 border-2 rotate-45"
             style={{borderColor: materialColors[customization.material]}}></div>
        <div className="absolute w-48 h-48 border-2"
             style={{borderColor: materialColors[customization.material]}}></div>
        <div className="absolute w-40 h-40 border-2 rotate-45"
             style={{borderColor: materialColors[customization.material]}}></div>
        <div className="absolute w-32 h-32 border-2"
             style={{borderColor: materialColors[customization.material]}}></div>
        
        {/* Center symbol */}
        <div className="absolute text-4xl font-bold" style={{color: materialColors[customization.material]}}>
          {symbols[customization.centerpiece] || "❖"}
        </div>
        
        {/* Sanskrit inscription visualization */}
        {customization.inscription && (
          <div className="absolute bottom-10 text-sm text-white bg-black bg-opacity-50 px-2 py-1 rounded">
            Inscription: {customization.inscription.substring(0, 15)}{customization.inscription.length > 15 ? '...' : ''}
          </div>
        )}
        
        {/* Energy infusion visualization */}
        {customization.energyInfusion !== "none" && (
          <div className="absolute inset-0 opacity-30"
               style={{
                 background: customization.energyInfusion === "peace" ? "radial-gradient(circle, #7bb0ff, transparent)" :
                           customization.energyInfusion === "prosperity" ? "radial-gradient(circle, #ffd700, transparent)" :
                           customization.energyInfusion === "protection" ? "radial-gradient(circle, #ff7b7b, transparent)" :
                           customization.energyInfusion === "healing" ? "radial-gradient(circle, #7bff7b, transparent)" :
                           "radial-gradient(circle, #ffffff, transparent)"
               }}
          ></div>
        )}
      </div>
    );
  };
  
  const renderAltar = () => {
    return (
      <div className={`relative w-full h-full flex items-center justify-center ${rotating ? 'animate-spin-slow' : ''}`}>
        {/* Simplified altar representation */}
        <div className="absolute bottom-8 w-56 h-16 rounded-t-lg"
             style={{backgroundColor: materialColors[customization.material]}}></div>
        
        {/* Altar items */}
        <div className="absolute bottom-24 flex space-x-8">
          <div className="w-8 h-16 bg-amber-600 rounded-full"></div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" 
               style={{backgroundColor: materialColors[customization.material]}}>
            {symbols[customization.centerpiece] || "❖"}
          </div>
          <div className="w-8 h-16 bg-amber-600 rounded-full"></div>
        </div>
        
        {/* Sanskrit inscription visualization */}
        {customization.inscription && (
          <div className="absolute bottom-12 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
            {customization.inscription.substring(0, 20)}{customization.inscription.length > 20 ? '...' : ''}
          </div>
        )}
        
        {/* Energy infusion visualization */}
        {customization.energyInfusion !== "none" && (
          <div className="absolute inset-0 opacity-30"
               style={{
                 background: customization.energyInfusion === "peace" ? "linear-gradient(to top, #7bb0ff, transparent)" :
                           customization.energyInfusion === "prosperity" ? "linear-gradient(to top, #ffd700, transparent)" :
                           customization.energyInfusion === "protection" ? "linear-gradient(to top, #ff7b7b, transparent)" :
                           customization.energyInfusion === "healing" ? "linear-gradient(to top, #7bff7b, transparent)" :
                           "linear-gradient(to top, #ffffff, transparent)"
               }}
          ></div>
        )}
      </div>
    );
  };
  
  // Render the appropriate product type
  if (productType === "mala") return renderMala();
  if (productType === "yantra") return renderYantra();
  if (productType === "altar") return renderAltar();
  
  return <div className="text-white">Product preview not available</div>;
};

const CustomizeProduct = () => {
  const navigate = useNavigate();
  const [productType, setProductType] = useState("mala");
  const [customization, setCustomization] = useState({
    material: "sandalwood",
    beadCount: 108,
    centerpiece: "om",
    inscription: "",
    energyInfusion: "peace",
  });
  const [price, setPrice] = useState(0);
  const [rotating, setRotating] = useState(false);
  
  // Calculate price based on customization options
  useEffect(() => {
    let basePrice = 0;
    
    // Base price by product type
    if (productType === "mala") basePrice = 49;
    else if (productType === "yantra") basePrice = 79;
    else if (productType === "altar") basePrice = 129;
    
    // Add for premium materials
    if (customization.material === "rudraksha") basePrice += 25;
    else if (customization.material === "crystal") basePrice += 40;
    else if (customization.material === "silver") basePrice += 100;
    
    // Add for energy infusion
    if (customization.energyInfusion !== "none") basePrice += 15;
    
    // Add for inscriptions
    if (customization.inscription.length > 0) basePrice += 20;
    
    setPrice(basePrice);
  }, [productType, customization]);
  
  const handleCustomizationChange = (field, value) => {
    setCustomization({
      ...customization,
      [field]: value,
    });
  };
  
  const handleRotatePreview = () => {
    setRotating(true);
    setTimeout(() => setRotating(false), 3000);
  };
  
  const handleAddToCart = () => {
    // Add to cart logic would go here
    alert("Item added to cart!");
    // Navigate to cart or continue shopping
    // navigate("/cart");
  };

  return (
    <>
      <div className="sticky z-10 top-0">
        <Navbar />
      </div>
      <div className="min-h-screen bg-gradient-to-b from-[#1a0f00] to-[#3a2a1a] p-4">
        <h1 className="text-[#FFB563] text-4xl font-samarkan text-center mb-8">
          Sacred Artifacts Customization
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          {/* Preview Section */}
          <div className="w-full md:w-1/2 bg-[#a8661cb5] rounded-2xl p-6 flex flex-col items-center">
            <div className="w-80 h-80 relative bg-gray-900 bg-opacity-50 rounded-lg flex items-center justify-center cursor-pointer" onClick={handleRotatePreview}>
              <ProductRenderer 
                productType={productType} 
                customization={customization} 
                rotating={rotating} 
              />
              <div className="absolute bottom-2 right-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                Click to rotate
              </div>
            </div>
            
            <div className="mt-6 bg-gray-700 bg-opacity-70 rounded-xl p-4 w-full">
              <h3 className="text-[#FFB563] text-xl font-samarkan mb-2">Product Details</h3>
              <p className="text-white text-sm">
                This {productType} will be handcrafted by Vedic artisans following traditional methods. 
                Each piece is ritually consecrated and infused with spiritual energy according to ancient practices.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-white">Estimated Delivery: 14-21 days</span>
                <span className="text-[#FFB563] text-xl font-bold">USD {price}</span>
              </div>
              <button 
                onClick={handleAddToCart}
                className="w-full mt-4 bg-[#FFB563] hover:bg-[#e9a050] text-[#3a2a1a] font-bold py-3 px-4 rounded-lg transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
          
          {/* Customization Section */}
          <div className="w-full md:w-1/2 bg-gray-700 bg-opacity-70 rounded-2xl p-6">
            <h2 className="text-[#FFB563] text-2xl font-samarkan mb-4">Customize Your Sacred Item</h2>
            
            <div className="mb-6">
              <label className="block text-white mb-2">Select Product Type</label>
              <div className="grid grid-cols-3 gap-4">
                {['mala', 'yantra', 'altar'].map(type => (
                  <div 
                    key={type}
                    onClick={() => setProductType(type)}
                    className={`cursor-pointer p-3 rounded-lg text-center transition-all duration-300 ${
                      productType === type 
                        ? 'bg-[#a8661cb5] text-[#FFB563] border-2 border-[#FFB563]' 
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    <span className="capitalize">{type}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-white mb-2">Material</label>
              <select 
                value={customization.material}
                onChange={(e) => handleCustomizationChange('material', e.target.value)}
                className="w-full bg-gray-800 text-white p-3 rounded-lg"
              >
                <option value="sandalwood">Sandalwood</option>
                <option value="rudraksha">Rudraksha</option>
                <option value="crystal">Crystal</option>
                <option value="copper">Copper</option>
                <option value="silver">Silver (Premium)</option>
              </select>
            </div>
            
            {productType === 'mala' && (
              <div className="mb-6">
                <label className="block text-white mb-2">Bead Count</label>
                <div className="flex items-center">
                  <input 
                    type="range" 
                    min="54" 
                    max="108" 
                    step="54"
                    value={customization.beadCount}
                    onChange={(e) => handleCustomizationChange('beadCount', parseInt(e.target.value))}
                    className="w-full mr-4"
                  />
                  <span className="text-white">{customization.beadCount}</span>
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <label className="block text-white mb-2">Centerpiece Symbol</label>
              <div className="grid grid-cols-4 gap-3">
                {['om', 'lotus', 'swastika', 'shiva', 'ganesha', 'lakshmi', 'krishna', 'custom'].map(symbol => (
                  <div 
                    key={symbol}
                    onClick={() => handleCustomizationChange('centerpiece', symbol)}
                    className={`cursor-pointer p-2 rounded-lg text-center transition-all duration-300 ${
                      customization.centerpiece === symbol 
                        ? 'bg-[#a8661cb5] text-[#FFB563] border border-[#FFB563]' 
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    <span className="capitalize">{symbol}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-white mb-2">Sanskrit Inscription</label>
              <textarea 
                value={customization.inscription}
                onChange={(e) => handleCustomizationChange('inscription', e.target.value)}
                placeholder="Enter Sanskrit verse or mantra (optional)"
                className="w-full bg-gray-800 text-white p-3 rounded-lg"
                rows="2"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-white mb-2">Energy Infusion</label>
              <select 
                value={customization.energyInfusion}
                onChange={(e) => handleCustomizationChange('energyInfusion', e.target.value)}
                className="w-full bg-gray-800 text-white p-3 rounded-lg"
              >
                <option value="none">None</option>
                <option value="peace">Peace & Tranquility</option>
                <option value="prosperity">Prosperity & Abundance</option>
                <option value="protection">Protection & Safety</option>
                <option value="healing">Healing & Wellness</option>
                <option value="clarity">Mental Clarity & Wisdom</option>
              </select>
            </div>
            
            <div className="mt-8 bg-[#a8661cb5] rounded-xl p-4">
              <h3 className="text-[#FFB563] text-xl font-samarkan mb-2">The Sacred Creation Process</h3>
              <p className="text-white text-sm">
                Each item is crafted during auspicious times according to the Vedic calendar. 
                Our artisans follow traditional methods passed down through generations, 
                infusing each piece with spiritual energy through ritual practices.
                Your custom creation will be shipped with a certificate of authenticity 
                and instructions for proper care and use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomizeProduct;
