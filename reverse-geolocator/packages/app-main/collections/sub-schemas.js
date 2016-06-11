// Schemas included in other schemas
app.Schemas.commonMetadata = new SimpleSchema({
  '_id': {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  // Force value to be current date (on server) upon insert
  // and prevent updates thereafter.
  'createdAt': {
    type: Date,
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date()
        };
      } else {
        this.unset();
      }
    },
    autoform: {
      omit: true
    }
  },
  // Force value to be current date (on server) upon update
  updatedAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    },
    optional: true,
    autoform: {
      omit: true
    }
  }
});
