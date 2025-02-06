import axios from 'axios';



const api = axios.create({
  baseURL:  process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCodes = async (userId, token) => {
    try {
      const response = await api.get(`/api/qrcode/${userId}`, {
        headers: { Authorization: "Bearer " + token },
      });
      return response.data.codes;
    } catch (error) {
      console.error('Error fetching codes:', error.response?.data || error);
      throw error;
    }
}