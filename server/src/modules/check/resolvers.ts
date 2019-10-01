import { pubsub } from "../../pubsub";
import { TEST_CHECK } from "../../types/graphql-utils";
import { Release } from "../../entity/Release";

export const resolvers = {
  Subscription: {
    checkStock: {
      subscribe: async (_, { releaseId }: { releaseId: string }, __) => {
        const release = await Release.findOne({ id: releaseId as string });

        // Initial subscription event
        if (release && release.stock > 0) {
          setTimeout(
            () => pubsub.publish(TEST_CHECK, { checkStock: true }),
            10
          );
        } else {
          setTimeout(
            () => pubsub.publish(TEST_CHECK, { checkStock: false }),
            10
          );
        }

        return pubsub.asyncIterator(TEST_CHECK);
      }
    }
  }
};
