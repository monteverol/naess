// src/lib/graphql/wordpress.js
import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
const graphQLClient = new GraphQLClient(endpoint);

export default graphQLClient;