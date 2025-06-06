import { Donation } from "../@Types/chabadType";

const baseUrl = "https://node-beit-chabad-yaffo.onrender.com/api/payment"; // כתובת הבסיס של ה-API שלך

export const getAllDonations = async (): Promise<Donation[]> => {
  const response = await fetch(`${baseUrl}/nedarim/payments`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch donations');
  }
  
  const data = await response.json();
  return data as Donation[];
};
