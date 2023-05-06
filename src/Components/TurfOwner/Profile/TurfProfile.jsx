import { useEffect, useState } from "react";
// import axios from 'axios'
// import { turfOwnerUrl } from '../../../API/API'
import { AxiosTurfOwner } from "../../../API/AxiosInstance";
import Carousel from "./Carousel";
import { toast } from "react-hot-toast";



const TurfPorfile = () => {
    const token = localStorage.getItem('turfToken')
    const [data, setData] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [image,setImage]=useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = { authorization: token }
                const response = await AxiosTurfOwner.get(`profile`, { headers });
                setData(response?.data?.turf);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [image]);

    const updateData = async () => {
        try {
            const headers = { authorization: token }

            console.log(image);
            const response = await AxiosTurfOwner.put(`updateProfile`,{data,image},)
            toast.success(response.data.message)
            setEditMode(false);
        } catch (error) {
            console.error(error);
        }
    };
    const handleimage = async (e) => {
        const files = e.target.files
        const imagesArray = [];
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = () => {
            const base64s = reader.result;
            imagesArray.push(base64s);
            setImage(imagesArray)
          }
    
        }
      }

    
    return (
        <section className="body-font text-gray-600">
            <div className="container mx-auto flex flex-col items-center justify-center px-5 py-24">
                <Carousel images={data?.images} />
                {editMode?(
                    <input
                    type="file"
                  placeholder="Image*"
                  onChange={handleimage}
                //   onChange={(e) =>
                //     setData((prevData) => ({
                //         ...prevData,
                //         image: e.target.value,
                //     }))
                // }
                  multiple
                />
                ):null}
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4 py-5">
                    {data?.courtName}
                </h1>
                <div className="-mx-2 flex flex-wrap sm:mx-auto sm:mb-2 lg:w-4/5">
                    <div className="w-full p-2 sm:w-1/2">
                        <div className="flex h-full items-center rounded bg-gray-100 p-4">
                            <div className="flex">
                                <label htmlFor="" className="font-medium">
                                    Location:{" "}
                                </label>
                                {editMode ? (
                                    <input
                                        className="px-3 bg-gray-100  "
                                        type="text"
                                        value={data?.location}
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                location: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    <span className="title-font font-medium px-3">
                                        {data?.location}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-2 sm:w-1/2">
                        <div className="flex h-full items-center rounded bg-gray-100 p-4">
                            <div className="flex">
                                <label htmlFor="" className="font-medium">
                                    District:{" "}
                                </label>
                                {editMode ? (
                                    <input
                                        className="px-3 bg-gray-100  "
                                        type="text"
                                        value={data?.district}
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                district: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    <span className="title-font font-medium px-3">
                                        {data?.district}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-2 sm:w-1/2">
                        <div className="flex h-full items-center rounded bg-gray-100 p-4">
                            <div className="flex">
                                <label htmlFor="" className="font-medium">
                                    State:{" "}
                                </label>
                                {editMode ? (
                                    <input
                                        className="px-3 bg-gray-100  "
                                        type="text"
                                        value={data?.state}
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                state: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    <span className="title-font font-medium px-3">
                                        {data?.state}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full p-2 sm:w-1/2">
                        <div className="flex h-full items-center rounded bg-gray-100 p-4">
                            <div className="flex">
                                <label htmlFor="" className="font-medium">
                                    Contact Number:{" "}
                                </label>
                                {editMode ? (
                                    <input
                                        className="px-3 bg-gray-100  "
                                        type="text"
                                        value={data.number}
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                number: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    <span className="title-font font-medium px-3">
                                        {data?.number}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full p-2 sm:w-1/2">
                        <div className="flex h-full items-center rounded bg-gray-100 p-4">
                            <div className="flex">
                                <label htmlFor="" className="font-medium">
                                    Email:{" "}
                                </label>
                                {editMode ? (
                                    <input
                                        className="px-3 bg-gray-100  "
                                        type="text"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                email: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    <span className="title-font font-medium px-3">
                                        {data?.email}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full p-2 sm:w-1/2">
                        <div className="flex h-full items-center rounded bg-gray-100 p-4">
                            <div className="flex">
                                <label htmlFor="" className="font-medium">
                                    Opening Time:{" "}
                                </label>
                                {editMode ? (
                                    <input
                                        className="px-3 bg-gray-100  "
                                        type="time"
                                        value={data.openingTime}
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                openingTime: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    <span className="title-font font-medium px-3">
                                        {data?.openingTime}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full p-2 sm:w-1/2">
                        <div className="flex h-full items-center rounded bg-gray-100 p-4">
                            <div className="flex">
                                <label htmlFor="" className="font-medium">
                                    Closing Time:{" "}
                                </label>
                                {editMode ? (
                                    <input
                                        className="px-3 bg-gray-100  "
                                        type="time"
                                        value={data.closingTime}
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                closingTime: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    <span className="title-font font-medium px-3">
                                        {data?.closingTime}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full p-2 sm:w-1/2">
                        <div className="flex h-full items-center rounded bg-gray-100 p-4">
                            <div className="flex">
                                <label htmlFor="" className="font-medium">
                                    Price:{" "}
                                </label>
                                {editMode ? (
                                    <input
                                        className="px-3 bg-gray-100  "
                                        type="text"
                                        value={data?.price}
                                        onChange={(e) =>
                                            setData((prevData) => ({
                                                ...prevData,
                                                price: e.target.value,
                                            }))
                                        }
                                    />
                                ) : (
                                    <span className="title-font font-medium px-3">
                                        {data?.price}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {editMode ? (
                        <button
                            className="flex mx-auto mt-16 text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                            onClick={() => updateData()}
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                            onClick={() => setEditMode(true)}
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TurfPorfile;
