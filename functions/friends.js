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

    // GET REQUEST : GET FRIENDS
    if (event.httpMethod === "GET") {

      async function getUser() {
        return await User.findOne({ userid })
      }

      const user = await getUser();

      const friendsId = user.friends.map(friend => friend._id);
      const friendsVisibleId = user.friends.filter(friend => friend.visible).map(friend => friend._id);

      async function getFriends() {
        const friends = await User.find({ _id: { $in: friendsId } }).select({ given_name: 1, family_name: 1, picture: 1, posts: 1 }).lean();
        const mappedFriends = friends.map(friend => {
          return { visible: friendsVisibleId.includes(`${friend._id}`), ...friend }
        })
        return mappedFriends;
      }

      return {
        statusCode: 200,
        body: JSON.stringify(await getFriends())
      }
    }

    // POST REQUEST : ADD TO FRIENDS
    if (event.httpMethod === "POST") {
      const { _id } = JSON.parse(event.body);

      return {
        statusCode: 200,
        body: JSON.stringify(
          await User.findOneAndUpdate({ userid }, { $addToSet: { friends: { _id, visible: true } } }, { new: true }).select({ given_name: 1, family_name: 1, picture: 1, posts: 1 })
        )
      }
    }

    // PUT REQUEST : EDIT FRIEND VISIBILITY
    if (event.httpMethod === "PUT") {
      const { _id, visibility } = JSON.parse(event.body);

      const friend = {
        "friends.$._id": _id,
        "friends.$.visible": !visibility,
      };

      return {
        statusCode: 200,
        body: JSON.stringify(await User.findOneAndUpdate({ userid, "friends._id": _id }, { "$set": friend }, { new: true }).select({ friends: 1, _id: 0 }))
      }
    }

    // DELETE REQUEST : REMOVE FROM FRIENDS
    if (event.httpMethod === "DELETE") {
      const { _id } = JSON.parse(event.body);

      return {
        statusCode: 200,
        body: JSON.stringify(
          await User.findOneAndUpdate({ userid }, { $pull: { friends: { _id } } }, { new: true }).select({ given_name: 1, family_name: 1, picture: 1, posts: 1 })
        )
      }
    }
  }

  return await verify().catch(console.error);

}