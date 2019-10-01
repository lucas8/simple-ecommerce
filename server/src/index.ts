import "reflect-metadata";
import "dotenv/config";
import { GraphQLServer } from "graphql-yoga";
import { createConnection } from "typeorm";
import * as Stripe from "stripe";
import * as path from "path";
import * as glob from "glob";

export const main = async () => {
  await createConnection();

  const server = new GraphQLServer({
    resolvers: glob
      .sync(`${path.join(__dirname, "../modules")}/**/resolvers.?s`)
      .map(resolver => require(resolver).resolvers),
    typeDefs: "./src/schema.graphql",
    context: request => ({
      ...request,
      // Pass stripe through the context
      stripe: new Stripe(process.env.STRIPE_PRIVATE as string)
    })
  });

  const app = await server.start({
    port: process.env.NODE_ENV === "production" ? 0 : 4000
  });
  console.log("Server is running on http://localhost:4000");

  return app;
};

main();
