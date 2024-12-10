import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../config';
import { COLLECTIONS } from './collections';

export const wishService = {
  /**
   * Add a new wish
   * @param {Object} wishData - Wish data to be added
   * @returns {Promise<string>} ID of the created wish
   */
  async addWish(wishData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.WISHES), {
        ...wishData,
        datetime: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding wish:', error);
      throw error;
    }
  },

  /**
   * Get wishes with pagination
   * @param {number} pageSize - Number of wishes to fetch
   * @returns {Promise<Array>} Array of wishes
   */
  async getWishes(pageSize = 10) {
    try {
      const q = query(
        collection(db, COLLECTIONS.WISHES),
        orderBy('datetime', 'desc'),
        limit(pageSize)
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching wishes:', error);
      throw error;
    }
  }
};
