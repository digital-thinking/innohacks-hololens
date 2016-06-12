We want to display the events reported by the citizens of Karlsruhe on the Hololens map.

Problem: The open data from Karlsruhe only delivers street names, but no geolocations (latitude / longitude).

Solution: For each event, get the address data and resolve the address into a geolocation using an external "reverse geocoding service" (<http://nominatim.openstreetmap.org>).

Input data is read as a CSV file, output is written as a JSON file that can then be imported by Unity.

The converter is implemented as a NodeJS/MeteorJS application.

It is only a utility we were using for data preparation. It is not required by the Hololens demo. There we are using the results of the conversion.

If you want to try it: _download and install Meteor from meteor.com_ in the terminal, go into the `reverse-geolocator` folder* run the `meteor` command

Conversion takes some time since Nominatim only allows 1 request per second and we have more than 3.000 requests to send.
