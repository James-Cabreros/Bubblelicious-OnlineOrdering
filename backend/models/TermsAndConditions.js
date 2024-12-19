
const mongoose = require('mongoose');

const TermsAndConditionsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Terms and Conditions",
  },
  sections: [
    {
      heading: { type: String, required: true },
      content: { type: String, required: true },
    },
  ],
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const TermsAndConditions = mongoose.model('TermsAndConditions', TermsAndConditionsSchema);

module.exports = TermsAndConditions;
