import { useEffect, useState } from "react";
// import { userUrl } from '../../../API/API'
// import axios from "axios";
// import Moment from 'react-moment';
import moment from 'moment';
import { Axiosuser } from "../../../API/AxiosInstance";
import toast from 'react-hot-toast'

// const Bookings = () => {


//   const [showBookings, setShowBookings] = useState(true);
//   const token = localStorage.getItem('userToken')
//   const [bookings, setBookings] = useState([]);
//   const [upcomingBooking, setUpcomingBookings] = useState([]);
//   const [previousBooking, setPreviousBookings] = useState([]);
//   const [refresh,setRefresh]=useState(false)
//   let today = new Date();
//   let month = String(today.getMonth() + 1).padStart(2, "0");
//   let day = String(today.getDate()).padStart(2, "0");
//   let year = today.getFullYear();
//   let formattedDate = day + "/" + month + "/" + year 
//   const todayDate = new Date(formattedDate);


//   const fetchBookings=async(token)=>{
//     try {
//       const headers = { authorization: token };
//       const response =await Axiosuser.get(`bookingList`, {headers})
//       if (response.status === 200) {
//         setBookings(response?.data);
//         const upcomingBooking = response?.data.filter((booking) => {
//           const bookedDate = new Date(booking.bookDate);
//           return bookedDate > today;
//         });
//         console.log(upcomingBooking,"upcoming");
//         setUpcomingBookings(upcomingBooking);
//         const previousBooking = response?.data.filter((booking) => {
//           const bookedDate = new Date(booking?.bookDate);
//           return bookedDate < today;
//         });
//         console.log(previousBooking,"preves");
//         setPreviousBookings(previousBooking);
//         setShowBookings(true);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(()=>{
//     fetchBookings(token)
//   },[token,refresh])






