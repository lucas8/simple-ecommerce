import { ResolverMap, TEST_CHECK } from "../../types/graphql-utils";
import { Release } from "../../entity/Release";
import { pubsub } from "../../pubsub";

export const resolvers: ResolverMap = {
  Mutation: {
    createRelease: (_, { stock }, ___) => {
      if (stock > 0) {
        pubsub.publish(TEST_CHECK, { checkStock: true });
      }

      return Release.create({ stock }).save();
    },
    editRelease: async (_, { releaseId, newStock }, ___) => {
      const release = await Release.findOne({ id: releaseId });
      if (!release) {
        throw new Error("Release was not found!");
      }

      if (newStock > 0) {
        pubsub.publish(TEST_CHECK, { checkStock: true });
      } else if (newStock === 0) {
        pubsub.publish(TEST_CHECK, { checkStock: false });
      }

      release.stock = newStock;
      return release.save();
    }
  },
  Query: {
    releases: async (_, __, ___) => Release.find({})
  }
};
