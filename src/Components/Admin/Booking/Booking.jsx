import React from "react";
import { adminUrl } from "../../../API/API";
import axios from 'axios'
import { useState, useEffect } from "react";


const Booking = () => {
  const token = localStorage.getItem('adminToken')
  const [reports, setReports] = useState([])

  const fetchReport = async (token) => {
    try {
      const headers = { authorization: token }
      const response = await axios.get(`${adminUrl}booking`, { headers });
     console.log(response.data)
      setReports(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReport(token);
  }, []);
  return (
    <>
    <div className='container p-32  '>

<div className=" overflow-x-auto ">
    <div>
        <h2 class="text-2xl font-semibold leading-tight  text-center">Sales Report</h2>
    </div>
    <table className=" table w-full border-2 border-slate-950">
        <thead>
            <tr>
                <th
                    class=" text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                    Turfs
                </th>
                <th
                    class="text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                    Total Amount
                </th>
                <th
                    class=" text-center px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                    Bookings
                </th>
                <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                ></th>
            </tr>

        </thead>
        <tbody>
        {reports.map((data,index) => (
            <tr className="text-center" key={index}>
              {/* <th>{turfName}</th>
              <td>{totalPrice}</td>
              <td>{totalBookings}</td> */}
               <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">{data.name}</p>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">{data.totalPrice}</p>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">{data.totalBookings}</p>
                            </td>
            </tr>
          ))}
        </tbody>
    </table>
    
</div>
</div>
    </>
    // <div className="overflow-x-auto pt-20">
    //   <table className="table w-full">
    //     <thead>
    //       <tr className="text-center">
    //         <th>Turf</th>
    //         <th>Total Amount</th>
    //         <th>Total Bookings</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //     {Object.entries(reports).map(([turfName, { totalBookings, totalPrice }], index) => (
    //         <tr className="text-center" key={index}>
    //           <th>{turfName}</th>
    //           <td>{totalPrice}</td>
    //           <td>{totalBookings}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
};
export default Booking;
