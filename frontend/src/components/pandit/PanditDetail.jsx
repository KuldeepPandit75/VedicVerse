import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../header/Navbar";

const PanditDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pandit, setPandit] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [ceremonyType, setCeremonyType] = useState("");
  const [isVirtual, setIsVirtual] = useState(true);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [activeTab, setActiveTab] = useState("about");
  
  // Mock data - in a real app, you'd fetch from an API
  useEffect(() => {
    // Simulating API call
    const panditData = {
      id: parseInt(id),
      name: "Pandit Ramesh Sharma",
      specialization: ["griha", "puja", "havan"],
      experience: 25,
      languages: ["Hindi", "Sanskrit", "English"],
      location: "Delhi, India (Available for Virtual)",
      rating: 4.9,
      reviews: 124,
      images: ["pandit1_1.jpg", "pandit1_2.jpg", "pandit1_3.jpg"],
      price: 51,
      availability: "Available",
      description: "Specializes in traditional Vedic ceremonies with a focus on accurate Sanskrit pronunciation and authentic ritual procedures.",
      bio: "Pandit Ramesh Sharma comes from a lineage of Vedic scholars spanning over seven generations. He completed his education in Sanskrit and Vedic rituals from Banaras Hindu University and has been performing ceremonies for over 25 years. His approach combines traditional authenticity with clear explanations that make the rituals accessible to everyone, regardless of their background knowledge.",
      ceremonies: [
        { id: "griha", name: "Griha Pravesh", price: 151, duration: "3-4 hours" },
        { id: "puja", name: "Satyanarayan Puja", price: 101, duration: "1-2 hours" },
        { id: "havan", name: "Rudra Abhishek", price: 201, duration: "2-3 hours" },
        { id: "puja", name: "Ganesh Puja", price: 51, duration: "1 hour" },
        { id: "havan", name: "Maha Mrityunjaya Havan", price: 151, duration: "2 hours" }
      ],
      availableDates: ["2025-03-15", "2025-03-16", "2025-03-18", "2025-03-20", "2025-03-21"],
      availableTimes: ["07:00", "08:00", "09:00", "10:00", "16:00", "17:00", "18:00"],
      testimonials: [
        { 
          name: "Rahul Mehta", 
          ceremony: "Griha Pravesh", 
          rating: 5,
          date: "2025-02-10",
          comment: "Pandit ji conducted our house warming ceremony with great precision. His explanations made the rituals meaningful for our entire family." 
        },
        { 
          name: "Priya Singh", 
          ceremony: "Satyanarayan Puja", 
          rating: 5,
          date: "2025-01-25",
          comment: "We had a virtual ceremony due to the pandemic, but Pandit ji made it feel just as sacred as an in-person one. Highly recommended!" 
        },
        { 
          name: "Vikram Desai", 
          ceremony: "Maha Mrityunjaya Havan", 
          rating: 4,
          date: "2024-12-18",
          comment: "Very knowledgeable and patient. Took time to explain the significance of each step in the ritual." 
        }
      ]
    };
    
    setPandit(panditData);
  }, [id]);
  
  const handleBooking = () => {
    // Validation
    if (!selectedDate || !selectedTime || !ceremonyType) {
      alert("Please select date, time and ceremony type");
      return;
    }
    
    // In a real app, you would submit this to your backend
    const bookingDetails = {
      panditId: pandit.id,
      panditName: pandit.name,
      date: selectedDate,
      time: selectedTime,
      ceremonyType: ceremonyType,
      isVirtual: isVirtual,
      notes: additionalNotes,
      // Add other details like user info, pricing, etc.
    };
    
    console.log("Booking details:", bookingDetails);
    
    // Show confirmation
    alert("Your booking has been confirmed! You will receive a confirmation email shortly.");
    
    // Navigate to confirmation page
    // navigate("/booking-confirmation");
  };
  
  if (!pandit) {
    return (
      <>
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>
        <div className="min-h-screen bg-gradient-to-b from-[#1a0f00] to-[#3a2a1a] p-4 flex justify-center items-center">
          <div className="text-[#FFB563] text-xl">Loading pandit details...</div>
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
            <button onClick={() => navigate('/pandit-booking')} className="hover:text-[#FFB563]">Pandit Booking</button>
            <span className="mx-2">/</span>
            <span className="text-[#FFB563]">{pandit.name}</span>
          </div>
          
          {/* Pandit Profile */}
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Pandit Info */}
            <div className="w-full lg:w-2/3">
              <div className="bg-[#a8661cb5] rounded-xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img 
                      src={`/${pandit.images[0]}`} 
                      alt={pandit.name} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-start justify-between">
                      <h1 className="text-[#FFB563] text-3xl font-samarkan mb-2">{pandit.name}</h1>
                      <div className="flex items-center bg-[#FFB563] text-[#3a2a1a] px-2 py-1 rounded">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-bold">{pandit.rating}</span>
                        <span className="ml-1 text-xs">({pandit.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <p className="mb-4 text-white">{pandit.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-[#FFB563] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <div className="text-[#FFB563] text-sm">Experience</div>
                          <div className="text-white">{pandit.experience} years</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-[#FFB563] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        <div>
                          <div className="text-[#FFB563] text-sm">Languages</div>
                          <div className="text-white">{pandit.languages.join(", ")}</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-[#FFB563] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <div className="text-[#FFB563] text-sm">Location</div>
                          <div className="text-white">{pandit.location}</div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-[#FFB563] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <div className="text-[#FFB563] text-sm">Starting Price</div>
                          <div className="text-white">USD {pandit.price}/hour</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      {pandit.specialization.map(spec => (
                        <span key={spec} className="px-2 py-1 text-xs text-white bg-gray-700 rounded">
                          {spec === "griha" ? "Griha Pravesh" : 
                           spec === "vivah" ? "Vivah (Wedding)" :
                           spec === "naamkaran" ? "Naamkaran" :
                           spec === "puja" ? "Daily Puja" :
                           spec === "havan" ? "Havan & Yagya" : spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Tabs */}
                <div className="border-t border-gray-600">
                  <div className="flex overflow-x-auto scrollbar-hide">
                    {["about", "ceremonies", "reviews"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 text-lg font-samarkan transition-colors duration-300 ${
                          activeTab === tab
                            ? 'bg-[#FFB563] text-[#3a2a1a]'
                            : 'text-white hover:bg-gray-700'
                        }`}
                      >
                        {tab === "about" ? "About" : 
                         tab === "ceremonies" ? "Ceremonies" : 
                         "Reviews"}
                      </button>
                    ))}
                  </div>
                  
                  <div className="p-6">
                    {activeTab === "about" && (
                      <div>
                        <h3 className="text-[#FFB563] text-xl font-samarkan mb-4">Biography</h3>
                        <p className="mb-6 text-white">{pandit.bio}</p>
                        
                        <h3 className="text-[#FFB563] text-xl font-samarkan mb-4">Gallery</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {pandit.images.map((image, index) => (
                            <div key={index} className="overflow-hidden rounded-lg aspect-square">
                              <img 
                                src={`/${image}`} 
                                alt={`${pandit.name} performing ceremony`} 
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === "ceremonies" && (
                      <div>
                        <h3 className="text-[#FFB563] text-xl font-samarkan mb-4">Available Ceremonies</h3>
                        <div className="space-y-4">
                          {pandit.ceremonies.map((ceremony, index) => (
                            <div key={index} className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-bold text-white">{ceremony.name}</h4>
                                <span className="text-[#FFB563] font-bold">USD {ceremony.price}</span>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-sm text-gray-300">Duration: {ceremony.duration}</span>
                                <button 
                                  onClick={() => {
                                    setCeremonyType(ceremony.id);
                                    document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
                                  }}
                                  className="bg-[#FFB563] hover:bg-[#e9a050] text-[#3a2a1a] px-4 py-1 rounded text-sm font-bold transition-colors duration-300"
                                >
                                  Book Now
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === "reviews" && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-[#FFB563] text-xl font-samarkan">Client Reviews</h3>
                          <div className="flex items-center">
                            <span className="mr-2 text-white">Overall Rating:</span>
                            <div className="flex items-center bg-[#FFB563] text-[#3a2a1a] px-2 py-1 rounded">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="font-bold">{pandit.rating}</span>
                              <span className="ml-1 text-xs">({pandit.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          {pandit.testimonials.map((review, index) => (
                            <div key={index} className="p-4 bg-gray-700 bg-opacity-50 rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-bold text-white">{review.name}</h4>
                                  <div className="text-sm text-gray-300">{review.ceremony} • {review.date}</div>
                                </div>
                                <div className="flex items-center text-[#FFB563]">
                                  {[...Array(5)].map((_, i) => (
                                    <svg 
                                      key={i} 
                                      className="w-4 h-4" 
                                      fill={i < review.rating ? "currentColor" : "none"} 
                                      stroke="currentColor" 
                                      viewBox="0 0 24 24" 
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                              <p className="text-white">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Booking Form */}
            <div className="w-full lg:w-1/3" id="booking-form">
              <div className="sticky p-6 bg-gray-700 bg-opacity-70 rounded-xl top-24">
                <h2 className="text-[#FFB563] text-2xl font-samarkan mb-4">Book a Ceremony</h2>
                
                <div className="mb-4">
                  <label className="block mb-2 text-white">Ceremony Type</label>
                  <select 
                    value={ceremonyType}
                    onChange={(e) => setCeremonyType(e.target.value)}
                    className="w-full p-3 text-white bg-gray-800 rounded-lg"
                  >
                    <option value="">Select a ceremony</option>
                    {pandit.ceremonies.map((ceremony, index) => (
                      <option key={index} value={ceremony.id}>{ceremony.name} (USD {ceremony.price})</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block mb-2 text-white">Date</label>
                  <select 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 text-white bg-gray-800 rounded-lg"
                  >
                    <option value="">Select a date</option>
                    {pandit.availableDates.map((date, index) => (
                      <option key={index} value={date}>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block mb-2 text-white">Time</label>
                  <select 
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3 text-white bg-gray-800 rounded-lg"
                  >
                    <option value="">Select a time</option>
                    {pandit.availableTimes.map((time, index) => (
                      <option key={index} value={time}>
                        {new Date(`2025-01-01T${time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block mb-2 text-white">Ceremony Type</label>
                  <div className="flex gap-4">
                    <label className="flex items-center text-white">
                      <input 
                        type="radio" 
                        checked={isVirtual} 
                        onChange={() => setIsVirtual(true)}
                        className="mr-2"
                      />
                      Virtual
                    </label>
                    <label className="flex items-center text-white">
                      <input 
                        type="radio" 
                        checked={!isVirtual} 
                        onChange={() => setIsVirtual(false)}
                        className="mr-2"
                      />
                      In-person
                    </label>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block mb-2 text-white">Additional Notes</label>
                  <textarea 
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Any special requirements or questions..."
                    className="w-full p-3 text-white bg-gray-800 rounded-lg"
                    rows="3"
                  />
                </div>
                
                {ceremonyType && (
                  <div className="mb-6 bg-[#a8661c80] p-4 rounded-lg">
                    <h3 className="text-[#FFB563] font-bold mb-2">Booking Summary</h3>
                    <div className="flex justify-between mb-1 text-white">
                      <span>Ceremony:</span>
                      <span>{pandit.ceremonies.find(c => c.id === ceremonyType)?.name}</span>
                    </div>
                    <div className="flex justify-between mb-1 text-white">
                      <span>Duration:</span>
                      <span>{pandit.ceremonies.find(c => c.id === ceremonyType)?.duration}</span>
                    </div>
                    <div className="flex justify-between mb-1 text-white">
                      <span>Type:</span>
                      <span>{isVirtual ? 'Virtual' : 'In-person'}</span>
                    </div>
                    <div className="border-t border-gray-600 my-2 pt-2 flex justify-between text-[#FFB563] font-bold">
                      <span>Total:</span>
                      <span>USD {pandit.ceremonies.find(c => c.id === ceremonyType)?.price}</span>
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={handleBooking}
                  className="w-full bg-[#FFB563] hover:bg-[#e9a050] text-[#3a2a1a] font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  Book Now
                </button>
                
                <p className="mt-4 text-xs text-center text-gray-300">
                  By booking, you agree to our terms of service and cancellation policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PanditDetail;
