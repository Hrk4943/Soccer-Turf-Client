import React, { useState } from 'react';
import { Axiosuser } from '../../../../API/AxiosInstance';
import { toast } from 'react-hot-toast'


const ReviewModal = ({ isOpen, toggle, id,refresh,setRefresh }) => {
    const [name, setName] = useState('')
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Axiosuser.post(`reviews`, { id, name, review, rating, });
            toggle();
            setRefresh(!refresh)
            toast.success("Review Submitted Successfully")
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            {isOpen ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Review & Ratings
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="review">
                                                Name
                                            </label>
                                            <input
                                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="name"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="rating">
                                                Rating
                                            </label>
                                            <select
                                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="rating"
                                                value={rating}
                                                required
                                                onChange={(e) => setRating(parseInt(e.target.value))}
                                            >
                                                <option value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-bold mb-2" htmlFor="review">
                                                Review
                                            </label>
                                            <textarea
                                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="review"
                                                rows="5"
                                                value={review}
                                                onChange={(e) => setReview(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="flex items-center justify-end">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={toggle}
                                            >
                                                Close
                                            </button>
                                            <button
                                                className=" bg-green-600 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}

        </>
    );
};

export default ReviewModal
