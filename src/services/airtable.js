import axios from 'axios';

const baseURL = `https://api.airtable.com/v0/${process.env.VUE_APP_AIRTABLE_BASE_ID}/${process.env.VUE_APP_AIRTABLE_TABLE_NAME}`;
const apiKey = process.env.VUE_APP_AIRTABLE_API_KEY;

const airtable = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${apiKey}`
  }
});

export const fetchData = async () => {
  try {
    const response = await airtable.get();
    return response.data.records;
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    throw error;
  }
};
