import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../config';
import { COLLECTIONS } from './collections';

export const guestService = {
  /**
   * Fetch guest details by name
   * @param {string} guestName - Name of the guest
   * @returns {Promise<Object|null>} Guest data or null if not found
   */
  async fetchGuestByName(guestName) {
    try {
      const q = query(
        collection(db, COLLECTIONS.GUEST),
        where('guest_name', '==', guestName)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (error) {
      console.error('Error fetching guest:', error);
      throw error;
    }
  },

  /**
   * Check if guest has already opened the invitation
   * @param {string} guestName - Name of the guest
   * @returns {Promise<boolean>} True if guest exists in stats
   */
  async hasOpenedInvitation(guestName) {
    try {
      const q = query(
        collection(db, COLLECTIONS.STATS),
        where('guest_name', '==', guestName)
      );

      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking guest stats:', error);
      throw error;
    }
  },

  /**
   * Record guest stats when opening invitation
   * Only records if guest hasn't opened invitation before
   * @param {string} guestName - Name of the guest
   * @returns {Promise<boolean>} True if stats were recorded, false if already exists
   */
  async recordStats(guestName) {
    try {
      // Check if guest has already opened invitation
      const hasOpened = await this.hasOpenedInvitation(guestName);

      // If guest has already opened invitation, don't record again
      if (hasOpened) {
        console.log('Guest has already opened invitation:', guestName);
        return false;
      }

      // Record new stats
      await addDoc(collection(db, COLLECTIONS.STATS), {
        guest_name: guestName,
        openStats: true,
        datetime: new Date().toISOString()
      });

      return true;
    } catch (error) {
      console.error('Error recording stats:', error);
      throw error;
    }
  },

  /**
   * Submit guest attendance
   * @param {string} guestName - Name of the guest
   * @param {string} attendance - Attendance type (All/Morning/Night/No)
   * @param {number} attendeeCount - Number of attendees
   * @returns {Promise<boolean>} Success status
   */
  async submitAttendance(guestName, attendance, attendeeCount) {
    try {
      await addDoc(collection(db, COLLECTIONS.ATTENDANCE), {
        guest_name: guestName,
        attendance,
        guest_count: attendeeCount,
        datetime: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error('Error submitting attendance:', error);
      throw error;
    }
  }
};
