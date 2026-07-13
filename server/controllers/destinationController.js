import Destination from '../models/Destination.js';
import { z } from 'zod';

const destinationSchemaZod = z.object({
  name: z.string().min(2, 'Name is required'),
  state: z.string().min(2, 'State is required'),
  category: z.union([z.string(), z.array(z.string())]).optional(),
  imageUrl: z.string().url('Invalid image URL'),
  shortDescription: z.string().optional(),
  featured: z.boolean().optional(),
  rating: z.number().min(0).max(5).optional(),
  priceStartingFrom: z.string().optional(),
  imageFit: z.string().optional(),
  imagePosition: z.string().optional(),
  longDescription: z.string().optional(),
  bestTimeToVisit: z.string().optional(),
  attractions: z.union([z.string(), z.array(z.string())]).optional(),
  facilities: z.union([z.string(), z.array(z.string())]).optional(),
  weather: z.string().optional(),
  howToReach: z.string().optional(),
  galleryImages: z.union([z.string(), z.array(z.string())]).optional(),
});

// @desc    Fetch all destinations
// @route   GET /api/destinations
// @access  Public
export const getDestinations = async (req, res, next) => {
  try {
    const { featured, category, limit, search } = req.query;

    let query = {};
    if (featured === 'true') query.featured = true;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { state: { $regex: search, $options: 'i' } },
      ];
    }

    let destinationsQuery = Destination.find(query);
    if (limit) {
      destinationsQuery = destinationsQuery.limit(Number(limit));
    }

    const destinations = await destinationsQuery.exec();
    res.json({ success: true, data: destinations });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single destination
// @route   GET /api/destinations/:id
// @access  Public
export const getDestinationById = async (req, res, next) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      res.status(404);
      throw new Error('Destination not found');
    }
    res.json({ success: true, data: destination });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a destination
// @route   POST /api/destinations
// @access  Private/Admin
export const createDestination = async (req, res, next) => {
  try {
    // Validate request body
    const validatedData = destinationSchemaZod.parse(req.body);
    
    // Ensure fields are arrays
    const arrayFields = ['category', 'attractions', 'facilities', 'galleryImages'];
    arrayFields.forEach(field => {
      if (typeof validatedData[field] === 'string') {
        validatedData[field] = [validatedData[field]];
      } else if (!validatedData[field]) {
        validatedData[field] = [];
      }
    });

    const destination = await Destination.create(validatedData);
    res.status(201).json({ success: true, data: destination });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
    } else {
      next(error);
    }
  }
};

// @desc    Update a destination
// @route   PUT /api/destinations/:id
// @access  Private/Admin
export const updateDestination = async (req, res, next) => {
  try {
    const validatedData = destinationSchemaZod.partial().parse(req.body);
    
    const arrayFields = ['category', 'attractions', 'facilities', 'galleryImages'];
    arrayFields.forEach(field => {
      if (typeof validatedData[field] === 'string') {
        validatedData[field] = [validatedData[field]];
      }
    });

    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true, runValidators: true }
    );

    if (!destination) {
      res.status(404);
      throw new Error('Destination not found');
    }

    res.json({ success: true, data: destination });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, message: 'Validation failed', errors: error.errors });
    } else {
      next(error);
    }
  }
};

// @desc    Delete a destination
// @route   DELETE /api/destinations/:id
// @access  Private/Admin
export const deleteDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      res.status(404);
      throw new Error('Destination not found');
    }
    res.json({ success: true, message: 'Destination removed' });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload destination image
// @route   POST /api/destinations/upload-image
// @access  Private/Admin
export const uploadDestinationImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, data: { imageUrl } });
};
