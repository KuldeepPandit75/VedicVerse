import React, { useState, useEffect } from "react";
import { FaWallet, FaCreditCard, FaTimes } from "react-icons/fa";

const PaymentModal = ({ isOpen, onClose, productName, productPrice, productCoins, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  
  // Load wallet state from localStorage on component mount
  useEffect(() => {
    if (isOpen) {
      const walletState = localStorage.getItem('vedic_wallet');
      if (walletState) {
        const { connected, balance, history } = JSON.parse(walletState);
        setWalletConnected(connected);
        setWalletBalance(balance);
        setTransactionHistory(history || []);
      }
    }
  }, [isOpen]);
  
  const handleWalletPayment = () => {
    setError("");
    
    // Check if wallet is connected
    if (!walletConnected) {
      setError("Please connect your wallet first.");
      return;
    }
    
    // Check if balance is sufficient
    if (walletBalance < productCoins) {
      setError("Insufficient balance in your wallet.");
      return;
    }
    
    // Process payment
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Deduct from wallet balance
      const newBalance = walletBalance - productCoins;
      
      // Add transaction to history
      const newTransaction = {
        description: `Purchase: ${productName}`,
        amount: -productCoins,
        date: new Date().toLocaleDateString()
      };
      
      const updatedHistory = [newTransaction, ...transactionHistory];
      
      // Update localStorage
      localStorage.setItem('vedic_wallet', JSON.stringify({
        connected: true,
        balance: newBalance,
        history: updatedHistory
      }));
      
      setProcessing(false);
      
      // Notify parent component that payment is complete
      onPaymentComplete({
        method: "wallet",
        amount: productCoins,
        status: "success"
      });
    }, 1500);
  };

  const razorkey = import.meta.env.VITE_RAZOR_KEY ;
  
  const handleRazorpayPayment = () => {
    setProcessing(true);
    
    try {
      // Convert USD to INR for Razorpay (approximate conversion)
      const amountInPaise = Math.round(productPrice * 75 * 100);
      
      // Use absolute URL for image
      const imageUrl = `${window.location.protocol}//${window.location.host}/vedic_coin.png`;
      
      // Razorpay options
      const options = {
        key: razorkey,
        amount: amountInPaise,
        currency: "INR",
        name: "VedicVerse",
        description: `Payment for ${productName}`,
        image: imageUrl,
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#FFB563"
        },
        handler: function(response) {
          setProcessing(false);
          console.log("Payment successful:", response);
          
          onPaymentComplete({
            method: "razorpay",
            amount: productPrice,
            transactionId: response.razorpay_payment_id,
            status: "success"
          });
        },
        modal: {
          ondismiss: function() {
            setProcessing(false);
            console.log("Payment modal closed by user");
          }
        }
      };
      
      // Create Razorpay instance and open payment modal
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Razorpay error:", err);
      setError("Failed to initialize payment. Please try again or use wallet payment.");
      setProcessing(false);
    }
  };
  
  
  const handlePayment = () => {
    if (paymentMethod === "wallet") {
      handleWalletPayment();
    } else {
      handleRazorpayPayment();
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gradient-to-b from-[#5a040dbd] to-[#3a2a1a] rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#FFB563] text-2xl font-samarkan">Complete Your Purchase</h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-[#FFB563]"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="bg-[#a8661cb5] rounded-lg p-4 mb-6">
            <h3 className="mb-2 text-lg text-white">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Product:</span>
              <span className="text-white">{productName}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-300">Price:</span>
              <span className="text-white">USD {productPrice}</span>
            </div>
            <div className="flex justify-between pt-2 mt-2 border-t border-gray-600">
              <span className="text-gray-300">Total:</span>
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
                <span className="text-[#FFB563] font-bold">{productCoins}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-[#FFB563] text-lg font-samarkan mb-3">Select Payment Method</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div 
                className={`bg-[#a8661c80] rounded-lg p-4 text-center cursor-pointer transition-all duration-300 ${
                  paymentMethod === "wallet" ? "border-2 border-[#FFB563]" : "border-2 border-transparent"
                }`}
                onClick={() => setPaymentMethod("wallet")}
              >
                <FaWallet className="w-8 h-8 mx-auto mb-2 text-[#FFB563]" />
                <div className="text-white">Wallet</div>
                {walletConnected && (
                  <div className="mt-1 text-xs text-gray-300">Balance: {walletBalance} VC</div>
                )}
              </div>
              
              <div 
                className={`bg-[#a8661c80] rounded-lg p-4 text-center cursor-pointer transition-all duration-300 ${
                  paymentMethod === "razorpay" ? "border-2 border-[#FFB563]" : "border-2 border-transparent"
                }`}
                onClick={() => setPaymentMethod("razorpay")}
              >
                <FaCreditCard className="w-8 h-8 mx-auto mb-2 text-[#FFB563]" />
                <div className="text-white">UPI / Card</div>
                <div className="mt-1 text-xs text-gray-300">Razorpay</div>
              </div>
            </div>
            
            {paymentMethod === "wallet" && !walletConnected && (
              <div className="p-3 mt-3 text-sm text-yellow-200 bg-yellow-900 bg-opacity-50 rounded-lg">
                Your wallet is not connected. Please connect your wallet from the navbar first.
              </div>
            )}
            
            {paymentMethod === "wallet" && walletConnected && walletBalance < productCoins && (
              <div className="p-3 mt-3 text-sm text-red-200 bg-red-900 bg-opacity-50 rounded-lg">
                Insufficient balance. You need {productCoins - walletBalance} more VC to complete this purchase.
              </div>
            )}
            
            {error && (
              <div className="p-3 mt-3 text-sm text-red-200 bg-red-900 bg-opacity-50 rounded-lg">
                {error}
              </div>
            )}
          </div>
          
          <button 
            onClick={handlePayment}
            disabled={processing || (paymentMethod === "wallet" && (!walletConnected || walletBalance < productCoins))}
            className={`w-full font-bold py-3 px-4 rounded-lg transition-colors duration-300 ${
              processing || (paymentMethod === "wallet" && (!walletConnected || walletBalance < productCoins))
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-[#FFB563] hover:bg-[#e9a050] text-[#3a2a1a]"
            }`}
          >
            {processing ? "Processing..." : "Complete Payment"}
          </button>
        </div>
        
        <div className="bg-[#3a2a1a] p-4 text-center text-white text-sm">
          All transactions are secure and encrypted
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
