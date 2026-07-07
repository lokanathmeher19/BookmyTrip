import Train from '../models/Train.js';

export const searchTrains = async (req, res, next) => {
  try {
    const { from, to, date } = req.query;
    
    // In a real app, we would filter based on 'date' mapping to 'runsOn'
    // For this mock, we just filter by source and destination (case-insensitive)
    let query = {};
    if (from) query.source = { $regex: new RegExp(from, 'i') };
    if (to) query.destination = { $regex: new RegExp(to, 'i') };

    const trains = await Train.find(query);
    res.json(trains);
  } catch (error) {
    next(error);
  }
};

export const getTrains = async (req, res, next) => {
  try {
    const trains = await Train.find({});
    res.json(trains);
  } catch (error) {
    next(error);
  }
};

export const getLiveStatus = async (req, res, next) => {
  try {
    const train = await Train.findById(req.params.id);
    if (train) {
      // Mock live status
      res.json({
        trainNumber: train.trainNumber,
        trainName: train.trainName,
        currentStation: 'En Route',
        delay: 'On Time',
        lastUpdated: new Date()
      });
    } else {
      res.status(404).json({ message: 'Train not found' });
    }
  } catch (error) {
    next(error);
  }
};
