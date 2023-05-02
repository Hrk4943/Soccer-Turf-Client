import { useNavigate } from "react-router-dom";

const TurfCard = ({ _id, courtName, images, location,district,state }) => {
  const Navigate = useNavigate();
  const viewSingle = (id) => {
    Navigate("/turfs-details", { state: id });
  };

  return (
    <article
      key={_id}
      className="flex flex-col  bg-gray-100 border-2"
      onClick={() => viewSingle(_id)}
    >
      <img
        alt=""
        className="object-cover w-full h-52 bg-gray-500"
        src={images?.[0]}
      />
      <div className="flex flex-col flex-1 p-6">
        {/* <p className="text-xs tracking-wider uppercase  text-violet-400">
          {event}
        </p> */}
        <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">
          {courtName}{" "}
          <span className="text-sm ml-1 text-gray-400 font-medium float-right mt-1">
            {" "}
            {location}
          </span>
        </h3>
        <div className="flex flex-wrap justify-between pt-3 space-x-2 text-xs text-gray-400">
          <span className="flex items-center space-x-2 text-yellow-500">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 590"
              className="w-4 h-4 fill-current"
            >
              
            </svg> */}
            <span className="text-sm font-bold">{state}</span>
          </span>
          <span>{district}</span>
        </div>
      </div>
    </article>
  );
};
export default TurfCard;
