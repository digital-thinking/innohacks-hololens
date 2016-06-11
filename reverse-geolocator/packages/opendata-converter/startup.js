const givenNamesCSVFile = 'Vornamensliste2015.csv';
// const givenNamesCollection = app.Collections.maOpenDataGivenNames;

Meteor.startup(function() {
  const givenNamesCSV = Assets.getText(givenNamesCSVFile);
  const givenNamesRecords = givenNamesCSV.split('\r\n');
  // remove 4 lines at the top
  givenNamesRecords.shift();
  givenNamesRecords.shift();
  givenNamesRecords.shift();
  givenNamesRecords.shift();
  // givenNamesCollection.remove({});
  // _.forEach(givenNamesRecords, (record) => {
  // const splitRecord = record.split(';');
  // givenNamesCollection.insert({
  //   name: splitRecord[1],
  //   gender: 'f',
  //   rank: splitRecord[0]
  // });
  // givenNamesCollection.insert({
  //   name: splitRecord[2],
  //   gender: 'm',
  //   rank: splitRecord[0]
  // });
  // });
});
