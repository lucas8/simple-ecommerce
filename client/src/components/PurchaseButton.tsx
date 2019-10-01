import React from "react";
import { usePurchaseMutation } from "../generated/graphql";

// @ts-ignore
const stripe = window.Stripe("pk_test_l8tg5JiFXbCNRSIy20rWCYaL00WgI8qlQs");

const PurchaseButton = () => {
  const [purchase] = usePurchaseMutation({
    variables: {
      releaseId: 1
    }
  });

  return (
    <button
      onClick={async () => {
        const { data } = await purchase();

        if (!data || !data.purchase || !data.purchase.session) {
          throw new Error("Error!");
        }

        stripe.redirectToCheckout({
          sessionId: data.purchase.session
        });
      }}
    >
      purchase
    </button>
  );
};

export default PurchaseButton;
