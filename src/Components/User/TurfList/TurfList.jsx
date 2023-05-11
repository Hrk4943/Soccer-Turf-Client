import TurfCard from "./TurfCard";
import { useEffect, useState } from "react";
import { Axiosuser } from "../../../API/AxiosInstance";
import Pagination from "./Pagination";

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
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold">Let's Play Together</h2>
              <p className="font-serif text-sm text-black ">
                Select your playspots and book your playtime by a tap...
              </p>
            </div>
            <div className="my-4 flex items-center justify-center">
              <input
                type="text"
                placeholder="Search by location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=" border border-gray-300 rounded-md py-2 px-3 w-full md:w-60 lg:w-80"
              />
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4 ">
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

export default Turf;
