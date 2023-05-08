import TurfCard from "./TurfCard";
import { useEffect, useState } from "react";
import { Axiosuser } from "../../../API/AxiosInstance";
import Pagination from "./Pagination";
// import axios from "axios";
// import { userUrl } from "../../../API/API";


const Turf = () => {
  const [turfs, setTurfs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const response = await Axiosuser.get(`turfs`);
        setTurfs(response.data.turfs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTurfs();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = turfs
    .filter((turf) =>
      turf.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="min-h-screen bg-gray-100 pt-[70px]">
        <section className="py-16 sm:py-16 bg-gray-100 text-black">
          <div className="container p-6 mx-auto space-y-8 relative">
            <div className="flex justify-end items-center absolute top-6 right-6">
              <div className="my-4 flex items-center">
                <input
                  type="text"
                  placeholder="Search by location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-3 mr-2 w-60"
                />
              </div>
            </div>
            <div className="space-y-2 text-center ">
              <h2 className="text-3xl font-bold">Let's Play Together</h2>
              <p className="font-serif text-sm text-black">
                Select your playspots and book your playtime by a tap...
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
              {currentItems.map((turf) => (
                <TurfCard key={turf._id} {...turf} />
              ))}
            </div>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={turfs.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </section>
      </div>
    </>
  );
};



// const Turf = () => {

//   const [turfs, setTurfs] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const Turfs = async () => {
//       try {
//         await Axiosuser.get(`turfs`).then((response) => {
//             response.status === 200;
//             setTurfs(response.data.turfs);
//             refresh ? setRefresh(false) : setRefresh(true);
//           }).catch((err) => {
//             err?.response?.status === 401;
//           });
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     Turfs();
//   }, []);

//   return (

//     <>
//   <div className="min-h-screen bg-gray-100 pt-[70px]">
//     <section className="py-16 sm:py-16 bg-gray-100 text-black">
//       <div className="container p-6 mx-auto space-y-8 relative">
//         <div className="flex justify-end items-center absolute top-6 right-6">
//           <div className="my-4 flex items-center">
//             <input
//               type="text"
//               placeholder="Search by location..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="border border-gray-300 rounded-md py-2 px-3 mr-2 w-60"
//             />
//           </div>
//         </div>
//         <div className="space-y-2 text-center ">
//           <h2 className="text-3xl font-bold">Let's Play Together</h2>

//           <p className="font-serif text-sm text-black">
//             Select your playspots and book your playtime by a tap...
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
//           {turfs
//             .filter((turf) =>
//               turf.location.toLowerCase().includes(searchQuery.toLowerCase())
//             )
//             .map((turf) => (
//               <TurfCard key={turf._id} {...turf} />
//             ))}
//         </div>
//       </div>
//     </section>
//   </div>
// </>
//   );
// };



// const Turf = () => {

//   const [turfs, setTurfs] = useState([]);

//   useEffect(() => {
//     const Turfs = async () => {
//       try {
//         await axios.get(`${userUrl}turfs`).then((response) => {
//             response.status === 200
//             setTurfs(response.data.turfs);
//             refresh ? setRefresh(false) : setRefresh(true)
//           }).catch((err) => {
//             err?.response?.status === 401
//           })
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     Turfs();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 pt-[70px]">
//       <section className="py-16 sm:py-16 bg-gray-100 text-black">
//         <div className="container p-6 mx-auto space-y-8">
//           <div className="space-y-2 text-center">
//             <h2 className="text-3xl font-bold">Let's Play Together</h2>

//             <p className="font-serif text-sm text-black">
//               Select your playspots and book your playtime by a tap...
//             </p>
//           </div>

//             <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
//               {turfs?.map((turf) => (
//                 <TurfCard key={turf._id} {...turf} />
//               ))}
//             </div>
//         </div>
//       </section>
//     </div>
//   );
// };

export default Turf;
