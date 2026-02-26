const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const sessionId = event.queryStringParameters
      ? event.queryStringParameters.session_id
      : null;

    if (!sessionId) {
      return { statusCode: 400, body: "Missing session_id" };
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = session && session.payment_status === "paid";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ paid })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ paid: false })
    };
  }
};
