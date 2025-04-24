import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

export function useClients() {
  const [clients, setClients] = useState([]);
    
  useEffect(() => {
    const fetchClients = () =>
      toast.promise(
        fetch('/api/clients')
          .then((res) => res.json())
          .then((data) => setClients(data)),
        {
          loading: "Fetching Clients Information.",
          success: "Successfully Fetched Client Information.",
          error: "Failed Fetching Clients Information."
        }
      );

    fetchClients();
  }, []);

  return {
    clients,
    setClients
  };
}