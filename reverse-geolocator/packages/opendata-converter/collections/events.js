const eventsCollection = new Mongo.Collection('events');

app.Collections.events = eventsCollection;

var geoJSONPointSchema = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['Point']
  },
  coordinates: {
    type: [Number],
    decimal: true
  }
});

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
  },
  // Location of the Bike
  location: {
    type: Object,
    optional: true
  },
  'location.center': {
    type: geoJSONPointSchema,
    index: '2dsphere',
  },
  'location.bbox': {
    type: Object, // geoJSONPolygonSchema
    optional: true,
    blackbox: true
  },
  'location.data': {
    type: Object,
    optional: true,
    blackbox: true
  }
}]);

app.Schemas.event = eventSchema;

eventsCollection.attachSchema(eventSchema);
