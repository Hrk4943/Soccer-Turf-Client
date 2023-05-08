import { useEffect, useState } from "react";
import moment from 'moment';
import { Axiosuser } from "../../../API/AxiosInstance";
import toast from 'react-hot-toast'


const Bookings = () => {
  const [showBookings, setShowBookings] = useState(true);
  const token = localStorage.getItem("userToken");
  const [bookings, setBookings] = useState([]);
  const [upcomingBooking, setUpcomingBookings] = useState([]);
  const [previousBooking, setPreviousBookings] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [searchDate, setSearchDate] = useState("");


  let today = new Date();
  let month = String(today.getMonth() + 1).padStart(2, "0");
  let day = String(today.getDate()).padStart(2, "0");
  let year = today.getFullYear();
  let formattedDate = day + "/" + month + "/" + year;
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
    Axiosuser.post(
      `cancelBooking`,
      { bookingId },
      { headers }
    )
      .then((response) => {
        toast.success(response.data.message);
        setRefresh(!refresh);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const searchBookings = (e) => {
    e.preventDefault();
    const filteredBookings = bookings.filter((booking) => {
      const bookedDate = new Date(booking.bookDate);
      return (
        bookedDate.getTime() >= new Date(searchDate).getTime() &&
        bookedDate.getTime() <= new Date(searchDate).getTime() + 86400000
      ); //86400000 is the number of milliseconds in a day
    });
    setUpcomingBookings(filteredBookings);
    setPreviousBookings([]);
  };


  return (
    <>
      <div className="container p-20">

        <div className=" overflow-x-auto">
          <div>
            <h2 class="text-2xl font-semibold leading-tight text-center">Bookings</h2>
          </div>
          <form onSubmit={searchBookings}>
            <label htmlFor="searchDate">Search by date:</label>
            <input
              type="date"
              id="searchDate"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
            <button type="submit" className="bg-green-300	 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
              Search
            </button>
          </form>
          <table className="table w-full border-2 border-slate-950">
            <thead>
              <tr>
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

              {showBookings ? (
                <>
                  {upcomingBooking.map((booking, index) => (
                    <tr key={index}>
                      {/* <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">{booking?._id}</p>
                      </td> */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">{booking?.turf?.courtName}</p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {moment(booking?.bookDate).format('DD-MM-YYYY')}
                        </p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">{booking?.time}</p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {" "}
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
                      {/* <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">{booking?._id}</p>
                      </td> */}
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">{booking?.turf?.courtName}</p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                          {moment(booking?.bookDate).format('DD-MM-YYYY')}
                        </p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">{booking?.time}</p>
                      </td>
                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {" "}
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
