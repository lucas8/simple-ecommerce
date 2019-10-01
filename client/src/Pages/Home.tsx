import React from "react";
import { useCheckStockSubscription } from "../generated/graphql";
import PurchaseButton from "../components/PurchaseButton";

const Home = () => {
  const { data, loading } = useCheckStockSubscription({
    variables: {
      releaseId: 6
    }
  });

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.checkStock ? <PurchaseButton /> : <span>Out of Stock!</span>}
    </div>
  );
};

export default Home;
