import { useState, useEffect } from 'react';
import { guestService } from '../firebase/services/guestService';

export const useGuest = (guestName) => {
  const [guestData, setGuestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasOpenedInvitation, setHasOpenedInvitation] = useState(false);

  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        const data = await guestService.fetchGuestByName(guestName);
        setGuestData(data);
        
        // Check if guest has already opened invitation
        const hasOpened = await guestService.hasOpenedInvitation(guestName);
        setHasOpenedInvitation(hasOpened);
        
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    if (guestName) {
      fetchGuestData();
    }
  }, [guestName]);

  const recordStats = async () => {
    try {
      const recorded = await guestService.recordStats(guestName);
      if (recorded) {
        setHasOpenedInvitation(true);
        console.log('Successfully recorded guest stats');
      } else {
        console.log('Guest has already opened invitation');
      }
      return recorded;
    } catch (err) {
      console.error('Error recording stats:', err);
      return false;
    }
  };

  const submitAttendance = async (attendance, attendeeCount) => {
    try {
      return await guestService.submitAttendance(guestName, attendance, attendeeCount);
    } catch (err) {
      console.error('Error submitting attendance:', err);
      return false;
    }
  };

  return {
    guestData,
    loading,
    error,
    hasOpenedInvitation,
    recordStats,
    submitAttendance
  };
};
