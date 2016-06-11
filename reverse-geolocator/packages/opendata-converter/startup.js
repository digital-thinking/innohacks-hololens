// Convert address data into geo location data

const eventsCSVFile = 'ka-feedback-2015.csv';
const eventsCollection = app.Collections.events;

Meteor.startup(function() {
  const eventsCSV = Assets.getText(eventsCSVFile);
  const eventsRecords = eventsCSV.split('\r\n');
  // remove 4 lines at the top
  eventsRecords.shift();
  eventsRecords.shift();
  eventsRecords.shift();
  eventsRecords.shift();
  // eventsCollection.remove({});
  // _.forEach(eventsRecords, (record) => {
  // const splitRecord = record.split(';');
  // eventsCollection.insert({
  //   name: splitRecord[1],
  //   gender: 'f',
  //   rank: splitRecord[0]
  // });
  // eventsCollection.insert({
  //   name: splitRecord[2],
  //   gender: 'm',
  //   rank: splitRecord[0]
  // });
  // });
});
