window.mapInterop = {
    map: null,

    initMap: function (locations) {
        if (!window.L) {
            console.error("Leaflet has not loaded.");
            return;
        }

        const mapElement = document.getElementById("memory-map");

        if (!mapElement) {
            console.error("Map element not found.");
            return;
        }

        if (this.map) {
            this.map.remove();
            this.map = null;
        }

        this.map = L.map("memory-map", {
            center: [48.0, 10.0],
            zoom: 4
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors"
        }).addTo(this.map);

        locations.forEach(loc => {
            const marker = L.circleMarker([loc.latitude, loc.longitude], {
                radius: 10,
                fillColor: "#c17f5a",
                color: "#fff",
                weight: 2,
                opacity: 1,
                fillOpacity: 0.9
            }).addTo(this.map);

            marker.bindPopup(`
                <div style="font-family: Georgia, serif; min-width: 160px;">
                    <div style="font-size: 1.5rem; text-align: center;">${loc.emoji}</div>
                    <div style="font-weight: bold; color: #4a3728; font-size: 1rem; text-align: center; margin-top: 4px;">${loc.name}</div>
                    <div style="color: #9c7b6b; font-size: 0.8rem; text-align: center;">${loc.country}</div>
                    <div style="color: #4a3728; font-size: 0.85rem; margin-top: 8px; text-align: center;">${loc.description}</div>
                </div>
            `);
        });
    }
};