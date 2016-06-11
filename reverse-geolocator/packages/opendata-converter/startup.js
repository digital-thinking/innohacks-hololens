// Convert address data into geo location data

const kaFeedbacksCSVFile = 'ka-feedback-2015.csv';
// const kaFeedbacksCollection = app.Collections.maOpenDatakaFeedbacks;

Meteor.startup(function() {
  const kaFeedbacksCSV = Assets.getText(kaFeedbacksCSVFile);
  const kaFeedbacksRecords = kaFeedbacksCSV.split('\r\n');
  // remove 4 lines at the top
  kaFeedbacksRecords.shift();
  kaFeedbacksRecords.shift();
  kaFeedbacksRecords.shift();
  kaFeedbacksRecords.shift();
  // kaFeedbacksCollection.remove({});
  // _.forEach(kaFeedbacksRecords, (record) => {
  // const splitRecord = record.split(';');
  // kaFeedbacksCollection.insert({
  //   name: splitRecord[1],
  //   gender: 'f',
  //   rank: splitRecord[0]
  // });
  // kaFeedbacksCollection.insert({
  //   name: splitRecord[2],
  //   gender: 'm',
  //   rank: splitRecord[0]
  // });
  // });
});
