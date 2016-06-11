// Convert address data into geo location data

const eventsCSVFile = 'ka-feedback-2015.csv';
const eventsCollection = app.Collections.events;

const mapping = {
  activity: 0,
  category: 1,
  address: 2,
  state: 3,
  openedAt: 4,
  editedAt: 5,
  channel: 6
};

Meteor.startup(function() {
  // Read in CSV file
  const eventsCSV = Assets.getText(eventsCSVFile);
  // Split into separate lines
  const eventsRecords = eventsCSV.split('\n');
  // Remove header line at the top
  eventsRecords.shift();
  // Remove quotation marks and commata from strings
  const re = /(.*)\"(.*),(.*),(.*)\"(.*)/;
  eventsCollection.remove({});
  _.forEach(eventsRecords, (record) => {
    record = record.replace(re, '$1$2$3$4$5');
    const splitRecord = record.split(',');
    if (splitRecord[mapping.address] === '') {
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
});
