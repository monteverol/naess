// src/lib/graphql/queries/clients.js
import graphQLClient from '../wordpress';

export async function getAllClients() {
  const query = `
    query NewQuery { 
      clients { 
        nodes { 
          id 
          featuredImage { 
            node { 
              mediaItemUrl 
              title 
            } 
          } 
          title 
          details 
          vessels { 
            nodes { 
              mediaItemUrl 
              title 
            } 
          } 
        } 
      } 
    }
  `;

  const result = await graphQLClient.request(query);
  return result.clients.nodes;
}

export async function getClientById(id) {
  const query = `
    query GetClientById($id: ID!) {
      client(id: $id) {
        id 
        featuredImage { 
          node { 
            mediaItemUrl 
            title 
          } 
        } 
        title 
        details 
        vessels { 
          nodes { 
            mediaItemUrl 
            title 
          } 
        }
      }
    }
  `;

  const result = await graphQLClient.request(query, { id });
  return result.client;
}