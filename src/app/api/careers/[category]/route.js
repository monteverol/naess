// src/app/api/careers/[category]/route.js
import { NextResponse } from "next/server";
import graphQLClient from "../../../../lib/graphql/wordpress";

export async function GET(request, { params }) {
  // Await the params object
  const category = await params.category;
  const validKeys = ['job_vacancy', 'benefits', 'testimonials', 'faqs'];

  if (!validKeys.includes(category)) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
  }

  try {
    let data = [];
    
    if (category === 'job_vacancy') {
      // Fix the jobs query by removing fields that don't exist
      const query = `
        query GetJobs {
          jobs {
            edges {
              node {
                id
                title
                jobType
                description
                qualification
                clients {
                  node {
                    title
                  }
                }
              }
            }
          }
        }
      `;
      
      const result = await graphQLClient.request(query);
      
      data = result.jobs.edges.map(edge => ({
        id: edge.node.id,
        title: edge.node.title,
        location: "Malate, Manila", // Hardcoded since location field doesn't exist
        type: edge.node.jobType || "Full-time",
        category: edge.node.clients?.node?.title || "",
        description: edge.node.description || "",
        qualifications: edge.node.qualification?.split('\n') || [""]
      }));
    } 
    else if (category === 'benefits' || category === 'testimonials' || category === 'faqs') {
      // Since careerSettings doesn't exist in your WordPress GraphQL schema,
      // we'll use local JSON data as a fallback
      
      // Define fallback data for each category
      const fallbackData = {
        benefits: [
          {
            icon: "🏥",
            title: "Health Insurance",
            description: "Comprehensive medical, dental, and vision coverage for you and your dependents."
          },
          {
            icon: "🏝️",
            title: "Paid Time Off",
            description: "Take the time you need to rest, recharge, and come back at your best."
          },
          {
            icon: "💰",
            title: "Competitive Salary",
            description: "We offer top market rates for all full-time employees."
          }
        ],
        testimonials: [
          {
            id: 1,
            name: "John Doe",
            position: "LPG Gas Specialist",
            image: "/images/testimonials/person1.jpg",
            text: "Joining this company was one of the best decisions of my career!"
          },
          {
            id: 2,
            name: "Jane Smith",
            position: "Marine Engineer",
            image: "/images/testimonials/person2.jpg",
            text: "I've never worked anywhere that values creativity and innovation as much as this company."
          }
        ],
        faqs: [
          {
            question: "What is the hiring process like?",
            answer: "Our hiring process typically involves an initial screening call, followed by role-specific assessments, and then 2-3 interviews."
          },
          {
            question: "Do you offer relocation assistance?",
            answer: "Yes, we offer relocation packages for certain roles. The specifics depend on the position and location."
          }
        ]
      };
      
      // Return the fallback data for the requested category
      data = fallbackData[category] || [];
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("GraphQL Error:", error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}