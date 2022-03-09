const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const participantsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  parentEmail: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  churchName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Participants", participantsSchema);
