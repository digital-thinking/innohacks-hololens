// Convert address data into geo location data

const eventsCSVFile = 'ka-feedback-2015.csv';
const nominatimServerBase = 'http://nominatim.openstreetmap.org/search';
const eventsCollection = app.Collections.events;
const fs = Npm.require('fs');

const mapping = {
  activity: 0,
  category: 1,
  address: 2,
  state: 3,
  openedAt: 4,
  editedAt: 5,
  channel: 6
};

// bounding box of the Karlsruhe map data
const boundingbox = [
  [8.3941, 49.0069],
  [8.4133, 49.0115]
];

// throttle for requesting geo data from service in milliseconds
const THROTTLE = 1000;
// if set to true, fetch geo location data from reverse geocoder
// otherwise, just export existing data in the database to JSON file
const PERFORM_GEOCODE = false;

Meteor.startup(function() {
  if (PERFORM_GEOCODE) {
    fetchLocationData();
  } else {
    writeLocationDataToJSON();
  }
});

function fetchLocationData() {
  // Read in CSV file
  const eventsCSV = Assets.getText(eventsCSVFile);
  // Split into separate lines
  const eventsRecords = eventsCSV.split('\n');
  // Remove header line at the top
  eventsRecords.shift();
  // Remove quotation marks and commata from strings
  const re = /(.*)\"(.*)#(.*)#(.*)\"(.*)/;
  eventsCollection.remove({});
  // Loop through the event records and store them into MongoDB
  _.forEach(eventsRecords, (record) => {
    record = record.replace(/,/g, '#');
    record = record.replace(re, '$1$2,$3,$4$5');
    const splitRecord = record.split('#');
    const address = splitRecord[mapping.address];
    if (address === '' || typeof address === 'undefined') {
      // Skip records without address
      return;
    }
    eventsCollection.insert({
      activity: splitRecord[mapping.activity],
      category: splitRecord[mapping.category],
      address: splitRecord[mapping.address],
      state: splitRecord[mapping.state],
      openedAt: splitRecord[mapping.openedAt],
      editedAt: splitRecord[mapping.editedAt],
      channel: splitRecord[mapping.channel],
    });
  });
  // Perform reverse geocoding using Nomatim (http://nominatim.openstreetmap.org)
  // We do this in a throttled mode to prevent too high load on their server
  const cursor = eventsCollection.find();
  const events = cursor.fetch();
  const numberOfEvents = cursor.count();
  for (var i = 0; i < numberOfEvents; i++) {
    const event = events[i];
    console.log(`processing event ${i+1} of ${numberOfEvents}`);
    const address = encodeURI(event.address);
    // Retrieve geolocation data from Nomatim
    HTTP.get(`${nominatimServerBase}?q=${address}&format=json`, (error, result) => {
      if (error) {
        // console.dir(error);
        return;
      }
      const locationData = result.data[0];
      // console.dir(locationData);
      if (!locationData) {
        // If no geolocation can be found, remove the event
        eventsCollection.remove({
          _id: event._id
        });
        return;
      }
      eventsCollection.update({
        _id: event._id
      }, {
        $set: {
          'location.center': {
            type: 'Point',
            coordinates: [locationData.lon, locationData.lat]
          },
          'location.bbox': {
            type: 'Polygon',
            coordinates: [
              [locationData.boundingbox]
            ]
          },
          'location.data': locationData
        }
      });
      if (i === numberOfEvents - 1) {
        writeLocationDataToJSON();
      }
    });
    // Be nice to the server
    Meteor.sleep(THROTTLE);
  }
}

function writeLocationDataToJSON() {
  const cursor = eventsCollection.find({
    'location.center': {
      $geoWithin: {
        $box: boundingbox
      }
    }
  }, {
    fields: {
      'location.data.licence': 0,
      'location.data.boundingbox': 0,
      'location.data.lat': 0,
      'location.data.lon': 0,
      'location.data.type': 0,
      'location.data.importance': 0
    }
  });
  const eventsToWrite = cursor.fetch();
  fs.writeFileSync(process.env.PWD + '/eventlocations.json', JSON.stringify(eventsToWrite, null, 2));
  console.log('finished exporting ' + cursor.count() + ' events');
}
