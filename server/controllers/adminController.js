import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Train from '../models/Train.js';
import Bus from '../models/Bus.js';

// ---- Overview Stats ----
export const getOverviewStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    
    // Calculate total revenue from confirmed bookings
    const confirmedBookings = await Booking.find({ status: 'CONFIRMED' });
    const totalRevenue = confirmedBookings.reduce((acc, booking) => {
      return acc + (booking.fareBreakdown?.total || 0);
    }, 0);

    const recentBookings = await Booking.find({}).populate('user', 'name email').sort({ createdAt: -1 }).limit(5);
    const recentUsers = await User.find({}).select('-passwordHash').sort({ createdAt: -1 }).limit(5);

    res.json({
      totalUsers,
      totalBookings,
      totalRevenue,
      recentBookings,
      recentUsers
    });
  } catch (error) {
    next(error);
  }
};

// ---- User Management ----
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-passwordHash');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};

// ---- Booking Management ----
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      res.status(404);
      throw new Error('Booking not found');
    }
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    next(error);
  }
};

// ---- Train Management ----
export const createTrain = async (req, res, next) => {
  try {
    const train = new Train(req.body);
    const createdTrain = await train.save();
    res.status(201).json(createdTrain);
  } catch (error) {
    next(error);
  }
};

export const updateTrain = async (req, res, next) => {
  try {
    const train = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!train) {
      res.status(404);
      throw new Error('Train not found');
    }
    res.json(train);
  } catch (error) {
    next(error);
  }
};

export const deleteTrain = async (req, res, next) => {
  try {
    const train = await Train.findById(req.params.id);
    if (!train) {
      res.status(404);
      throw new Error('Train not found');
    }
    await Train.findByIdAndDelete(req.params.id);
    res.json({ message: 'Train deleted' });
  } catch (error) {
    next(error);
  }
};

// ---- Bus Management ----
export const createBus = async (req, res, next) => {
  try {
    const bus = new Bus(req.body);
    const createdBus = await bus.save();
    res.status(201).json(createdBus);
  } catch (error) {
    next(error);
  }
};

export const updateBus = async (req, res, next) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bus) {
      res.status(404);
      throw new Error('Bus not found');
    }
    res.json(bus);
  } catch (error) {
    next(error);
  }
};

export const deleteBus = async (req, res, next) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      res.status(404);
      throw new Error('Bus not found');
    }
    await Bus.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bus deleted' });
  } catch (error) {
    next(error);
  }
};
