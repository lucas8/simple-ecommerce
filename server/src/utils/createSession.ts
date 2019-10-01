import * as Stripe from "stripe";

export const createSession = (stripe: Stripe) => {
  return stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        name: "Your Product",
        description: "List your Product Here",
        images: ["https://via.placeholder.com/150"],
        amount: 1000,
        currency: "usd",
        quantity: 1
      }
    ],
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel"
  });
};
