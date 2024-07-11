import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.VUE_APP_AIRTABLE_API_KEY }).base(process.env.VUE_APP_AIRTABLE_BASE_ID);

export const fetchAllRecords = (table) => {
  console.log('Fetching records from Airtable...');
  let allRecords = [];

  return new Promise((resolve, reject) => {
    base(table)
      .select({ view: 'Grid view' })
      .eachPage(
        (records, fetchNextPage) => {
          console.log(`Fetched ${records.length} records`);
          allRecords = [...allRecords, ...records];
          fetchNextPage();
        },
        (err) => {
          if (err) {
            console.error('Error fetching records:', err);
            reject(err);
          } else {
            console.log(`Total records fetched: ${allRecords.length}`);
            resolve(allRecords);
          }
        }
      );
  });
};
