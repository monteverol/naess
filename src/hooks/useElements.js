import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function useElements() {
  const [homeCarouselItems, setHomeCarouselItems] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [naesscares, setNaesscares] = useState([]);

  useEffect(() => {
    const fetchElements = () => 
      toast.promise(
        fetch('/api/elements')
          .then((res) => res.json())
          .then((data) => {
            setHomeCarouselItems(data["homeCarousel"]);
            setMilestones(data["milestones"]);
            setNaesscares(data["naesscares"]);
          }),
        {
          loading: "Fetching All Elements",
          success: "Successfully Fetched all Elements",
          error: "Failed Fetching All Elements"
        }
      );
    
    fetchElements();
  }, [])

  return {
    homeCarouselItems,
    milestones,
    naesscares
  }
}