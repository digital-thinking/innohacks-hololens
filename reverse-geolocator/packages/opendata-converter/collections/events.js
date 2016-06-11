const eventsCollection = new Mongo.Collection('events');

app.Collections.events = eventsCollection;

var eventSchema = new SimpleSchema([app.Schemas.commonMetadata, {
  activity: {
    type: String,
    optional: true
  },
  category: {
    type: String,
    optional: true
  },
  address: {
    type: String,
    optional: true
  },
  state: {
    type: String,
    optional: true
  },
  openedAt: {
    type: String,
    optional: true
  },
  editedAt: {
    type: String,
    optional: true
  },
  channel: {
    type: String,
    optional: true
  }
}]);

app.Schemas.event = eventSchema;

eventsCollection.attachSchema(eventSchema);
