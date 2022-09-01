const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
  userid: String,
  given_name: String,
  family_name: String,
  picture: String,
  email: String,
  google_user_data: Boolean,
  posts: [
    {
      title: String,
      text: String,
      thumbnail: {
        src: String,
        alt: String
      },
      publish_date: Date
    }
  ],
  friends: [
    {
      _id: String,
      visible: Boolean
    }
  ]
});

module.exports = mongoose.model('User', userSchema);