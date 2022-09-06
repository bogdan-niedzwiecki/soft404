const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

exports.handler = async function (event) {
  const { token_id } = JSON.parse(event.body);

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token_id,
      audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    if (userid) {
      return {
        statusCode: 200,
        body: JSON.stringify({ token_id })
      }
    }
  }

  return await verify().catch(console.error);
}