import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { turfOwnerUrl } from '../../../API/API';
import Nav from '../../../Components/TurfOwner/Layout/Nav';

export default function Bookings() {


    const token = localStorage.getItem('turfToken')
    const [booking, setBookings] = useState([]);
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [previousBookings, setPreviousBookings] = useState([]);
    const [showBookings, setShowBookings] = useState(true);

    let today = new Date();
    let month = String(today.getMonth() + 1).padStart(2, "0");
    let day = String(today.getDate()).padStart(2, "0");
    let year = today.getFullYear();
    let formattedDate = month + "/" + day + "/" + year;

    const todayDate = new Date(formattedDate);


    const fetchBookings = async (token) => {
        try {
            const headers = { authorization: token }
            const response = await axios.get(`${turfOwnerUrl}bookings`, { headers });
            if (response.status === 200) {
                setBookings(response?.data);
                const upcomingBooking = response?.data.filter((booking) => {
                    const bookedDate = new Date(booking?.bookDate);
                    return bookedDate > todayDate;
                });
                setUpcomingBookings(upcomingBooking);

                const previousBooking = response?.data.filter((booking) => {
                    const bookedDate = new Date(booking?.bookDate);
                    return bookedDate < todayDate;
                });
                setPreviousBookings(previousBooking);
                setShowBookings(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // const fetchBookings = async (token) => {
    //     try {
    //         const headers = { authorization: token }
    //         await axios.get(`${turfOwnerUrl}bookings`, { headers }).then((response) => {
    //             setBooking(response.data.bookingDetails.bookings)
    //         })
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    useEffect(() => {
        fetchBookings(token);
    }, []);


    return (
        <>
            <Nav />
            <div class="container mx-auto px-4 sm:px-8">
                <div class="py-8">
                    <div>
                        <h2 class="text-2xl font-semibold leading-tight">Bookings</h2>
                    </div>
                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div
                            class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                        >
                            <table class="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            UserName
                                        </th>
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                        >
                                            BookingID
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
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showBookings ? (
                                        <>
                                            {upcomingBookings.map((booking, index) => (
                                                <tr key={index}>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">{booking?._id}</p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">{booking?.turf?.courtName}</p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">{new Date(booking?.bookDate).toLocaleDateString()}</p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">{booking?.time}</p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        {" "}
                                                        {booking.payment === "Success" ? (
                                                            <button className="btn-success p-2">
                                                                {booking?.payment}
                                                            </button>
                                                        ) : (
                                                            <button className="btn-warning p-2">
                                                                {booking?.payment}
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            {previousBookings.map((booking, index) => (
                                                <tr key={index}>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">{booking?._id}</p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">{booking?.turf?.courtName}</p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">{new Date(booking?.bookDate).toLocaleDateString()}</p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">{booking?.time}</p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        {" "}
                                                        {booking.payment === "Success" ? (
                                                            <button className="btn-success p-2">
                                                                {booking?.payment}
                                                            </button>
                                                        ) : (
                                                            <button className="btn-warning p-2">
                                                                {booking?.payment}
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    )}

                                    {/* <>
                                        {booking.map((booked, index) => (
                                            <tr key={index}>
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div class="flex">

                                                        <div class="ml-3">
                                                            <p class="text-gray-900 whitespace-no-wrap">
                                                                {booked?.user?.name}
                                                            </p>
                                                            <p class="text-gray-600 whitespace-no-wrap"></p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p class="text-gray-900 whitespace-no-wrap">{booked?._id}</p>
                                                </td>
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p class="text-gray-900 whitespace-no-wrap">{new Date(booked?.bookDate).toLocaleDateString()}</p>
                                                </td>
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p class="text-gray-900 whitespace-no-wrap">{booked?.time}</p>
                                                </td>
                                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    {" "}
                                                    {booked.payment === "Success" ? (
                                                        <button className="btn-success p-2">
                                                            {booked?.payment}
                                                        </button>
                                                    ) : (
                                                        <button className="btn-warning p-2">
                                                            {booked?.payment}
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </> */}
                                </tbody>
                            </table>
                            {showBookings ? (
                                <>
                                    {upcomingBookings.map((booking, index) => (
                                        <tr key={index}>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">{booking?._id}</p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">{booking?.turf?.courtName}</p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">{new Date(booking?.bookDate).toLocaleDateString()}</p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">{booking?.time}</p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                {" "}
                                                {booking.payment === "Success" ? (
                                                    <button className="btn-success p-2">
                                                        {booking?.payment}
                                                    </button>
                                                ) : (
                                                    <button className="btn-warning p-2">
                                                        {booking?.payment}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {previousBookings.map((booking, index) => (
                                        <tr key={index}>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">{booking?._id}</p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">{booking?.turf?.courtName}</p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">{new Date(booking?.bookDate).toLocaleDateString()}</p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">{booking?.time}</p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                {" "}
                                                {booking.payment === "Success" ? (
                                                    <button className="btn-success p-2">
                                                        {booking?.payment}
                                                    </button>
                                                ) : (
                                                    <button className="btn-warning p-2">
                                                        {booking?.payment}
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
