import { ResolverMap, Context, TEST_CHECK } from "../../types/graphql-utils";
import { getConnection } from "typeorm";
import { Release } from "../../entity/Release";
import { createSession } from "../../utils/createSession";
import { pubsub } from "../../pubsub";

export const resolvers: ResolverMap = {
  Mutation: {
    purchase: async (
      _,
      { releaseId }: { releaseId: string },
      { stripe }: Context
    ) => {
      return getConnection().transaction(
        "SERIALIZABLE",
        async transactionalEntityManager => {
          // Find release user requested
          const release = await transactionalEntityManager.findOne(Release, {
            id: releaseId
          });
          if (!release) {
            throw new Error("Release Not Found!");
          }

          if (release.stock === 0) {
            pubsub.publish(TEST_CHECK, { checkStock: false });
            throw new Error("No Stock Left!");
          }

          const session = await createSession(stripe);

          release.stock -= 1;

          // Save the stock with the transactionalEntityManager
          // To enable rollbacks if the transaction fails
          await transactionalEntityManager.save(release);

          if (release.stock === 0) {
            pubsub.publish(TEST_CHECK, { checkStock: false });
          }

          return {
            session: session.id
          };
        }
      );
    }
  }
};
