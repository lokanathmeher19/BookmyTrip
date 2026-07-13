import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Destination from '../models/Destination.js';
import connectDB from '../config/db.js';

dotenv.config();

const destinations = [
  {
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    category: ['Spiritual'],
    imageUrl: '/80327501f14626b67a9abb6888245b7f.jpg',
    imageFit: 'object-fill',
    featured: true,
    longDescription: 'One of the world\'s oldest continually inhabited cities, Varanasi is the spiritual capital of India. Located on the banks of the sacred river Ganges, it offers a deeply moving and authentic Indian experience.',
    bestTimeToVisit: 'October to March',
    attractions: ['Kashi Vishwanath Temple', 'Dashashwamedh Ghat', 'Sarnath', 'Assi Ghat'],
    facilities: ['Hotels', 'Guesthouses', 'Local Transport', 'Guided Tours', 'Boat Rides'],
    weather: 'Hot summers, pleasant winters',
    howToReach: 'Lal Bahadur Shastri Airport is 26 km away. Well connected by rail.',
    galleryImages: ['https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=800&q=80']
  },
  {
    name: 'Jaipur',
    state: 'Rajasthan',
    category: ['Heritage'],
    imageUrl: '/videoframe_3122.png',
    imageFit: 'object-fill',
    featured: true,
    longDescription: 'Known as the Pink City, Jaipur is a vibrant blend of old and new. It forms a part of the Golden Triangle tourist circuit along with Delhi and Agra, known for its royal palaces, forts, and rich heritage.',
    bestTimeToVisit: 'November to February',
    attractions: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Jantar Mantar'],
    facilities: ['Luxury Heritage Hotels', 'Shopping Centers', 'Camel Safaris', 'Cultural Shows'],
    weather: 'Hot semi-arid climate, cool winters',
    howToReach: 'Jaipur International Airport is 13 km from the center. Major railway junction.',
    galleryImages: ['https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80']
  },
  {
    name: 'Goa',
    state: 'Goa',
    category: ['Beaches'],
    imageUrl: '/f61450754b5529bcf7db0abe6ef6dc91.jpg',
    imageFit: 'object-fill',
    featured: true,
    longDescription: 'India\'s smallest state is famous for its picturesque beaches, vibrant nightlife, and Portuguese-influenced architecture. It remains the top choice for a relaxing tropical getaway.',
    bestTimeToVisit: 'Mid-November to Mid-February',
    attractions: ['Baga Beach', 'Basilica of Bom Jesus', 'Dudhsagar Falls', 'Anjuna Flea Market'],
    facilities: ['Beach Resorts', 'Water Sports', 'Scooter Rentals', 'Nightclubs'],
    weather: 'Tropical monsoon climate, hot and humid',
    howToReach: 'Dabolim Airport and Mopa Airport serve Goa. Madgaon and Thivim are major railheads.',
    galleryImages: ['https://images.unsplash.com/photo-1512343879784-a960bf40e4f2?auto=format&fit=crop&w=800&q=80']
  },
  {
    name: 'Kerala',
    state: 'Kerala',
    category: ['Nature'],
    imageUrl: '/6c0f13d6ca677db41ef88f85427dc5f1.jpg',
    imageFit: 'object-fill',
    featured: true,
    longDescription: 'Aptly named God\'s Own Country, Kerala is renowned for its palm-lined beaches, tranquil backwaters, and lush hill stations. A perfect destination for wellness and nature retreats.',
    bestTimeToVisit: 'September to March',
    attractions: ['Alleppey Backwaters', 'Munnar Tea Gardens', 'Wayanad', 'Kochi Fort'],
    facilities: ['Houseboats', 'Ayurvedic Spas', 'Eco Resorts', 'Spice Plantations'],
    weather: 'Tropical, pleasant year-round with heavy monsoons',
    howToReach: 'Multiple international airports including Kochi and Trivandrum.',
    galleryImages: ['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80']
  },
  {
    name: 'Agra',
    state: 'Uttar Pradesh',
    category: ['Monument'],
    imageUrl: '/fcb90a2a97517b2a1a92b6fa69b79398.jpg',
    imageFit: 'object-fill',
    featured: true,
    longDescription: 'Home to the iconic Taj Mahal, Agra offers a fascinating glimpse into the architectural brilliance of the Mughal era. A must-visit city on the global tourist map.',
    bestTimeToVisit: 'October to March',
    attractions: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh'],
    facilities: ['5-Star Hotels', 'Tour Guides', 'Handicraft Markets', 'Taxis'],
    weather: 'Extreme temperatures, very hot summers, cold winters',
    howToReach: 'Well-connected by trains from Delhi. Kheria Airport has limited flights.',
    galleryImages: ['https://images.unsplash.com/photo-1564507592224-2004e044121e?auto=format&fit=crop&w=800&q=80']
  },
  {
    name: 'Darjeeling',
    state: 'West Bengal',
    category: ['Hills'],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
    featured: true,
    longDescription: 'Nestled in the lesser Himalayas, Darjeeling is world-famous for its tea and the UNESCO World Heritage toy train. It offers stunning views of Mount Kanchenjunga.',
    bestTimeToVisit: 'April to June, September to December',
    attractions: ['Tiger Hill', 'Darjeeling Himalayan Railway', 'Batasia Loop', 'Tea Estates'],
    facilities: ['Boutique Stays', 'Trekking Guides', 'Cable Cars', 'Cafes'],
    weather: 'Cool summers, very cold winters',
    howToReach: 'Bagdogra Airport is 70 km away. NJP is the nearest major railway station.',
    galleryImages: []
  },
  {
    name: 'Manali',
    state: 'Himachal Pradesh',
    category: ['Mountains'],
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    featured: true,
    longDescription: 'A high-altitude Himalayan resort town, Manali is a popular honeymoon destination and a gateway for skiing in the Solang Valley and trekking in Parvati Valley.',
    bestTimeToVisit: 'October to June',
    attractions: ['Rohtang Pass', 'Solang Valley', 'Hidimba Temple', 'Old Manali'],
    facilities: ['Ski Rentals', 'Adventure Sports', 'Homestays', 'Bus Network'],
    weather: 'Pleasant summers, snowy and freezing winters',
    howToReach: 'Bhuntar Airport is 50 km away. Best reached by road from Chandigarh/Delhi.',
    galleryImages: []
  },
  {
    name: 'Udaipur',
    state: 'Rajasthan',
    category: ['Lakes'],
    imageUrl: '/udiapur..jpg',
    featured: true,
    longDescription: 'Often referred to as the Venice of the East, Udaipur is set around a series of artificial lakes and is known for its lavish royal residences and romantic atmosphere.',
    bestTimeToVisit: 'September to March',
    attractions: ['City Palace', 'Lake Pichola', 'Jag Mandir', 'Monsoon Palace'],
    facilities: ['Palace Hotels', 'Boat Rides', 'Rooftop Restaurants', 'Local Cabs'],
    weather: 'Hot summers, pleasant winters',
    howToReach: 'Maharana Pratap Airport is 22 km east. Udaipur City Railway Station.',
    galleryImages: ['https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80']
  },
  {
    name: 'Munnar',
    state: 'Kerala',
    category: ['Tea Gardens'],
    imageUrl: '/download.png',
    featured: true,
    longDescription: 'A picturesque hill station in the Western Ghats, Munnar is draped in endless expanses of tea plantations, pristine valleys, and diverse flora and fauna.',
    bestTimeToVisit: 'September to March',
    attractions: ['Eravikulam National Park', 'Mattupetty Dam', 'Tea Museum', 'Anamudi Peak'],
    facilities: ['Resorts', 'Trekking', 'Spice Shops', 'Jeep Safaris'],
    weather: 'Cool and pleasant year-round',
    howToReach: 'Cochin International Airport is ~110 km away. Aluva is the nearest railway station.',
    galleryImages: ['https://images.unsplash.com/photo-1593693397690-362bb9a11566?auto=format&fit=crop&w=800&q=80']
  },
  {
    name: 'Rishikesh',
    state: 'Uttarakhand',
    category: ['Adventure'],
    imageUrl: '/35390aeaeb114e63ecc70b1d4ee004b5.jpg',
    featured: true,
    longDescription: 'Located in the Himalayan foothills beside the Ganges, Rishikesh is renowned as a center for studying yoga and meditation, as well as a hub for river rafting.',
    bestTimeToVisit: 'September to November, February to May',
    attractions: ['Lakshman Jhula', 'Triveni Ghat', 'Beatles Ashram', 'Neelkanth Mahadev Temple'],
    facilities: ['Ashrams', 'Yoga Centers', 'Rafting Operators', 'Bungee Jumping'],
    weather: 'Pleasant most of the year, hot in May/June',
    howToReach: 'Jolly Grant Airport in Dehradun is 21 km away. Rishikesh has a railway station.',
    galleryImages: ['https://images.unsplash.com/photo-1600011846467-27b9c9e88b84?auto=format&fit=crop&w=800&q=80']
  },
  {
    name: 'Andaman',
    state: 'Andaman Island',
    category: ['Islands'],
    imageUrl: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
    featured: true,
    longDescription: 'A tropical paradise in the Bay of Bengal, the Andaman Islands boast stunning white-sand beaches, vibrant coral reefs, and dense rainforests.',
    bestTimeToVisit: 'October to May',
    attractions: ['Radhanagar Beach', 'Cellular Jail', 'Havelock Island', 'Neil Island'],
    facilities: ['Scuba Diving', 'Ferry Services', 'Beach Resorts', 'Water Sports'],
    weather: 'Tropical, warm and humid year-round',
    howToReach: 'Port Blair Airport (Veer Savarkar International Airport) connects to major Indian cities.',
    galleryImages: []
  },
  {
    name: 'Srinagar',
    state: 'Jammu & Kashmir',
    category: ['Paradise'],
    imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    featured: true,
    longDescription: 'The summer capital of Jammu and Kashmir, Srinagar is famous for its beautiful Dal Lake, Mughal Gardens, and traditional houseboats.',
    bestTimeToVisit: 'April to October',
    attractions: ['Dal Lake', 'Shalimar Bagh', 'Gulmarg (nearby)', 'Shankaracharya Temple'],
    facilities: ['Houseboats', 'Shikara Rides', 'Skiing (winter)', 'Handicraft Stores'],
    weather: 'Pleasant summers, very cold and snowy winters',
    howToReach: 'Srinagar International Airport. Nearest major railway station is Jammu Tawi.',
    galleryImages: []
  }
];

const seedDestinations = async () => {
  try {
    await connectDB();
    await Destination.deleteMany();
    await Destination.insertMany(destinations);
    console.log('Destinations Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDestinations();
