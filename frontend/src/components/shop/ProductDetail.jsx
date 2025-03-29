import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../header/Navbar";
import PaymentModal from "../payment/PaymentModal";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // In a real implementation, you would fetch this data from your backend
  // This is just mock data for demonstration
  useEffect(() => {
    // Mock product data - in a real app, you'd fetch from an API
    const productData = {
      id: parseInt(id),
      name: "Copper Puja Thali",
      category: "altar",
      price: 65,
      coins: 195, // Vedic Coins price
      images: ["puja_thali_1.png", "puja_thali_2.png", "puja_thali_3.png"],
      description: "Traditional copper plate for offering flowers, incense, and other items during puja ceremonies.",
      details: {
        material: "Pure Copper",
        dimensions: "8 inches diameter",
        weight: "350 grams",
        origin: "Handcrafted in Varanasi, India",
        care: "Clean with lemon and salt paste, rinse with water and dry thoroughly"
      },
      spiritual_significance: "The copper thali is considered auspicious for rituals as copper is associated with the planet Venus (Shukra) in Vedic astrology. It is believed to enhance the positive effects of offerings made during puja ceremonies. Copper also has natural antimicrobial properties, making it ideal for sacred rituals.",
      usage_instructions: "1. Place the thali in front of the deity\n2. Arrange flowers, incense, diya lamp, and other offerings on the plate\n3. Use during daily puja or special ceremonies\n4. Clean after each use to maintain purity",
      stock: 15
    };
    
    setProduct(productData);
    
    // Mock related products
    setRelatedProducts([
      {
        id: 6,
        name: "Brass Diya Lamp",
        price: 45,
        coins: 135,
        image: "diya_lamp.png",
      },
      {
        id: 12,
        name: "Silver Aarti Bell",
        price: 55,
        coins: 165,
        image: "aarti_bell.png",
      },
      {
        id: 15,
        name: "Wooden Incense Holder",
        price: 25,
        coins: 75,
        image: "incense_holder.png",
      }
    ]);
  }, [id]);
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.stock || 10)) {
      setQuantity(value);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < (product?.stock || 10)) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    // Add to cart logic would go here
    alert(`Added ${quantity} ${product.name}(s) to cart!`);
    // Navigate to cart or stay on page
  };
  
  const handleBuyNow = () => {
    // Open payment modal
    setShowPaymentModal(true);
  };
  
  const handlePaymentComplete = (paymentDetails) => {
    console.log("Payment completed:", paymentDetails);
    setShowPaymentModal(false);
    
    // Show confirmation message
    alert(`Thank you for purchasing ${product.name}!`);
    
    // You would typically navigate to a confirmation page or order history
    // navigate("/order-confirmation");
  };
  
  if (!product) {
    return (
      <>
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>
        <div className="min-h-screen bg-gradient-to-b from-[#1a0f00] to-[#3a2a1a] p-4 flex justify-center items-center">
          <div className="text-[#FFB563] text-xl">Loading product details...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      <div className="min-h-screen bg-gradient-to-b from-[#1a0f00] to-[#3a2a1a] p-4">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-white">
            <button onClick={() => navigate('/shop')} className="hover:text-[#FFB563]">Shop</button>
            <span className="mx-2">/</span>
            <button onClick={() => navigate('/shop?category=' + product.category)} className="hover:text-[#FFB563] capitalize">{product.category}</button>
            <span className="mx-2">/</span>
            <span className="text-[#FFB563]">{product.name}</span>
          </div>
          
          {/* Product Detail Section */}
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Product Images */}
            <div className="w-full lg:w-1/2">
              <div className="bg-[#a8661cb5] rounded-xl p-4">
                <div className="mb-4 overflow-hidden rounded-lg aspect-square">
                  <img 
                    src={`/${product.images[0]}`} 
                    alt={product.name} 
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {product.images.map((image, index) => (
                    <div 
                      key={index} 
                      className="aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#FFB563]"
                    >
                      <img 
                        src={`/${image}`} 
                        alt={`${product.name} ${index + 1}`} 
                        className="object-contain w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="w-full lg:w-1/2">
              <div className="p-6 bg-gray-700 bg-opacity-70 rounded-xl">
                <h1 className="text-[#FFB563] text-3xl font-samarkan mb-2">{product.name}</h1>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg text-white">USD {product.price}</div>
                  <div className="flex items-center">
                    <img 
                      src="/vedic_coin.png" 
                      alt="Vedic Coin" 
                      className="w-5 h-5 mr-1"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/20x20?text=VC";
                      }}
                    />
                    <span className="text-[#FFB563] font-bold">{product.coins} Vedic Coins</span>
                  </div>
                </div>
                <p className="mb-6 text-white">{product.description}</p>
                
                {/* Product Details */}
                <div className="mb-6">
                  <h3 className="text-[#FFB563] text-xl font-samarkan mb-2">Specifications</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(product.details).map(([key, value]) => (
                      <div key={key} className="flex">
                        <span className="text-[#FFB563] capitalize mr-2">{key.replace('_', ' ')}:</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Stock */}
                <div className="mb-6">
                  <div className="text-white">
                    Availability: 
                    <span className={product.stock > 0 ? "text-green-400 ml-2" : "text-red-400 ml-2"}>
                      {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
                    </span>
                  </div>
                </div>
                
                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block mb-2 text-white">Quantity</label>
                  <div className="flex items-center">
                    <button 
                      onClick={decrementQuantity}
                      className="flex items-center justify-center w-10 h-10 text-white bg-gray-800 rounded-l-lg"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      min="1" 
                      max={product.stock}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-16 h-10 text-center text-white bg-gray-800"
                    />
                    <button 
                      onClick={incrementQuantity}
                      className="flex items-center justify-center w-10 h-10 text-white bg-gray-800 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col gap-4 mb-6 sm:flex-row">
                  <button 
                    onClick={handleAddToCart}
                    className="bg-[#FFB563] hover:bg-[#e9a050] text-[#3a2a1a] font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex-1"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={handleBuyNow}
                    className="flex-1 px-6 py-3 font-bold text-white transition-colors duration-300 bg-gray-800 rounded-lg hover:bg-gray-700"
                  >
                    Buy Now
                  </button>
                </div>
                
                {/* Shipping Info */}
                <div className="text-sm text-white">
                  <div className="flex items-center mb-1">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    Free shipping on orders over USD 75
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Estimated delivery: 14-21 days
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="mt-10 overflow-hidden bg-gray-700 bg-opacity-70 rounded-xl">
            <div className="flex border-b border-gray-600">
              {["description", "usage", "spiritual_significance"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-lg font-samarkan transition-colors duration-300 ${
                    activeTab === tab
                      ? 'bg-[#a8661cb5] text-[#FFB563]'
                      : 'text-white hover:bg-gray-600'
                  }`}
                >
                  {tab === "description" ? "Description" : 
                   tab === "usage" ? "Usage Instructions" : 
                   "Spiritual Significance"}
                </button>
              ))}
            </div>
            <div className="p-6 text-white">
              {activeTab === "description" && (
                <div>
                  <p>{product.description}</p>
                  <div className="mt-4">
                    <h3 className="text-[#FFB563] text-xl font-samarkan mb-2">Details</h3>
                    <ul className="pl-5 list-disc">
                      {Object.entries(product.details).map(([key, value]) => (
                        <li key={key} className="mb-1">
                          <span className="font-bold capitalize">{key.replace('_', ' ')}:</span> {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === "usage" && (
                <div>
                  <h3 className="text-[#FFB563] text-xl font-samarkan mb-2">How to Use</h3>
                  <div className="whitespace-pre-line">{product.usage_instructions}</div>
                </div>
              )}
              
              {activeTab === "spiritual_significance" && (
                <div>
                  <h3 className="text-[#FFB563] text-xl font-samarkan mb-2">Spiritual Significance</h3>
                  <p>{product.spiritual_significance}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Related Products */}
          <div className="mt-10">
            <h2 className="text-[#FFB563] text-2xl font-samarkan mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {relatedProducts.map(product => (
                <div 
                  key={product.id}
                  className="bg-gradient-to-b from-[#a8661cb5] to-[#a8661c80] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/shop/product/${product.id}`)}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={`/${product.image}`} 
                      alt={product.name} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[#FFB563] text-xl font-samarkan mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <div className="text-white">USD {product.price}</div>
                        <div className="flex items-center text-sm">
                          <img 
                            src="/vedic_coin.png" 
                            alt="Vedic Coin" 
                            className="w-3 h-3 mr-1"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://placehold.co/12x12?text=VC";
                            }}
                          />
                          <span className="text-[#FFB563]">{product.coins}</span>
                        </div>
                      </div>
                      <button className="px-3 py-1 text-sm text-white transition-colors duration-300 bg-gray-700 rounded-lg hover:bg-gray-600">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Modal */}
      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        productName={product.name}
        productPrice={product.price}
        productCoins={product.coins}
        onPaymentComplete={handlePaymentComplete}
      />
    </>
  );
};

export default ProductDetail;
