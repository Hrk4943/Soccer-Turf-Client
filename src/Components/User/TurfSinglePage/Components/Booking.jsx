import { loadStripe } from '@stripe/stripe-js'
import { useNavigate } from "react-router-dom";
import { getTimeSlot } from "./TimeSlot";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import axios from "axios";
import { userUrl } from "../../../../API/API";
import { stripeKey } from '../../../../Helpers/StripeKey.js';

const Booking = ({ ID, openingTime, closingTime, setShowCalender }) => {
    const token = localStorage.getItem('userToken')
    const [date, setDate] = useState(new Date());
    const [bookedTime, setBookedTime] = useState([]);
    const Navigate = useNavigate();
    const stripePromise = loadStripe(
        `${stripeKey}`
    );
    const Time = async (time) => {
        if (!token) return Navigate("/login");
        try {
            const response = await axios.post(
                `${userUrl}booking`,
                { ID, date, time },
                { headers: { authorization: token } }
            );
            if (response && response.status === 200) {
                const stripe = await stripePromise;
               
                const result = await axios.get(`${userUrl}payment/${response.data._id}`);
            
                if (result && result.status === 200) {
                    await stripe.redirectToCheckout({ sessionId: result.data.response });
                }
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleTimeClick = async (time) => {
        await Time(time);
        await getSlots(date, time);
    };
    const slots = getTimeSlot(openingTime, closingTime, 60);
    const getSlots = async (date) => {
        try {
            const response = await axios.get(`${userUrl}bookingslots/${date}/${ID}`)
            if (response.status === 200) {
                console.log(response?.data);
                const bookedTimes = response?.data.map((x) => x.time);
                console.log(bookedTimes,"bookedTimes");
                setBookedTime(bookedTimes);
                console.log(bookedTime,"booooooded")
            }
        } catch (error) {
            console.error(error)
        }
    };
    const isDateDisabled = ({ date }) => {
        return date.getDay() === 0;
    };
    const today = new Date();
    const maxDate = new Date(
        today.getFullYear() + 1,
        today.getMonth() - 1,
        today.getDate()
    );

    const currentTime = new Date().getTime();

    useEffect(() => {
        ID && getSlots(date);
    }, [ID, date]);

    return (
        <>
            <section class="text-gray-600 body-font">
                <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                    <h2 className="font-sans font-bold p-5">Select Date</h2>

                    <Calendar
                        maxDate={maxDate}
                        tileDisabled={isDateDisabled}
                        minDate={new Date()}
                        onChange={setDate}
                    />
                    <div class="text-center lg:w-2/3 w-full">
                        <h2 className="font-sans font-bold p-5">Select Your Slots</h2>
                        <div class="flex justify-center flex-wrap">
                            {slots.map((time, index) => (
                                <div className="flex justify-center" key={index}>
                                    <div className="m-4">
                                        {new Date(`${date.toDateString()} ${time}`).getTime() < currentTime ? (
                                            <button
                                                type="button"
                                                className="px-8 py-3 font-semibold rounded-full bg-gray-500 text-white"
                                                disabled
                                            >
                                                {time}
                                            </button>
                                        ) : bookedTime.includes(time)? (
                                            <button
                                                type="button"
                                                className="px-8 py-3 font-semibold rounded-full bg-red-500 text-white"
                                                disabled
                                            >
                                                Booked

                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleTimeClick(time)}
                                                className="px-8 py-3 font-semibold rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                                            >
                                                {time}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowCalender(false)}
                            className="px-8 py-3 font-semibold rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mt-5"
                        >
                            Go Back
                        </button>
                        {bookedTime.length === slots.length && (
                            <p className="text-red-500 font-medium mt-4">
                                Sorry, all slots for this date are already booked.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};
export default Booking;
