import CONSTANTS from "@/constants";
import Airtable from "airtable";

const base = new Airtable({
  apiKey: process.env.VUE_APP_AIRTABLE_API_KEY,
}).base(process.env.VUE_APP_AIRTABLE_BASE_ID);

export const fetchAllRecords = (table) => {
  console.log("Fetching records from Airtable...", table);
  let allRecords = [];

  return new Promise((resolve, reject) => {
    base(table)
      .select({ view: "Grid view" })
      .eachPage(
        (records, fetchNextPage) => {
          console.log(`Fetched ${records.length} records`);
          allRecords = [...allRecords, ...records];
          fetchNextPage();
        },
        (err) => {
          if (err) {
            console.error("Error fetching records:", err);
            reject(err);
          } else {
            console.log(`Total records fetched: ${allRecords.length}`);
            if (table === CONSTANTS.AT_TN_AGENTS) {
              resolve(allRecords);
            } else {
              resolve(
                allRecords.filter((rec) => rec.fields?.agent_id?.length > 0)
              );
            }
          }
        }
      );
  });
};

export const createAppointment = (appointment) => {
  return new Promise((resolve, reject) => {
    base(CONSTANTS.AT_TN_APPOINTMENTS).create(
      [
        {
          fields: {
            address: appointment.address,
            date: appointment.date,
            agents: appointment.selectedAgents.map(agent => agent.id), // Assuming 'agents' is a linked record field
          },
        },
      ],
      (err, records) => {
        if (err) {
          console.error("Error creating appointment:", err);
          reject(err);
        } else {
          console.log("Appointment created:", records[0]);
          resolve(records[0]);
        }
      }
    );
  });
};
