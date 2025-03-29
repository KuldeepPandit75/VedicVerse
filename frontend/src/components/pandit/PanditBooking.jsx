import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../header/Navbar";

const PanditBooking = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = [
    { id: "all", name: "All Ceremonies" },
    { id: "griha", name: "Griha Pravesh" },
    { id: "vivah", name: "Vivah (Wedding)" },
    { id: "naamkaran", name: "Naamkaran" },
    { id: "puja", name: "Daily Puja" },
    { id: "havan", name: "Havan & Yagya" },
  ];
  
  const pandits = [
    {
      id: 1,
      name: "Pandit Ramesh Sharma",
      specialization: ["griha", "puja", "havan"],
      experience: 25,
      languages: ["Hindi", "Sanskrit", "English"],
      location: "Delhi, India (Available for Virtual)",
      rating: 4.9,
      reviews: 124,
      image: "pandit1.jpg",
      price: 51,
      availability: "Available",
      description: "Specializes in traditional Vedic ceremonies with a focus on accurate Sanskrit pronunciation and authentic ritual procedures."
    },
    {
      id: 2,
      name: "Acharya Vikram Shastri",
      specialization: ["vivah", "naamkaran", "havan"],
      experience: 30,
      languages: ["Hindi", "Sanskrit", "Gujarati"],
      location: "Gujarat, India (Available for Virtual)",
      rating: 4.8,
      reviews: 98,
      image: "pandit2.jpg",
      price: 65,
      availability: "Available",
      description: "Expert in wedding ceremonies and child naming rituals with deep knowledge of astrological considerations."
    },
    {
      id: 3,
      name: "Pandit Suresh Joshi",
      specialization: ["puja", "griha", "havan"],
      experience: 20,
      languages: ["Hindi", "Sanskrit", "English", "Marathi"],
      location: "Mumbai, India (Available for Virtual)",
      rating: 4.7,
      reviews: 87,
      image: "pandit3.jpg",
      price: 45,
      availability: "Booked until next week",
      description: "Known for simplified explanations of complex rituals, making ceremonies accessible to younger generations."
    },
    {
      id: 4,
      name: "Acharya Deepak Trivedi",
      specialization: ["vivah", "griha", "havan"],
      experience: 35,
      languages: ["Hindi", "Sanskrit", "English"],
      location: "Varanasi, India (Available for Virtual)",
      rating: 5.0,
      reviews: 156,
      image: "pandit4.jpg",
      price: 75,
      availability: "Limited Availability",
      description: "Highly respected Vedic scholar from Varanasi with expertise in traditional ceremonies and spiritual guidance."
    },
    {
      id: 5,
      name: "Pandit Kailash Upadhyay",
      specialization: ["naamkaran", "puja", "vivah"],
      experience: 22,
      languages: ["Hindi", "Sanskrit", "Bengali"],
      location: "Kolkata, India (Available for Virtual)",
      rating: 4.6,
      reviews: 72,
      image: "pandit5.jpg",
      price: 49,
      availability: "Available",
      description: "Combines traditional rituals with contemporary explanations, specializing in child naming ceremonies."
    },
    {
      id: 6,
      name: "Dr. Acharya Vinod Pandey",
      specialization: ["havan", "puja", "griha"],
      experience: 40,
      languages: ["Hindi", "Sanskrit", "English", "Nepali"],
      location: "Rishikesh, India (Available for Virtual)",
      rating: 4.9,
      reviews: 203,
      image: "pandit6.jpg",
      price: 85,
      availability: "Limited Availability",
      description: "PhD in Sanskrit with expertise in Vedic rituals. Provides detailed explanations of the spiritual significance of each ritual."
    },
    {
      id: 7,
      name: "Pandit Mohan Bhatt",
      specialization: ["vivah", "griha", "naamkaran"],
      experience: 28,
      languages: ["Hindi", "Sanskrit", "Kannada", "English"],
      location: "Bangalore, India (Available for Virtual)",
      rating: 4.7,
      reviews: 91,
      image: "pandit7.jpg",
      price: 55,
      availability: "Available",
      description: "Known for blending South Indian and North Indian ritual traditions with comprehensive explanations."
    },
    {
      id: 8,
      name: "Acharya Sundar Gurukkal",
      specialization: ["puja", "havan", "vivah"],
      experience: 32,
      languages: ["Hindi", "Sanskrit", "Tamil", "Malayalam"],
      location: "Kerala, India (Available for Virtual)",
      rating: 4.8,
      reviews: 84,
      image: "pandit8.jpg",
      price: 60,
      availability: "Available",
      description: "Expert in traditional Kerala style rituals with deep knowledge of Vedic and Tantric traditions."
    }
  ];
  
  // Filter pandits based on category and search query
  const filteredPandits = pandits.filter(pandit => {
    const matchesCategory = activeCategory === "all" || pandit.specialization.includes(activeCategory);
    const matchesSearch = pandit.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pandit.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const handlePanditClick = (panditId) => {
    navigate(`/pandit-booking/${panditId}`);
  };

  return (
    <>
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      <div className="min-h-screen bg-gradient-to-b from-[#1a0f00] to-[#3a2a1a] p-4">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-[#FFB563] text-4xl font-samarkan text-center mb-8">
            Book a Vedic Pandit
          </h1>
          
          {/* Featured Banner */}
          <div className="relative h-64 mb-10 overflow-hidden md:h-80 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f00] to-transparent z-10"></div>
            <img 
              src="pandit_banner.jpg" 
              alt="Vedic Ceremonies" 
              className="absolute inset-0 object-cover w-full h-full"
            />
            <div className="relative z-20 flex flex-col justify-center h-full p-8">
              <h2 className="text-[#FFB563] text-3xl md:text-4xl font-samarkan mb-2">
                Authentic Vedic Ceremonies
              </h2>
              <p className="max-w-lg text-lg text-white md:text-xl">
                Connect with experienced pandits for both in-person and virtual ceremonies
              </p>
              <div className="flex w-full max-w-lg p-2 mt-4 bg-white rounded-lg bg-opacity-10 backdrop-blur-sm">
                <input 
                  type="text"
                  placeholder="Search by name or specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-2 text-white bg-transparent outline-none"
                />
                <button className="bg-[#FFB563] text-[#3a2a1a] px-4 py-2 rounded-lg font-bold">
                  Search
                </button>
              </div>
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
          
          {/* Pandits Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPandits.map(pandit => (
              <div 
                key={pandit.id}
                className="bg-gradient-to-b from-[#a8661cb5] to-[#a8661c80] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => handlePanditClick(pandit.id)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={pandit.image} 
                    alt={pandit.name} 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-2">
                    <div className="bg-[#FFB563] text-[#3a2a1a] text-xs font-bold px-2 py-1 rounded flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {pandit.rating}
                    </div>
                    <div className="px-2 py-1 text-xs text-white bg-gray-900 rounded bg-opacity-70">
                      {pandit.reviews} reviews
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                    <div className="text-xs text-white">
                      {pandit.experience} years experience
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-[#FFB563] text-xl font-samarkan mb-1">{pandit.name}</h3>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {pandit.specialization.map(spec => (
                      <span key={spec} className="px-2 py-1 text-xs text-white bg-gray-700 rounded">
                        {categories.find(cat => cat.id === spec)?.name || spec}
                      </span>
                    ))}
                  </div>
                  <p className="h-12 mb-3 overflow-hidden text-sm text-white">
                    {pandit.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#FFB563] font-bold">USD {pandit.price}/hour</span>
                    <div className={`text-xs px-2 py-1 rounded ${
                      pandit.availability === "Available" 
                        ? "bg-green-800 text-green-200" 
                        : "bg-yellow-800 text-yellow-200"
                    }`}>
                      {pandit.availability}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredPandits.length === 0 && (
            <div className="py-12 text-center text-white">
              <div className="mb-4 text-6xl">🙏</div>
              <h3 className="text-[#FFB563] text-2xl font-samarkan mb-2">No Pandits Found</h3>
              <p>Try adjusting your search criteria or category selection.</p>
            </div>
          )}
          
          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-[#FFB563] text-3xl font-samarkan text-center mb-8">How It Works</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-[#a8661cb5] rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-[#FFB563] text-[#3a2a1a] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-[#FFB563] text-xl font-samarkan mb-2">Choose a Ceremony</h3>
                <p className="text-white">Select the type of ceremony you need and browse our verified pandits.</p>
              </div>
              <div className="bg-[#a8661cb5] rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-[#FFB563] text-[#3a2a1a] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-[#FFB563] text-xl font-samarkan mb-2">Book & Consult</h3>
                <p className="text-white">Schedule a date and time, then consult with the pandit to discuss your requirements.</p>
              </div>
              <div className="bg-[#a8661cb5] rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-[#FFB563] text-[#3a2a1a] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-[#FFB563] text-xl font-samarkan mb-2">Attend Ceremony</h3>
                <p className="text-white">Participate in your ceremony either virtually or in-person based on your selection.</p>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="p-6 mt-16 bg-gray-700 bg-opacity-70 rounded-xl">
            <h2 className="text-[#FFB563] text-2xl font-samarkan mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="pb-4 border-b border-gray-600">
                <h3 className="text-[#FFB563] text-lg mb-2">What materials do I need to prepare for the ceremony?</h3>
                <p className="text-white">Once you book a pandit, they will provide you with a detailed list of all required materials (samagri) based on the specific ceremony you're planning.</p>
              </div>
              <div className="pb-4 border-b border-gray-600">
                <h3 className="text-[#FFB563] text-lg mb-2">How do virtual ceremonies work?</h3>
                <p className="text-white">Virtual ceremonies are conducted via video call. The pandit will guide you through each step of the ritual remotely, explaining the significance and ensuring proper execution.</p>
              </div>
              <div className="pb-4 border-b border-gray-600">
                <h3 className="text-[#FFB563] text-lg mb-2">Can I request a specific language for the ceremony?</h3>
                <p className="text-white">Yes, you can select a pandit based on the languages they speak. Each pandit profile lists their language proficiencies.</p>
              </div>
              <div>
                <h3 className="text-[#FFB563] text-lg mb-2">What is your cancellation policy?</h3>
                <p className="text-white">Cancellations made 48 hours before the scheduled ceremony receive a full refund. Later cancellations may be subject to a fee. Emergency situations are handled on a case-by-case basis.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PanditBooking;
