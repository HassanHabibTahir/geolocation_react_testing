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
import userIcon from "../map/constant";
import {getUsers} from '../service/api'


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

export const AllUser = () => {
    const dispatch = useDispatch();
    const [loc, updLoc] = useState();
    const [search, updSearch] = useState();
    const [users, setUsers] = useState([]);
    const [locationData, setLocationData] = useState([]);
    useEffect(() => {
        // console.log('clicked')
        getalluser();
      }, []);
    // console.log(users,"users")
      const getalluser = async () => {
        try{
    
          let response = await getUsers();
          setUsers(response.data);
        }
        catch(error){
          console.error(error)
        }
      };
    
console.log("all User From Mongo ", users)

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

  return (
 <>
 <div className="">
    All user Show in this map 
    <div className="w-[80%] mx-auto">
    <MapContainer
        center={loc || { lat: 0, lng: 0 }}
        zoom={loc ? 12 : 2}
        zoomControl={false}
        style={{ height: "80vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=o3GZ6RYoztYy06uz2mmf"
        />
        {cities.map((city, idx) => (
          <Marker position={[city.lat, city.lng]} icon={markerIcon} key={idx}>
            <Popup>
              <b>
                {city.city}, {city.country}
              </b>
            </Popup>
          </Marker>
        ))}

        <LocationMarker setLocationData={setLocationData}/>
        <Test location={loc} search={search} />
      </MapContainer>
      <div className=" space-y-3 flex flex-col">
        {loc?.lat},{loc?.lng}
        <input
          className="p-2 my-3"
          placeholder="№,street,zip,city,country"
          onChange={(e) => updSearch(e.target.value)}
          
        />
      </div>
    </div>


 </div>
 
 </>
  )
}



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


