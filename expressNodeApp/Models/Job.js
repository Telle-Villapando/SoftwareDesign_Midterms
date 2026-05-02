const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company:     { type: String, required: true },
  role:        { type: String, required: true },
  salary:      { type: String },
  status:      { type: String, enum: ['applied','interviewing','offer','rejected'], default: 'applied' },
  dateApplied: { type: String },
  notes:       { type: String },
  priority:    { type: String, enum: ['High','Medium','Low'], default: 'Medium' },
  link:        { type: String },
  platform:    { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);