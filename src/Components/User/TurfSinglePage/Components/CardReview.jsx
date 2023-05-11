import React, { useEffect, useState } from 'react';
import { Axiosuser } from '../../../../API/AxiosInstance';
import './CardReview.css'


const CardReview = ({ id,refresh }) => {
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async (id) => {
        try {
            const response = await Axiosuser.get(`getReviews/${id}`)
            setReviews(response.data.reviews)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchReviews(id)
    }, [refresh])

    return (
        <>
         <p className=" font-sans text-center text-1xl md:text-2xl lg:text-3xl font-bold mb-6">Reviews</p>
            <div className="flex flex-col bg-white m-auto p-auto    ">
            <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
                    <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 review-cards ">
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div key={index} className="mr-20 mx-auto w-56 text-center my-4 bg-white rounded-lg shadow-lg">
                                    <div className="px-6 py-4">
                                        <div className="font-medium text-xl mb-2">{review.name}</div>
                                        <p className="text-gray-700 italic text-base">{review.review}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No reviews available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default CardReview;
