var map;
var myOptions = {
      zoom: 7,
      center: new google.maps.LatLng(46.87916, -3.32910),
      mapTypeId: 'roadmap'
  };
map = new google.maps.Map(document.getElementById('map-canvas'),
      myOptions);

  


var markers = {};

/**
 * Concatenates given lat and lng with an underscore and returns it.
 * This id will be used as a key of marker to cache the marker in markers object.
 * @param {!number} lat Latitude.
 * @param {!number} lng Longitude.
 * @return {string} Concatenated marker id.
 */
var getMarkerUniqueId= function(lat, lng) {
    return lat + '_' + lng;
}

/**
 * Creates an instance of google.maps.LatLng by given lat and lng values and returns it.
 * This function can be useful for getting new coordinates quickly.
 * @param {!number} lat Latitude.
 * @param {!number} lng Longitude.
 * @return {google.maps.LatLng} An instance of google.maps.LatLng object
 */ 
var getLatLng = function(lat, lng) {
    return new google.maps.LatLng(lat, lng);
};
  // google.maps.event.addListener(map, 'click', function(event) {
  //     addMarker(event.latLng);
  //   });
/**
 * Binds click event to given map and invokes a callback that appends a new marker to clicked location.
 */ 
var addMarker = google.maps.event.addListener(map, 'click', function(e) {
    var lat = e.latLng.lat(); // lat of clicked point
    var lng = e.latLng.lng(); // lng of clicked point
    var markerId = getMarkerUniqueId(lat, lng); // an that will be used to cache this marker in markers object.
    var marker = new google.maps.Marker({
        position: getLatLng(lat, lng),
        map: map,
        draggable:true,
        id: 'marker_' + markerId
    });
    markers[markerId] = marker; // cache marker in markers object
    bindMarkerEvents(marker); // bind right click event to marker
});

/**
 * Binds right click event to given marker and invokes a callback function that will remove the marker from map.
 * @param {!google.maps.Marker} marker A google.maps.Marker instance that the handler will binded.
 */ 
var bindMarkerEvents = function(marker) {
    google.maps.event.addListener(marker, "rightclick", function (point) {
        var markerId = getMarkerUniqueId(point.latLng.lat(), point.latLng.lng()); // get marker id by using clicked point's coordinate
        var marker = markers[markerId]; // find marker
        removeMarker(marker, markerId); // remove it
    });
};

/**
 * Removes given marker from map.
 * @param {!google.maps.Marker} marker A google.maps.Marker instance that will be removed.
 * @param {!string} markerId Id of marker.
 */ 

 // Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

var removeMarker = function(marker, markerId) {
    marker.setMap(null); // set markers setMap to null to remove it from map
    delete markers[markerId]; // delete marker instance from markers object
};
google.maps.event.addDomListener(window, 'load', initialize);



