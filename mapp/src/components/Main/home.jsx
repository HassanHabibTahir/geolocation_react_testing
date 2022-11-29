import React from "react";


import L from "leaflet";
import { CurrentLocation } from "../map/currentLocation";

import { Registration } from "../auth/registration";

import { Drawr } from "../drawr/drawr";

import Map from "../map/Map";

export const Home = () => {
  return (
    <>
      <div className="w-full ">
        <div className="w-[90%] mx-auto flex justify-center items-center bg-[#F8FAFC]">
          <div className="w-[80%] h-[550px]  p-5">
            Click on Map to Add Current Location
            
            {/* <CurrentLocation /> */}
            <Map/>
            {/* <Drawr/> */}
           
          
          </div>
          <div className="w-[50%]">
            {/* <Registration /> */}
          </div>
        </div>
      </div>
    </>
  );
};
