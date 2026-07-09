import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Train from '../models/Train.js';
import Flight from '../models/Flight.js';
import Bus from '../models/Bus.js';
import Hotel from '../models/Hotel.js';
import Offer from '../models/Offer.js';
import Destination from '../models/Destination.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Train.deleteMany();
    await Flight.deleteMany();
    await Bus.deleteMany();
    await Hotel.deleteMany();
    await Offer.deleteMany();
    await Destination.deleteMany();

    const destinations = [
      { city: 'Varanasi', state: 'Uttar Pradesh', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', badgeText: 'Spiritual' },
      { city: 'Jaipur', state: 'Rajasthan', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', badgeText: 'Heritage' },
      { city: 'Goa', state: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', badgeText: 'Beaches' },
      { city: 'Kerala', state: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', badgeText: 'Nature' },
      { city: 'Agra', state: 'Uttar Pradesh', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80', badgeText: 'Monument' },
      { city: 'Darjeeling', state: 'West Bengal', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', badgeText: 'Hills' },
      { city: 'Manali', state: 'Himachal Pradesh', image: 'https://images.unsplash.com/photo-1605649487212-4dff5b4f0b24?auto=format&fit=crop&w=800&q=80', badgeText: 'Mountains' },
      { city: 'Udaipur', state: 'Rajasthan', image: 'https://images.unsplash.com/photo-1615836245337-f58c735d496a?auto=format&fit=crop&w=800&q=80', badgeText: 'Lakes' },
      { city: 'Munnar', state: 'Kerala', image: 'https://images.unsplash.com/photo-1593693397690-362bc6d73489?auto=format&fit=crop&w=800&q=80', badgeText: 'Tea Gardens' },
      { city: 'Rishikesh', state: 'Uttarakhand', image: 'https://images.unsplash.com/photo-1626296317208-a5cb747353f4?auto=format&fit=crop&w=800&q=80', badgeText: 'Adventure' },
      { city: 'Andaman', state: 'Andaman Island', image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80', badgeText: 'Islands' },
      { city: 'Srinagar', state: 'Jammu & Kashmir', image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80', badgeText: 'Paradise' }
    ];

    const trains = [
      {
        trainNumber: '12951',
        trainName: 'Mumbai Rajdhani',
        source: 'Mumbai',
        destination: 'Delhi',
        departureTime: '17:00',
        arrivalTime: '08:30',
        duration: '15h 30m',
        runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        classes: [
          { type: '1A', fare: 4500, totalSeats: 50, availableSeats: 12, status: 'AVAILABLE' },
          { type: '2A', fare: 2800, totalSeats: 150, availableSeats: 5, status: 'AVAILABLE' },
          { type: '3A', fare: 1900, totalSeats: 300, availableSeats: 0, status: 'WAITLIST' }
        ]
      },
      {
        trainNumber: '12009',
        trainName: 'Shatabdi Express',
        source: 'Mumbai',
        destination: 'Ahmedabad',
        departureTime: '06:20',
        arrivalTime: '12:45',
        duration: '6h 25m',
        runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        classes: [
          { type: 'CC', fare: 1200, totalSeats: 400, availableSeats: 80, status: 'AVAILABLE' },
          { type: 'EC', fare: 2100, totalSeats: 50, availableSeats: 15, status: 'AVAILABLE' }
        ]
      }
    ];

    const flights = [
      {
        flightNumber: 'AI-101',
        airline: 'Air India',
        source: 'Delhi',
        destination: 'Mumbai',
        departureTime: new Date(new Date().setHours(new Date().getHours() + 24)),
        arrivalTime: new Date(new Date().setHours(new Date().getHours() + 26)),
        duration: '2h 00m',
        stops: 0,
        classes: [
          { type: 'Economy', fare: 4500, availableSeats: 50 },
          { type: 'Business', fare: 12000, availableSeats: 10 }
        ]
      },
      {
        flightNumber: '6E-404',
        airline: 'IndiGo',
        source: 'Bangalore',
        destination: 'Delhi',
        departureTime: new Date(new Date().setHours(new Date().getHours() + 48)),
        arrivalTime: new Date(new Date().setHours(new Date().getHours() + 50.5)),
        duration: '2h 30m',
        stops: 0,
        classes: [
          { type: 'Economy', fare: 5200, availableSeats: 25 }
        ]
      }
    ];

    const buses = [
      {
        operator: 'VRL Travels',
        source: 'Bangalore',
        destination: 'Mumbai',
        departureTime: new Date(new Date().setHours(new Date().getHours() + 10)),
        arrivalTime: new Date(new Date().setHours(new Date().getHours() + 24)),
        seatType: 'Sleeper',
        fare: 1500,
        availableSeats: 20
      }
    ];

    const hotels = [
      {
        name: 'Taj Mahal Palace',
        city: 'Mumbai',
        address: 'Colaba, Mumbai',
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        rating: 5,
        pricePerNight: 15000,
        amenities: ['Pool', 'Spa', 'Free WiFi', 'Breakfast Included'],
        roomsAvailable: 5
      },
      {
        name: 'ITC Maurya',
        city: 'Delhi',
        address: 'Diplomatic Enclave, New Delhi',
        images: ['https://images.unsplash.com/photo-1551882547-ff40c0d13c05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
        rating: 5,
        pricePerNight: 12000,
        amenities: ['Gym', 'Free WiFi', 'Bar'],
        roomsAvailable: 12
      }
    ];

    const offers = [
      {
        title: 'HDFC Bank Credit Cards',
        discountText: 'Flat 10% Off',
        accentColor: '#D32F2F', // HDFC red
        bankName: 'HDFC',
        code: 'HDFC10',
        terms: 'T&C Apply. Min booking ₹2500.'
      },
      {
        title: 'HSBC Cashback Card',
        discountText: 'Flat ₹700 Off',
        accentColor: '#8B2FC9', // HSBC purple
        bankName: 'HSBC',
        code: 'HSBC700',
        terms: 'T&C Apply. Only on Friday bookings.'
      },
      {
        title: 'UPI Offer',
        discountText: 'Flat 15% Off',
        accentColor: '#FF7A50', // Coral
        bankName: 'BHIM UPI',
        code: 'UPI15',
        terms: 'T&C Apply. Valid once per user.'
      }
    ];

    await Train.insertMany(trains);
    await Flight.insertMany(flights);
    await Bus.insertMany(buses);
    await Hotel.insertMany(hotels);
    await Offer.insertMany(offers);
    await Destination.insertMany(destinations);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

importData();
