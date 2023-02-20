declare module 'shopify-buy' {
    function buildClient(config: {
      storefrontAccessToken: string,
      domain: string,
    }): any;
    }
  