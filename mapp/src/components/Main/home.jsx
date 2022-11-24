import React from "react";


import L from "leaflet";
import { CurrentLocation } from "../map/currentLocation";

import { Registration } from "../auth/registration";
export const Home = () => {
  return (
    <>
      <div className="w-full ">
        <div className="w-[90%] mx-auto flex justify-center items-center bg-[#F8FAFC]">
          <div className="w-[40%] h-[550px]  p-5">
            Click on Map to Add Location in
            <CurrentLocation />
          </div>
          <div className="w-[50%]">
            <Registration />
          </div>
        </div>
      </div>
    </>
  );
};
