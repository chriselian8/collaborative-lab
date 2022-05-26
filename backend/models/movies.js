const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  name: String,
  release: String,
  image: String,
  genre: String,
  watched: {type: Boolean, default: false}

})
const Movies = mongoose.model('Movie', movieSchema)
module.exports = Movies
