const Counter = require("../models/Counter");

const getNextSequence = async (companyId) => {
  const counter = await Counter.findOneAndUpdate(
    { companyId },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return counter.seq;
};