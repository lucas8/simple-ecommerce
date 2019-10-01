import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Mutation = {
   __typename?: 'Mutation',
  createRelease: Release,
  purchase: StripeCheckout,
};


export type MutationCreateReleaseArgs = {
  stock: Scalars['Int']
};


export type MutationPurchaseArgs = {
  releaseId: Scalars['Int']
};

export type Query = {
   __typename?: 'Query',
  releases: Array<Maybe<Release>>,
};

export type Release = {
   __typename?: 'Release',
  stock: Scalars['Int'],
};

export type StripeCheckout = {
   __typename?: 'StripeCheckout',
  session?: Maybe<Scalars['String']>,
};

export type Subscription = {
   __typename?: 'Subscription',
  checkStock?: Maybe<Scalars['Boolean']>,
};


export type SubscriptionCheckStockArgs = {
  releaseId: Scalars['Int']
};
export type CheckStockSubscriptionVariables = {
  releaseId: Scalars['Int']
};


export type CheckStockSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'checkStock'>
);

export type PurchaseMutationVariables = {
  releaseId: Scalars['Int']
};


export type PurchaseMutation = (
  { __typename?: 'Mutation' }
  & { purchase: (
    { __typename?: 'StripeCheckout' }
    & Pick<StripeCheckout, 'session'>
  ) }
);

export const CheckStockDocument = gql`
    subscription CheckStock($releaseId: Int!) {
  checkStock(releaseId: $releaseId)
}
    `;

    export function useCheckStockSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<CheckStockSubscription, CheckStockSubscriptionVariables>) {
      return ApolloReactHooks.useSubscription<CheckStockSubscription, CheckStockSubscriptionVariables>(CheckStockDocument, baseOptions);
    }
export type CheckStockSubscriptionHookResult = ReturnType<typeof useCheckStockSubscription>;
export type CheckStockSubscriptionResult = ApolloReactCommon.SubscriptionResult<CheckStockSubscription>;
export const PurchaseDocument = gql`
    mutation Purchase($releaseId: Int!) {
  purchase(releaseId: $releaseId) {
    session
  }
}
    `;
export type PurchaseMutationFn = ApolloReactCommon.MutationFunction<PurchaseMutation, PurchaseMutationVariables>;

    export function usePurchaseMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PurchaseMutation, PurchaseMutationVariables>) {
      return ApolloReactHooks.useMutation<PurchaseMutation, PurchaseMutationVariables>(PurchaseDocument, baseOptions);
    }
export type PurchaseMutationHookResult = ReturnType<typeof usePurchaseMutation>;
export type PurchaseMutationResult = ApolloReactCommon.MutationResult<PurchaseMutation>;
export type PurchaseMutationOptions = ApolloReactCommon.BaseMutationOptions<PurchaseMutation, PurchaseMutationVariables>;