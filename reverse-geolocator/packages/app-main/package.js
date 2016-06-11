Package.describe({
  name: 'hololens:app-main',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Defines namespaces and global objects for the application',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use(['aldeed:simple-schema@1.3.3', 'aldeed:collection2@2.5.0', 'aldeed:autoform@5.5.0']);
  api.addFiles('namespaces.js');
  api.addFiles('collections/sub-schemas.js');
  api.export('app');
});
