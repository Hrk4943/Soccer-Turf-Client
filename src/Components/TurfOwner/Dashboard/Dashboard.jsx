import { useEffect, useState } from "react";
// import LineGraph from "./Chart";
// import {turfOwnerUrl} from '../../../API/API'
// import axios from "axios";
import { AxiosTurfOwner } from "../../../API/AxiosInstance";
import Barchart from "./BarChart";
import CountStatus from "./Counts";


const Dashboard = () => {
    const token = localStorage.getItem('turfToken');
    const [data, setData] = useState([]);
    const [counts, setCounts] = useState("");
    
    const fetchData = async () => {
      try {
        const headers = { authorization: token }
        const response = await AxiosTurfOwner.get(`getCounts`, {headers});
        // const result = await axios.get(`${turfOwnerUrl}bookings`, {headers});
        if (response.status === 200) {
          setCounts(response.data); 
          setData(response.data.dayWiseBookings)
        }
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);
 
   
  return (
    <div>
      <CountStatus counts={counts}  />
      <div className="flex justify-between ">
        <Barchart  data={data}  />
        {/* <LineGraph data={data} /> */}
        
      </div>
    </div>
  );
};
export default Dashboard;
