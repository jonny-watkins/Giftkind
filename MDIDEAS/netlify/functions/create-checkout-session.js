const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const quantity = Number(body.quantity || 1);
    const origin = process.env.URL || process.env.DEPLOY_URL || "https://giftkind.netlify.app";
    const returnPathRaw = typeof body.returnPath === "string" ? body.returnPath : "/";
    const returnPath =
      returnPathRaw.startsWith("/") && !returnPathRaw.startsWith("//") && !returnPathRaw.includes("://")
        ? returnPathRaw
        : "/";

    const buildReturnUrl = (path, key, value) => {
      const url = new URL(path, origin);
      if (key && value) {
        url.searchParams.set(key, value);
      }
      return url.toString();
    };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity }],
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}&return=${encodeURIComponent(
        returnPath
      )}`,
      cancel_url: buildReturnUrl(returnPath, "canceled", "1")
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: session.url })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: "Failed to create checkout session." })
    };
  }
};
