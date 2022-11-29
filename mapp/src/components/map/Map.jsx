import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import {
  TileLayer,
  MapContainer,
  LayersControl,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
// import { Button } from "@material-ui/core";
import "leaflet-area-select";
import "leaflet/dist/leaflet.css";
import RoutingControl from "./RoutingControl";
import LongMenu from "./manu";
import AreaSelect from "./areaSelect";

var greenIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

function LocationMarker({ setLocationData }) {
  const [position, setPosition] = useState(null);
  // console.log("stPosition", position)
  const ZOOM_LEVEL = 15;
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      // setLocationData(e.latlng)
      map.flyTo(e.latlng, ZOOM_LEVEL);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={greenIcon}>
      <Popup>Your location</Popup>
    </Marker>
  );
}

const inputValue = {
  dstart: "",
  dend: "",
};

const Map = () => {
  const points1 = [
    [33.52001088075479, 36.26829385757446],
    [33.50546582848033, 36.29547681726967],
  ];

  const points2 = [
    [33.53001088075479, 36.26829385757446],
    [33.50546582848033, 36.29547681726967],
  ];

  const rMachine = useRef();
  const [points, setPoints] = useState(true);
  
  const [map, setMap] = useState(null);
  const [start, setStart] = useState([31.5204, 74.3587]);
  const [end, setEnd] = useState([31.4504, 73.135]);
  const [search, setSearch] = useState("");
  const [destination, setDestionation] = useState("");
  const [direction, setDirection] = useState();
  const [endDirection, setEndDirection] = useState();
  
  const pointsToUse = [start, end];
  console.log("start ", start);
  console.log("End ", end);

  const [mylocation, setMylocation] = useState(true);

  console.log("befor useEfface", search);

  useEffect(() => {
    if (rMachine.current) {
      console.log(rMachine.current);
      rMachine.current.setWaypoints(pointsToUse);
    }
  }, [pointsToUse, rMachine]);

  useEffect(() => {
    const geocoder = L.Control.Geocoder.nominatim();
    if (search)
      geocoder.geocode(search, (results) => {
        // console.log(" multan result >>>> ",results);
        var r = results[0];
        if (r) {
          const { lat, lng } = r?.center;

          // console.log("latitude",lat,lng)
          setStart([lat, lng]);
          // setLocationData({lat,lng})
        }
      });

    if (destination)
      geocoder.geocode(destination, (results) => {
        // console.log("lahore result >>>> ",results);
        var r = results[0];
        if (r) {
          const { lat, lng } = r?.center;
          setEnd([lat, lng]);

          // console.log("this is latlong",lat,lng)
          // setEnd( [lat, lng] );
          // setLocationData({lat,lng})
        }
      });
  }, [search, destination]);

  // console.log("get directioin form useEfffect",sDirection)

  return (
    <>
      <div className=" p-2 my-2 bg-slate-400 border border-black space-y-0">
        <button
          onClick={() => setMylocation((s) => !s)}
          className="p-2 border border-black"
        >
          Menu
        </button>
        <br />
        {/* <LongMenu/> */}

        {mylocation ? (
          <>
            <div className=""> Click on map to get your current location </div>
          </>
        ) : (
          <>
            <div className=" flex justify-center items-center space-x-3">
              <p className="text-xl font-normal">Direction</p>
              <input
                placeholder="Enter Addres"
                name="search"
                type="text"
                className="p-1 "
                onChange={(e) => setSearch(e.target.value)}
              />
              <input
                placeholder="Enter Addres"
                name="destination"
                type="text"
                onChange={(e) => setDestionation(e.target.value)}
                className="p-1"
              />
              <button onClick={() => setPoints(!points)}>Togle</button>
            </div>
          </>
        )}
      </div>
      <MapContainer
        center={[37.0902, -95.7129]}
        zoom={3}
        zoomControl={false}
        style={{ height: "100vh", width: "100%", padding: 0 }}
        whenCreated={(map) => {
          map.on("click", function (e) {
            alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
          });
          map.on('areaselected', (e) => {
            // console.log("main component",e.bounds.toBBoxString()); // lon, lat, lon, lat
            alert("main component",e.bounds.toBBoxString())
          });
        }}
      >
     
        {/* *************** */}
        {/* Pass in our custom control layer here, inside of the map container */}
        {/* *************** */}

        {mylocation ? (
          ""
          ) : (
            <>
            <RoutingControl ref={rMachine} waypoints={pointsToUse}
            
            >
             {/* <button 
             onClick={() => setPoints(!points)}
      
      style={{backgroundColor:"red"}}>
        Toggle Points State and Props
      </button> */}



            </RoutingControl>

          </>
        )}
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <AreaSelect/>

            {mylocation ? (
              <>
                <LocationMarker />
              </>
            ) : (
              ""
            )}
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </>
  );
};

export default Map;
