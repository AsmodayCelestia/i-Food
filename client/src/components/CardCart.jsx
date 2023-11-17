import { Link } from "react-router-dom";

export default function CardCart({image, name, quantity, price, id, detailId}) {
  return (
    <>
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img
            src={image}
            alt="product-image"
            className="w-24 h-24 object-cover rounded-md"
          />
          <div className="ml-4 flex-grow">
            <h2 className="text-lg font-bold text-gray-900">
              {name}
            </h2>
            {/* <p className="mt-1 text-xs text-gray-700"></p> */}
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center border-gray-100">
                <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                  {" "}
                  -{" "}
                </span>
                <input
                  className="h-8 w-8 border bg-white text-center text-xs outline-none"
                  type="number"
                  defaultValue={quantity}
                  min={1}
                />
                <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                  {" "}
                  +{" "}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm">Rp. {price}, 00</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
