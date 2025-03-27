"use client";

import { use, useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

const PrincipalPage = ({ params }) => {
  const unwrappedParams = use(params);
  const { principalId } = unwrappedParams;

  const [principalData, setPrincipalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_URL}/clients/api`);
        const principal = await response.json();
        
        const foundPrincipal = principal.find((item) => item.id === Number(principalId));
        
        if (foundPrincipal) {
          setPrincipalData(foundPrincipal);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [principalId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!principalData) return <p>No news item found</p>;

  return(
    <div className="mt-20">
      {principalData.id}
      {principalData.name}
      {principalData.industry}
      {principalData.logo}
      {principalData.description}
    </div>
  );
}

export default PrincipalPage