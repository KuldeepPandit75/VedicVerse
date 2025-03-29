import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { TiThMenu } from "react-icons/ti";
import { FaWallet, FaHistory, FaStore, FaVrCardboard } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);

  // Load wallet state from localStorage on component mount
  useEffect(() => {
    const walletState = localStorage.getItem('vedic_wallet');
    if (walletState) {
      const { connected, balance, history } = JSON.parse(walletState);
      setWalletConnected(connected);
      setWalletBalance(balance);
      setTransactionHistory(history || []);
    }
  }, []);

  const navToHome = () => navigate("/");
  const navToVedas = () => navigate("/bookstype");
  const navToIntro = () => navigate("/intro");
  const navToQuiz = () => navigate("/quiz");
  const navToMarketplace = () => {
    navigate("/shop");
    setShowWallet(false);
  };
  const navToMetaverse = () => {
    navigate("/meta");
    setShowWallet(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    console.log("Session storage cleared, user logged out");
    navigate("/login");
  };

  const connectWallet = () => {
    // Simulate wallet connection
    setWalletConnected(true);
    
    // Set initial balance (300 points as requested)
    const initialBalance = 300;
    setWalletBalance(initialBalance);
    
    // Initialize empty transaction history
    const initialHistory = [];
    setTransactionHistory(initialHistory);
    
    // Save to localStorage
    localStorage.setItem('vedic_wallet', JSON.stringify({
      connected: true,
      balance: initialBalance,
      history: initialHistory
    }));
  };

  const closeWallet = () => {
    setShowWallet(false);
  };

  const viewHistory = () => {
    // This function would show transaction history
    // For now, we'll just log it
    console.log("Transaction history:", transactionHistory);
  };

  return (
    <nav className="flex justify-between items-center px-6 py-6 relative backdrop-blur-[4px] rounded-b-xl">
      {/* Brand Name */}
      <h1 className="text-[#5a040dfa] text-4xl font-black font-samarkan ">
        Vedic Verse
      </h1>

      {/* Navigation Links */}
      <ul
        className={`absolute left-0 bg-[#5a040dbd] rounded-2xl text-center w-full p-6  md:absoult md:left-[410px] md:flex md:justify-evenly md:p-1 md:w-[506px] transition-all duration-500 ${
          showMenu ? "top-[80px]" : "top-[-400px]"
        } md:top-6`}
      >
        <li
          className="text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer"
          onClick={() => navToHome()}
        >
          Home
        </li>
        <li
          className="text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer"
          onClick={() => navToIntro()}
        >
          Introduction
        </li>
        <li
          className="text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer"
          onClick={() => navToVedas()}
        >
          Vedas
        </li>
        <li
          className="text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer"
          onClick={() => navToQuiz()}
        >
          Quiz
        </li>
        <li
          className={`md:hidden text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer`}
          onClick={() => handleLogout()}
        >
          Logout
        </li>
        <li
          className={`md:hidden text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer`}
          onClick={() => setShowWallet(true)}
        >
          Wallet
        </li>
      </ul>

      {/* Hamburger Menu for Mobile */}
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="absolute block p-2 md:hidden right-6"
        aria-label="Toggle menu"
      >
        <TiThMenu className="w-8 h-8" />
      </button>

      {/* User Avatar and Dropdown */}
      <div className="relative items-center hidden md:flex">
        {/* Wallet Icon */}
        <button
          className="h-10 w-10 flex items-center justify-center rounded-full bg-[#FFB563] mr-4 hover:bg-[#e59943] transition-all duration-300"
          onClick={() => setShowWallet(true)}
          aria-label="Open wallet"
        >
          <FaWallet className="h-5 w-5 text-[#5a040d]" />
          {walletConnected && (
            <span className="absolute w-3 h-3 bg-green-500 rounded-full -top-1 -right-1"></span>
          )}
        </button>
        
        {/* User Avatar */}
        <button
          className="w-10 h-10 rounded-full"
          onClick={() => setShowDropdown((prev) => !prev)}
          aria-label="User menu"
        >
          <img src="Group 1.png" alt="User" className="w-full h-full" />
        </button>

        {showDropdown && (
          <div className="absolute right-0 z-50 w-32 mt-2 bg-white rounded-md shadow-lg top-12">
            <button
              onClick={handleLogout}
              className="block w-full text-center text-xl px-4 py-2 text-red-500 bg-[#ebac65] rounded-lg hover:bg-[#e59943] transition-all duration-300"
            >
              Log Out
            </button>
          </div>
        )}
      </div>

      {/* Wallet Modal (MetaMask style) */}
      {showWallet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={closeWallet}>
          <div 
            className="absolute inset-0 bg-black bg-opacity-50" 
            onClick={closeWallet}
          ></div>
          
          <div 
            className="bg-gradient-to-b from-[#5a040dbd] to-[#3a2a1a] rounded-xl shadow-2xl w-full max-w-md overflow-hidden absolute right-4 top-20 md:right-16 md:top-24"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[#FFB563] text-2xl font-samarkan">VedicVerse Wallet</h2>
                <button 
                  onClick={closeWallet}
                  className="text-white hover:text-[#FFB563]"
                >
                  ✕
                </button>
              </div>

              {!walletConnected ? (
                <div className="py-8 text-center">
                  <img 
                    src="/wallet_icon.png" 
                    alt="Wallet" 
                    className="w-24 h-24 mx-auto mb-4 opacity-70"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/100x100?text=Wallet";
                    }}
                  />
                  <p className="mb-6 text-white">Connect your wallet to access VedicVerse marketplace and earn rewards</p>
                  <button 
                    onClick={connectWallet}
                    className="bg-[#FFB563] hover:bg-[#e59943] text-[#3a2a1a] font-bold py-3 px-6 rounded-lg transition-colors duration-300 w-full"
                  >
                    Connect Wallet
                  </button>
                </div>
              ) : (
                <div>
                  <div className="bg-[#a8661cb5] rounded-lg p-4 mb-6">
                    <div className="text-center">
                      <div className="mb-1 text-sm text-white">Your Balance</div>
                      <div className="flex items-center justify-center">
                        <img 
                          src="/vedic_coin.png" 
                          alt="Vedic Coin" 
                          className="w-8 h-8 mr-2"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/32x32?text=VC";
                          }}
                        />
                        <span className="text-[#FFB563] text-3xl font-bold">{walletBalance}</span>
                      </div>
                      <div className="mt-1 text-xs text-white">Vedic Coins</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 mb-6">
                    <button 
                      onClick={navToMetaverse}
                      className="bg-[#FFB563] hover:bg-[#e59943] text-[#3a2a1a] font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                    >
                      <FaVrCardboard className="mr-2" />
                      Explore Metaverse
                    </button>
                    
                    <button 
                      onClick={navToMarketplace}
                      className="bg-[#FFB563] hover:bg-[#e59943] text-[#3a2a1a] font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                    >
                      <FaStore className="mr-2" />
                      Explore Marketplace
                    </button>
                    
                    <button 
                      onClick={viewHistory}
                      className="flex items-center justify-center px-4 py-3 font-bold text-white transition-colors duration-300 bg-gray-700 rounded-lg hover:bg-gray-600"
                    >
                      <FaHistory className="mr-2" />
                      View History
                    </button>
                  </div>
                  
                  {transactionHistory.length > 0 ? (
                    <div>
                      <h3 className="text-[#FFB563] text-lg font-samarkan mb-2">Recent Transactions</h3>
                      <div className="overflow-y-auto max-h-40">
                        {transactionHistory.map((transaction, index) => (
                          <div key={index} className="bg-[#a8661c80] rounded-lg p-3 mb-2">
                            <div className="flex justify-between">
                              <span className="text-white">{transaction.description}</span>
                              <span className={transaction.amount > 0 ? "text-green-400" : "text-red-400"}>
                                {transaction.amount > 0 ? "+" : ""}{transaction.amount} VC
                              </span>
                            </div>
                            <div className="text-xs text-gray-400">{transaction.date}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="py-4 text-center text-gray-400">
                      No transaction history yet
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="bg-[#3a2a1a] p-4 text-center text-white text-sm">
              Explore the metaverse to earn more Vedic Coins!
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
