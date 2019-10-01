import * as Stripe from "stripe";

export const TEST_CHECK = "TEST_CHECK";

export interface Context {
  request: Express.Request;
  response: Express.Response;
  stripe: Stripe;
}

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}