const Bookings = () => {
  const [showBookings, setShowBookings] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [upcomingBooking, setUpcomingBookings] = useState([]);
  const [previousBooking, setPreviousBookings] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const token = localStorage.getItem("userToken");

  const [searchDate, setSearchDate] = useState("");

  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = day + "/" + month + "/" + year;
  const todayDate = new Date(formattedDate);

  const fetchBookings = async (token) => {
    try {
      const headers = { authorization: token };
      const response = await Axiosuser.get(`bookingList`, { headers });
      if (response.status === 200) {
        setBookings(response?.data);
        const upcomingBooking = response?.data.filter((booking) => {
          const bookedDate = new Date(booking.bookDate);
          return bookedDate > today;
        });
        setUpcomingBookings(upcomingBooking);
        const previousBooking = response?.data.filter((booking) => {
          const bookedDate = new Date(booking?.bookDate);
          return bookedDate < today;
        });
        setPreviousBookings(previousBooking);
        setShowBookings(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookings(token);
  }, [token, refresh]);

  const cancelBooking = (bookingId) => {
    const headers = { authorization: token };
    Axiosuser.post(`cancelBooking`, { bookingId }, { headers })
      .then((response) => {
        toast.success(response.data.message);
        setRefresh(!refresh);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleSearchDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchDateObj = new Date(searchDate);
    const filteredBookings = bookings.filter((booking) => {
      const bookedDate = new Date(booking.bookDate);
      console.log(searchDate, "////")
      console.log(searchDateObj, "000000")
      return bookedDate.toDateString() === searchDateObj.toDateString();
    });
    setUpcomingBookings(filteredBookings.filter((booking) => booking.bookDate > today));
    setPreviousBookings(filteredBookings.filter((booking) => booking.bookDate < today));
    setShowBookings(false);
  };

  const handleClearSearch = () => {
    setSearchDate("");
    setShowBookings(true);
  };

  return (
    <>
      <div className="container p-20">

        <div className=" overflow-x-auto">
          <div>
            <h2 class="text-2xl font-semibold leading-tight text-center">Bookings</h2>
          </div>
          <form onSubmit={handleSearchSubmit}>
            <label>
              Search by date:
              <input type="date" value={searchDate} onChange={handleSearchDateChange} />
            </label>
            <button type="submit">Search</button>
            <button type="button" onClick={handleClearSearch}>Clear</button>
          </form>
          <table className="table w-full border-2 border-slate-950">
            <thead>
              <tr>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  BookingID
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Turf
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Time
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Action
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                ></th>
              </tr>

            </thead>
            <tbody>
              {searchDate.length === 0 ? (
                <>
                  {showBookings ? (
                    <>
                      {upcomingBooking.map((booking, index) => (
                        <tr key={index}>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">{booking?._id}</p>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">{booking?.turf?.courtName}</p>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {moment(booking?.bookDate).format('DD-MM-YYYY')}
                              {/* {new Date(booking?.bookDate).toLocaleDateString()} */}
                            </p>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">{booking?.time}</p>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {" "}
                            {/* {booking.payment === "Success" ? (
                        <button className="btn-success p-2">
                          {booking?.payment}
                        </button>
                      ) : (
                        <button className="btn-warning p-2">
                          {booking?.payment}
                        </button>
                      )} */}
                            <p className="btn-warning p-2">
                              {booking?.payment}
                            </p>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {" "}
                            {booking.payment === 'Success' ? (
                              <button className="btn-warning p-2"
                                onClick={() => { cancelBooking(booking?._id) }}
                              >
                                Cancel Booking
                              </button>
                            ) :
                              (
                                <button className="btn-warning p-2">
                                  Cancelled
                                </button>
                              )}
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      {previousBooking.map((booking, index) => (
                        <tr key={index}>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">{booking?._id}</p>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">{booking?.turf?.courtName}</p>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                              {/* <Moment format="YYYY/MM/DD">
                booking?.bookDate
            </Moment> */}
                              {moment(booking?.bookDate).format('DD-MM-YYYY')}
                              {/* {new Date(booking?.bookDate).toLocaleDateString()}
                          */}
                            </p>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">{booking?.time}</p>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {" "}
                            {/* {booking.payment === "Success" ? (
                        <button className="btn-success p-2">
                          {booking?.payment}
                        </button>
                      ) : (
                        <button className="btn-warning p-2">
                          {booking?.payment}
                        </button>
                      )} */}
                            <p className="btn-warning p-2">
                              {booking?.payment}
                            </p>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {" "}
                            {booking.payment === 'Success' ? (
                              <button className="btn-warning p-2"
                                onClick={() => { cancelBooking(booking?._id) }}
                              >
                                Cancel Booking
                              </button>
                            ) :
                              (
                                <button className="btn-warning p-2">
                                  Cancelled
                                </button>
                              )}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </>
              ) : (
                searchDate.map((booking, index) => (
                  <tr key={index}>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap">{booking?._id}</p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap">{booking?.turf?.courtName}</p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap">
                        {/* <Moment format="YYYY/MM/DD">
            booking?.bookDate
        </Moment> */}
                        {moment(booking?.bookDate).format('DD-MM-YYYY')}
                        {/* {new Date(booking?.bookDate).toLocaleDateString()}
                      */}
                      </p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p class="text-gray-900 whitespace-no-wrap">{booking?.time}</p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {" "}
                      {/* {booking.payment === "Success" ? (
                    <button className="btn-success p-2">
                      {booking?.payment}
                    </button>
                  ) : (
                    <button className="btn-warning p-2">
                      {booking?.payment}
                    </button>
                  )} */}
                      <p className="btn-warning p-2">
                        {booking?.payment}
                      </p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {" "}
                      {booking.payment === 'Success' ? (
                        <button className="btn-warning p-2"
                          onClick={() => { cancelBooking(booking?._id) }}
                        >
                          Cancel Booking
                        </button>
                      ) :
                        (
                          <button className="btn-warning p-2">
                            Cancelled
                          </button>
                        )}
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
          {showBookings ? (
            <button
              className="btn btn-border-2 float-right mt-5"
              onClick={() => setShowBookings(false)}
            >
              Upcoming Bookings
            </button>
          ) : (
            <button
              className="btn btn-border-2 float-right mt-5"
              onClick={() => setShowBookings(true)}
            >
              Current Bookings
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Bookings;
