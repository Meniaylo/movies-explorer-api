const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  nameEN: {
    type: String,
    unique: true,
    required: [true, "Поле 'nameRU' должно быть заполнено"],
  },

  nameRU: {
    type: String,
    unique: true,
    required: [true, "Поле 'nameEN' должно быть заполнено"],
  },

  country: {
    type: String,
    required: [true, "Поле 'country' должно быть заполнено"],
  },

  director: {
    type: String,
    required: [true, "Поле 'director' должно быть заполнено"],
  },

  duration: {
    type: Number,
    required: [true, "Поле 'duration' должно быть заполнено"],
  },

  year: {
    type: String,
    required: [true, "Поле 'year' должно быть заполнено"],
  },

  description: {
    type: String,
    required: [true, "Поле 'description' должно быть заполнено"],
  },

  image: {
    type: String,
    required: [true, "Поле 'image' должно быть заполнено"],
    validate: {
      validator(v) {
        return /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/g.test(v);
      },
      message: (props) => `${props.value} - не ссылка!`,
    },
  },

  trailerLink: {
    type: String,
    required: [true, "Поле 'trailerLink' должно быть заполнено"],
    validate: {
      validator(v) {
        return /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/g.test(v);
      },
      message: (props) => `${props.value} - не ссылка!`,
    },
  },

  thumbnail: {
    type: String,
    required: [true, "Поле 'thumbnail' должно быть заполнено"],
    validate: {
      validator(v) {
        return /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/g.test(v);
      },
      message: (props) => `${props.value} - не ссылка!`,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
