
const MultipartParser = require('lambda-multipart-parser')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
const User = require('../models/user_model.js');
const moment = require('moment');

exports.handler = async function (event) {
  const id_token = event.headers['x-zumo-auth'];
  const result = await MultipartParser.parse(event);

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    if (!userid) { return }

    // POST REQUEST : CREATE POST
    if (event.httpMethod === "POST") {
      let thumbnail = {
        src: "",
        alt: ""
      };

      const { title, text } = JSON.parse(result.post);
      if (result.files[0]) {
        const { contentType, content, filename } = result.files[0];
        thumbnail = { src: `data:${contentType};base64,${content.toString('base64')}`, alt: filename }
      }

      const post = {
        title,
        text,
        thumbnail,
        publish_date: new Date()
      };

      return {
        statusCode: 200,
        body: JSON.stringify(await User.findOneAndUpdate({ userid }, { $push: { posts: post } }, { new: true }).select({ posts: 1, _id: 0 }))
      }
    }

    // PUT REQUEST : EDIT POST
    if (event.httpMethod === "PUT") {
      const { _id, title, text } = JSON.parse(result.post);

      const deleteThumbnail = result.photo && JSON.parse(result.photo).delete;

      let thumbnail = {};

      if (result.files.length) {
        const { contentType, content, filename } = result.files[0];
        thumbnail = { "posts.$.thumbnail": { src: `data:${contentType};base64,${content.toString('base64')}`, alt: filename } };
      } else if (deleteThumbnail) {
        thumbnail = { "posts.$.thumbnail": { src: "", alt: "" } };
      }

      const post = {
        "posts.$.title": title,
        "posts.$.text": text,
        "posts.$.publish_date": new Date(),
        ...thumbnail
      };

      return {
        statusCode: 200,
        body: JSON.stringify(await User.findOneAndUpdate({ userid, "posts._id": _id }, { "$set": post }, { new: true }).select({ posts: 1, _id: 0 }))
      }
    }

    // DELETE REQUEST : DELETE POST
    if (event.httpMethod === "DELETE") {
      const { _id } = JSON.parse(result.post);

      return {
        statusCode: 200,
        body: JSON.stringify(await User.findOneAndUpdate({ userid }, { $pull: { posts: { _id } } }, { safe: true, new: true }).select({ posts: 1, _id: 0 })),
      }
    }
  }

  return await verify().catch(console.error);
}