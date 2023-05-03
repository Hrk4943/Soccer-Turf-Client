import { useEffect, useState } from "react";
// import axios from "axios";
import Photo from "./Photo";
import Bookings from "./Bookings";
import { Axiosuser } from "../../../API/AxiosInstance.js";
// import { userUrl } from "../../../API/API";
import Wallet from "./Wallet";

const UserProfile = () => {
  const  token  =localStorage.getItem('userToken')
  const [users, setUsers] = useState({ name: "", phone: "", email: "" });
  const [dataError, setDataError] = useState("");
  const [edit, setEdit] = useState(false);
  const [wallet,setWallet]=useState([])
  const [showWallet,setShowWallet]=useState(false)


  const toGetUser = async (token) => {
    try {
        const headers = { authorization: token }
      const response = await Axiosuser.get(`profile`, {headers});
      if (response.status === 200) {
        setUsers(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onChange = (e) =>
    setUsers({ ...users, [e.target.name]: e.target.value });


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        const headers = { authorization: token }
      const response = await Axiosuser.put(`profile`, {users},{headers});
      if (response.status === 200) {
        setEdit(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWallet=async(token)=>{
    try {
      const headers = { authorization: token }
      Axiosuser.get(`wallet`,{headers}).then((response)=>{
        if(response.status===200){
          setWallet(response.data)
          setShowWallet(true)
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    toGetUser(token);
  }, []);


  return (
    <section className="p-6 bg-white text-gray-900 mt-16 border-3">
        <h1 class=" text-3xl font-bold text-gray-900 text-center">My Profile</h1>
      <form
        onSubmit={onSubmit}
        className="container flex flex-col mt-2 mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
      >
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <Photo name={users?.name} setEdit={setEdit} />
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="username" className="text-sm">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={onChange}
                value={users?.name}
                disabled={!edit}
                placeholder="Username"
                className="w-full p-2 rounded-md  border-gray-100 text-gray-900"
              />
              {dataError.name && (
                <p className="text-red-500 mt-1 text-xs italic">
                  {dataError.name}
                </p>
              )}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="mobile" className="text-sm">
                Number
              </label>
              <input
                id="Mobile Number"
                type="number"
                name="mobile"
                onChange={onChange}
                disabled={!edit}
                value={users?.phone}
                placeholder="Mobile Number"
                className="w-full py-2 rounded-md  border-gray-100 text-gray-900"
              />
              {dataError.phone && (
                <p className="text-red-500 mt-1 text-xs italic">
                  {dataError.phone}
                </p>
              )}
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                disabled={!edit}
                value={users?.email}
                name="email"
                onChange={onChange}
                type="text"
                placeholder="email"
                className="w-full py-2 rounded-md  border-gray-100 text-gray-900"
              />
              {dataError.email && (
                <p className="text-red-500 mt-1 text-xs italic">
                  {dataError.email}
                </p>
              )}
            </div>
            {/* <p
              className="text-blue-400 mt-9 cursor-pointer"
              onClick={() => fetchBookings(token)}
            >
              View Bookings
            </p> */}
            <p
              className="text-blue-400 mt-9 cursor-pointer"
              onClick={() => fetchWallet(token)}
            >
              Wallet
            </p>
            {edit && (
              <button className="btn btn-primary mt-0" type="submit">
                Update
              </button>
            )}
          </div>
        </fieldset>
      </form>
      {showWallet && <Wallet wallet={wallet}/>}
      {/* {showBookings && <Bookings previousbookings={previousBookings} upcomingBooking={upcomingBookings}/>} */}
    </section>
  );
};
export default UserProfile;
