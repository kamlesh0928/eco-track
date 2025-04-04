const { collection, addDoc, Timestamp, GeoPoint } = require('firebase/firestore');
const db = require('../firebase/firebaseInit');
const carbonData = require('../data/carbonData');

async function uploadData() {
  try {
    const carbonCollection = collection(db, 'carbonFootprints');

    for (const data of carbonData) {
      const docData = {
        country: typeof data.country === 'string' ? data.country : 'Unknown',
        state: typeof data.state === 'string' ? data.state : 'Unknown',
        co2Emissions: typeof data.co2Emissions === 'number' ? data.co2Emissions : 0,
        perCapita: typeof data.perCapita === 'number' ? data.perCapita : 0,
        year: typeof data.year === 'number' ? data.year : new Date().getFullYear(),
        sectors: typeof data.sectors === 'object' && data.sectors !== null ? data.sectors : {},
        location: new GeoPoint(
          typeof data.latitude === 'number' ? data.latitude : 0,
          typeof data.longitude === 'number' ? data.longitude : 0
        ),
        timestamp: Timestamp.fromDate(new Date())
      };

      await addDoc(carbonCollection, docData);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('All data uploaded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error uploading data:', error.message);
    process.exit(1);
  }
}

uploadData();
