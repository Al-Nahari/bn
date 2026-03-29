import React from 'react';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';

const ContactButton = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="flex flex-col items-center gap-2">
        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/966500000000" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-sun-yellow to-dark-brown p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r from-dark-brown to-sun-yellow"
          aria-label="تواصل عبر واتساب"
        >
          <FaWhatsapp className="h-6 w-6 text-white" />
        </a>
        
        {/* Phone Button */}
        <a 
          href="tel:+966500000000" 
          className="bg-gradient-to-r from-sand-beige to-dark-brown p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r from-dark-brown to-sand-beige"
          aria-label="اتصل بالهاتف"
        >
          <FaPhone className="h-6 w-6 text-dark-brown" />
        </a>
      </div>
    </div>
  );
};

export default ContactButton;