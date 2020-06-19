/* global google */

/**
 * --------------------------------------------------------------------------
 * CoreUI Pro Boostrap Admin Template (2.0.1): google-maps.js
 * Licensed under MIT (https://coreui.io/license)
 * --------------------------------------------------------------------------
 */

/* eslint-disable no-magic-numbers, no-unused-vars */
var InitMap = function InitMap() {
  var locations = this.map_locations;
  var map = new google.maps.Map(document.getElementById('map'), {
    center: map_centre,
    zoom: 15
  });
  var markers = locations.map(function (location, i) {
    var contentString = "<a href=\"" + location.www + "\" target=\"_blank\"><strong>" + location.title + "</strong></a>";
    var infoWindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200
    });
    var marker = new google.maps.Marker({
      position: location,
      label: location.label,
      map: map,
      title: location.title,
      contentString: contentString
    });
    marker.addListener('click', function () {
      infoWindow.open(map, marker);
    });
    return marker;
  });
};

if (window.google && window.google.maps) {
  InitMap();
}
//# sourceMappingURL=google-maps.js.map