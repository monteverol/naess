// src/lib/graphql/queries/jobs.js
import graphQLClient from '../wordpress';

export async function getAllJobs() {
  const query = `
    query NewQuery { 
      jobs { 
        edges { 
          node { 
            clients { 
              node { 
                title 
              } 
            } 
            jobType 
            title 
            qualification 
            description 
          } 
        } 
      } 
    }
  `;

  const result = await graphQLClient.request(query);
  
  return result.jobs.edges.map(edge => ({
    id: edge.node.id || Math.random().toString(36).substring(2, 15),
    title: edge.node.title,
    jobType: edge.node.jobType,
    description: edge.node.description,
    qualifications: edge.node.qualification,
    client: edge.node.clients?.node?.title || ""
  }));
}

export async function getJobById(id) {
  const query = `
    query GetJobById($id: ID!) {
      job(id: $id) {
        clients { 
          node { 
            title 
          } 
        } 
        jobType 
        title 
        qualification 
        description
      }
    }
  `;

  const result = await graphQLClient.request(query, { id });
  const job = result.job;
  
  return {
    id: job.id || id,
    title: job.title,
    jobType: job.jobType,
    description: job.description,
    qualifications: job.qualification,
    client: job.clients?.node?.title || ""
  };
}