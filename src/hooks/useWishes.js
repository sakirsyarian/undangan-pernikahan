import { useState, useEffect } from 'react';
import { wishService } from '../firebase/services/wishService';

export const useWishes = (pageSize = 10) => {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchWishes();
  }, [pageSize]);

  const fetchWishes = async () => {
    try {
      const data = await wishService.getWishes(pageSize);
      setWishes(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const addWish = async (wishData) => {
    setIsSubmitting(true);
    try {
      const wishId = await wishService.addWish(wishData);
      await fetchWishes(); // Refresh wishes after adding new one
      return { success: true, wishId };
    } catch (err) {
      console.error('Error adding wish:', err);
      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    wishes,
    loading,
    error,
    isSubmitting,
    addWish
  };
};
