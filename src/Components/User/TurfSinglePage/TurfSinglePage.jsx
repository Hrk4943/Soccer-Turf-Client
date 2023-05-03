// import React from 'react'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import { Axiosuser } from "../../../API/AxiosInstance";
// import { userUrl } from '../../../API/API';
// import axios from 'axios';
import "react-calendar/dist/Calendar.css";
import Booking from "./Components/Booking";
import ImageManage from './Components/ImageManage';


export default function TurfSinglePage() {
  const Location = useLocation();
  const ID = Location.state;
  const [data, setData] = useState({});
  // console.log(data);
  const [showCalender, setShowCalender] = useState(false);

  const fetchTurf = async (ID) => {
    try {
      await Axiosuser.get(`viewTurf/${ID}`).then((response) => {
        response.status === 200
        setData(response.data.turf);

      })

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTurf(ID);
  }, []);
  return (
    <>
      <section className="text-gray-600 body-font">
        {showCalender ? (
          <Booking
            closingTime={data.closingTime}
            openingTime={data.openingTime}
            ID={data._id}
            setShowCalender={setShowCalender}
          />
        ) : (
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-5 py-24">
            <div className="md:w-1/2 mb-10 md:mb-0">
              {/* <img
                className="w-full rounded object-cover object-center"
                alt="hero"
                src={data?.images?.[0]}
              /> */}
              <ImageManage photos={data?.images}/>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <h1 className="text-3xl flex justify-center items-center sm:text-4xl font-medium text-gray-900 mb-4">
                <span className="font-bold">{data?.courtName}</span>
              </h1>
              <span className=" flex justify-center items-center text-gray-600 p-1">{data?.sportsEvent}</span>
              <span className=" flex justify-center items-center text-gray-600 p-1">{data?.number}</span>
              <span className=" flex justify-center items-center text-gray-600 p-1">{data?.location}</span>
              <span className=" flex justify-center items-center text-gray-600 p-1">{data?.district}</span>
              <span className=" flex justify-center items-center text-gray-600 p-1">{data?.state}</span>
              <h3 className="text-2xl font-semibold flex justify-center items-center p-2">₹{data?.price}</h3>
              <div className="flex justify-center items-center mb-4">
                <button
                  className="px-6 py-2 text-lg font-bold rounded-md text-white bg-indigo-500 hover:bg-indigo-600 border-none focus:outline-none"
                  onClick={() => setShowCalender(true)}
                >
                  Book Now
                </button>

              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
