import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import cities from "../cites/city.json";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/from/formSlice";

// import "./styles.css";
import userIcon from "./constant";

function Test({ location, search }) {
  const map = useMap();
  if (location) map.flyTo(location, 12);

  return location ? (
    <Marker
      draggable
      position={location}
      //ref={markerRef}
      icon={userIcon}
    >
      <Popup>You are here: {search}</Popup>
    </Marker>
  ) : null;
}
const markerIcon = new L.Icon({
  iconUrl: require("../../images/location.png"),
  iconSize: [30, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});
const markerIcon2 = new L.Icon({
  iconUrl: require("../../images/l1.png"),
  iconSize: [30, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});
function LocationMarker({setLocationData}) {
  const [position, setPosition] = useState(null);
  // console.log("stPosition", position)
  const ZOOM_LEVEL = 15;
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      setLocationData(e.latlng)
      map.flyTo(e.latlng, ZOOM_LEVEL);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={markerIcon2}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export const CurrentLocation = () => {
  const dispatch = useDispatch();
  const [loc, updLoc] = useState();
  const [search, updSearch] = useState();
  const [locationData, setLocationData] = useState([]);
  // console.log("location GEt From ====>>", locationData)
  // console.log("both locations", loc);
useEffect(()=>{


},[])
  useEffect(() => {
    const geocoder = L.Control.Geocoder.nominatim();
    if (search)
      geocoder.geocode(search, (results) => {
        //console.log(results);
        var r = results[0];
        if (r) {
          const { lat, lng } = r?.center;
          updLoc({ lat, lng });
          setLocationData({lat,lng})
          
          //console.log(r);
        }
      });
  }, [search]);

  dispatch(addTodo({ task: locationData }));

  return (
    <>
      <MapContainer
        center={loc || { lat: 0, lng: 0 }}
        zoom={loc ? 12 : 2}
        zoomControl={false}
        style={{ height: "60vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=o3GZ6RYoztYy06uz2mmf"
        />
        {/* {cities.map((city, idx) => (
          <Marker position={[city.lat, city.lng]} icon={markerIcon} key={idx}>
            <Popup>
              <b>
                {city.city}, {city.country}
              </b>
            </Popup>
          </Marker>
        ))} */}

        <LocationMarker setLocationData={setLocationData}/>
        <Test location={loc} search={search} />
      </MapContainer>
      <div className=" space-y-3 flex flex-col">
       <p className="my-2">Add Manually Location</p>
        {/* {loc?.lat},{loc?.lng} */}
        <input
          className="p-2 my-3"
          placeholder="№,street,zip,city,country"
          onChange={(e) => updSearch(e.target.value)}
          
        />
      </div>
    </>
  );
};
