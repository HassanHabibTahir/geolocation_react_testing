import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

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
var blueIcon = new L.Icon({
  iconUrl:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJG4hSO5vWnM_GYhthtR3b2M7O3i6zeewzlA&usqp=CAU",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
 export const createRoutineMachineLayer = ({ waypoints}) => {
    
  const instance = L.Routing.control({
    position:"topleft",
    waypoints,
    createMarker: function (i, wp, nWps) {
      console.log("sdafsda", wp);
      if (i === 0 || i === nWps - 1) {
        // here change the starting and ending icons
        return L.marker(wp.latLng, {
          draggable: true,
          icon: greenIcon, // here pass the custom marker icon instance
        }).bindPopup(
      "  hello i am "
        
        );
      } else {
        // here change all the others
        return L.marker(wp.latLng, {
          icon: blueIcon,
        });
      }
    },

    lineOptions: {
      styles: [
        {
          color: "red",
        },
      ],
    },
    routeLine: function (route) {
        var line = L.Routing.line(route);
        // setEnd([line._route.inputWaypoints[1].latLng.lat, line._route.inputWaypoints[1].latLng.lng]  )
        console.log("this is actual line", line);
        return line;
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
