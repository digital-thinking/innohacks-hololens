const eventsCollection = new Mongo.Collection('events');

app.Collections.events = eventsCollection;

var eventSchema = new SimpleSchema([app.Schemas.commonMetadata, {
  name: {
    type: String
  },
  gender: {
    type: String,
    allowedValues: ['m', 'f']
  },
  rank: {
    type: Number
  }
}]);

app.Schemas.event = eventSchema;

eventsCollection.attachSchema(eventSchema);
