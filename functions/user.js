const MultipartParser = require('lambda-multipart-parser')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
const User = require('../models/user_model.js');

exports.handler = async function (event) {
  const id_token = event.headers['x-zumo-auth'];

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    if (!userid) { return }

    // GET REQUEST : GET USERS BY NAME OR SURNAME
    if (event.httpMethod === "GET") {
      const name = event.queryStringParameters.friend_name
      return {
        statusCode: 200,
        body: JSON.stringify(
          await User.find({
            $and: [
              { userid: { $ne: userid } },
              {
                $or: [
                  { family_name: { $regex: name, $options: "i" } },
                  { given_name: { $regex: name, $options: "i" } }
                ]
              }]
          }).select({ given_name: 1, family_name: 1, picture: 1 })
        )
      }
    }

    // POST REQUEST : CREATE USER
    if (event.httpMethod === "POST") {
      const { given_name, family_name, picture, email } = payload;

      async function updateGoogleData(user) {
        if (!user || user.google_user_data) {
          return await User.findOneAndUpdate({ userid }, { given_name, family_name, picture, email, google_user_data: true }, { new: true, upsert: true }).select({ _id: 0, __v: 0, userid: 0, friends: 0 })
        } else {
          return user;
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify(
          await updateGoogleData(await User.findOne({ userid }).select({ _id: 0, __v: 0, userid: 0, friends: 0 }))
        )
      }
    }

    // PUT REQUEST : UPDATE USER
    if (event.httpMethod === "PUT") {
      const result = await MultipartParser.parse(event);
      const { name, givenName } = JSON.parse(result.user);

      let picture = {};
      if (result.files.length) {
        const { contentType, content } = result.files[0];
        picture = { picture: `data:${contentType};base64,${content.toString('base64')}` };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(
          await User.findOneAndUpdate({ userid }, { given_name: name, family_name: givenName, google_user_data: false, ...picture }, { new: true, upsert: true }).select({ _id: 0, __v: 0, userid: 0, friends: 0 })
        )
      }
    }

    // DELETE REQUEST : DELETE USER
    if (event.httpMethod === "DELETE") {
      return {
        statusCode: 200,
        body: JSON.stringify(await User.remove({ userid }))
      }
    }
  }

  return await verify().catch(console.error);
}