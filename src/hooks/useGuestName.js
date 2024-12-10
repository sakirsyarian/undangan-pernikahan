import { useState, useEffect } from 'react';

export const useGuestName = (defaultValue = '') => {
  const [guestName, setGuestName] = useState(defaultValue);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get('guest');
    if (guest) {
      setGuestName(decodeURIComponent(guest));
    }
  }, []);

  return guestName;
};
