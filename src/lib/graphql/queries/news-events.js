// src/lib/graphql/queries/news-events.js
import graphQLClient from '../wordpress';

export async function getNewsAndEvents() {
  const query = `
    query NewQuery { 
      newsAndEvents { 
        edges { 
          node { 
            id 
            title 
            featuredImage { 
              node { 
                id 
                title 
                mediaItemUrl 
              } 
            } 
            author { 
              node { 
                id 
              } 
            } 
            content 
            images { 
              edges { 
                node { 
                  id 
                  title 
                  mediaItemUrl 
                } 
              } 
            } 
            newsOrEvent 
          } 
        } 
      } 
    }
  `;

  const result = await graphQLClient.request(query);
  return result.newsAndEvents.edges.map(edge => edge.node);
}

export async function getNewsEventById(id) {
  const query = `
    query GetNewsEventById($id: ID!) {
      newsAndEvent(id: $id) {
        id 
        title 
        featuredImage { 
          node { 
            id 
            title 
            mediaItemUrl 
          } 
        } 
        author { 
          node { 
            id 
          } 
        } 
        content 
        images { 
          edges { 
            node { 
              id 
              title 
              mediaItemUrl 
            } 
          } 
        } 
        newsOrEvent
      }
    }
  `;

  const result = await graphQLClient.request(query, { id });
  return result.newsAndEvent;
}