import React from "react";
import { 
    BarChart, 
    CartesianGrid, 
    XAxis,
    ResponsiveContainer, 
    YAxis, 
    Tooltip, 
    Bar 
} from "recharts";
// const count1 = [
//   {name:"dasfas",totalBookings:4},{name:"hrithik",totalBookings:7}
// ]
const Barchart = ({ data }) => {
  const chartData = data.map((item) => ({
    name: item.name,
    totalBookings: item.totalBookings,
  }));
  

  return (
    <div className="sm:p-10 w-full ">
         <h3 className="text-blue-700 text-3xl font-bold text-center my-5 pl-8 sm:pl-20">
         Monthly Bookings
         </h3>
         <ResponsiveContainer width="100%" height={370}>
    <BarChart 
    // width={600} height={300} 
    data={chartData}
    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="totalBookings" barSize={50} fill="#8884d8" />
    </BarChart>
         </ResponsiveContainer>
         </div>
  );
};

export default Barchart;















// import {
//     Bar,
//     BarChart,
//     CartesianGrid,
//     Legend,
//     ResponsiveContainer,
//     Tooltip,
//     XAxis,
//     YAxis,
//   } from "recharts";
  
//   const Barchart = ({ data }) => {
//     return (
//       <div className="sm:p-10 w-full ">
//         <h3 className="text-blue-700 text-3xl font-bold text-center my-5 pl-8 sm:pl-20">
//         Monthly Bookings
//         </h3>
//         <ResponsiveContainer width="100%" height={370}>
//           <BarChart
//             data={data}
//             margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="count" barSize={35} stackId="a" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   };
//   export default Barchart;
  