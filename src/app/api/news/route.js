// src/app/api/news/route.js
import { NextResponse } from "next/server";
import graphQLClient from "../../../lib/graphql/wordpress";

export async function GET() {
  try {
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
    
    // Transform the data to match your expected format
    const news = result.newsAndEvents.edges.map(edge => ({
      id: edge.node.id,
      type: edge.node.newsOrEvent || "news",
      title: edge.node.title,
      summary: extractSummary(edge.node.content || ""),
      content: edge.node.content,
      feature_image: edge.node.featuredImage?.node?.mediaItemUrl || "",
      image: edge.node.images?.edges?.map(img => img.node.mediaItemUrl) || [],
      author: edge.node.author?.node?.id || "Admin",
      tags: [] // Default empty array since tags aren't available
    }));

    // Sort by date if available, otherwise keep original order
    const sorted = news;

    return NextResponse.json(sorted);
  } catch (error) {
    console.error("GraphQL Error:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}

// Helper function to extract a summary from content
function extractSummary(content) {
  // Remove HTML tags
  const textOnly = content.replace(/<[^>]*>/g, ' ');
  // Get first 150 characters
  return textOnly.substring(0, 150).trim() + (textOnly.length > 150 ? '...' : '');
}