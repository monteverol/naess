// src/app/api/clients/route.js
import { NextResponse } from "next/server";
import graphQLClient from "../../../lib/graphql/wordpress";

export async function GET() {
  try {
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
    
    // Transform to match your expected format
    const clients = result.clients.nodes.map(client => ({
      id: client.id,
      name: client.title,
      industry: "", // No industry field available in the schema
      logo: client.featuredImage?.node?.mediaItemUrl || "",
      description: client.details || "",
      vessels: client.vessels?.nodes?.map(vessel => vessel.mediaItemUrl) || []
    }));

    return NextResponse.json(clients);
  } catch (error) {
    console.error("GraphQL Error:", error);
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
  }
}