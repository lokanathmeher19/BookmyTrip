import React from 'react';
import { Smartphone, CreditCard } from 'lucide-react';

const seoParagraphs = [
  { title: "Why BookMyTrip?", text: "Established in 2000, BookMyTrip has since positioned itself as one of the leading companies, providing great offers, competitive airfares, exclusive discounts, and a seamless online booking experience to many of its customers. The experience of booking your flight tickets, hotel stay, and holiday package through our desktop site or mobile app can be done with complete ease and no hassles at all. We also deliver amazing offers, such as Instant Discounts, Fare Calendar, MyRewardsProgram, MyWallet, and many more while updating them from time to time to better suit our customers' evolving needs and demands." },
  { title: "Booking Flights with BookMyTrip", text: "At BookMyTrip, you can find the best of deals and cheap air tickets to any place you want by booking your tickets on our website or app. Being India's leading website for hotel, flight, and holiday bookings, BookMyTrip helps you book flight tickets that are affordable and customized to your convenience. With customer satisfaction being our ultimate goal, we also have a 24/7 dedicated helpline to cater to our customer's queries and concerns. Serving over 5 million happy customers, we at BookMyTrip are glad to fulfill the dreams of folks who need a quick and easy means to find air tickets. You can get a hold of the cheapest flight of your choice today while also enjoying the other available options for your travel needs with us." },
  { title: "Domestic Flights with BookMyTrip", text: "BookMyTrip is India's leading player for flight bookings. With the cheapest fare guarantee, experience great value at the lowest price. Instant notifications ensure current flight status, instant fare drops, amazing discounts, instant refunds and rebook options, price comparisons and many more interesting features." }
];

const Footer = () => {
  return (
    <footer className="mt-12">
      {/* 3-Column SEO Paragraphs Section */}
      <div className="bg-[#ebebeb] py-12 border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {seoParagraphs.map((para, idx) => (
              <div key={idx}>
                <h5 className="font-bold text-[#4a4a4a] text-[13px] mb-3">{para.title}</h5>
                <p className="text-[11px] text-[#4a4a4a] leading-relaxed text-justify opacity-90">
                  {para.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Dark Footer */}
      <div className="bg-gray-900 border-t border-gray-800 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand & Social */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-black text-white mb-4"><span className="text-white">Book</span><span className="text-red-600">MyTrip</span></h3>
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              Your journey, just a tap away. We provide the best deals on flights, hotels, trains, and holiday packages across the globe. Experience seamless bookings and unforgettable travels.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-5 uppercase text-sm tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-red-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Travel Blog</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Partner with Us</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Investor Relations</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-white mb-5 uppercase text-sm tracking-wider">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-red-500 transition-colors">Customer Support</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Payment Security</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Cancellation Policy</a></li>
            </ul>
          </div>

          {/* Newsletter / App */}
          <div>
            <h4 className="font-bold text-white mb-5 uppercase text-sm tracking-wider">Get the App</h4>
            <div className="flex flex-col space-y-3 mb-6">
              <a href="#" className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                <Smartphone size={24} className="text-white" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider">Download on the</div>
                  <div className="text-white font-bold text-sm leading-none">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                <Smartphone size={24} className="text-white" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider">GET IT ON</div>
                  <div className="text-white font-bold text-sm leading-none">Google Play</div>
                </div>
              </a>
            </div>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} BookMyTrip Pvt. Ltd. All rights reserved.
          </div>
          
          {/* Payment Methods */}
          <div className="flex items-center gap-2">
            <span className="text-xs mr-2 uppercase tracking-wider">Secure Payments</span>
            <div className="flex gap-2">
              <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center border border-gray-700"><CreditCard size={14} className="text-blue-400" /></div>
              <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center border border-gray-700"><CreditCard size={14} className="text-red-400" /></div>
              <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center border border-gray-700"><CreditCard size={14} className="text-yellow-400" /></div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
