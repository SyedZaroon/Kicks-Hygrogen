export const COLLECTIONS_LIST = `
  query getCollections {
    collections(first: 10) {
      nodes {
        id
        title
        handle
        image {
          url
          altText
        }
      }
    }
  }
`;
