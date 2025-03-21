function getLocation() {
    if (navigator.geolocation) {
        document.getElementById("status").innerText = "Fetching location...";
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("status").innerText = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    let userLat = position.coords.latitude;
    let userLon = position.coords.longitude;
    document.getElementById("status").innerText = `Your Location: ${userLat}, ${userLon}`;

    // List of 5 predefined parking locations
    let parkingLocations = [
        { name: "Parking A", lat: 21.5278609, lon: 70.5010271 },
        { name: "Parking B", lat: 21.5194872, lon: 70.4512176 },
        { name: "Parking C", lat: 21.4967471, lon: 70.402476 },
        { name: "Parking D", lat: 21.5237466, lon: 70.435754 },
        { name: "Parking E", lat: 21.5022889, lon: 70.4252601 }
    ];

    // Find the nearest parking
    let nearestParking = findNearestParking(userLat, userLon, parkingLocations);

    if (nearestParking) {
        let parkingInfo = `${nearestParking.name} (Lat: ${nearestParking.lat}, Lon: ${nearestParking.lon})`;
        document.getElementById("parking-info").innerText = `Nearest Parking: ${parkingInfo}`;

        // Google Maps Direction URL
        let mapsUrl = `https://www.google.com/maps/dir/${userLat},${userLon}/${nearestParking.lat},${nearestParking.lon}`;

        // Open WhatsApp with the location & direction link
        let whatsappUrl = `https://wa.me/917623977045?text=My%20location%20is%20${userLat},%20${userLon}%0AClosest%20Parking:%20${nearestParking.name}%0ADirections:%20${encodeURIComponent(mapsUrl)}`;
        window.open(whatsappUrl, "_blank");
    } else {
        document.getElementById("parking-info").innerText = "No nearby parking found.";
    }
}

// Function to find the nearest parking spot
function findNearestParking(userLat, userLon, locations) {
    let minDistance = Number.MAX_VALUE;
    let nearest = null;

    locations.forEach(location => {
        let distance = getDistance(userLat, userLon, location.lat, location.lon);
        if (distance < minDistance) {
            minDistance = distance;
            nearest = location;
        }
    });

    return nearest;
}

// Function to calculate distance using Haversine Formula
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("status").innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("status").innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("status").innerText = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("status").innerText = "An unknown error occurred.";
            break;
    }
}
