import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { HiCurrencyRupee } from "react-icons/hi2";

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
        className="absolute top-6 right-6 text-2xl"
      >
        <IoIosArrowDown />
      </h5>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="flex items-center justify-between w-full p-3">
          <img
            className="h-20"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFAeFmvyzZoJz2iCdXy19QhPSXOmzg-j25uQ&s"
            alt="Car Image"
          />
          <div>
            <h2 className="text-lg font-medium">Kamlesh</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">MP04 BN 2222</h4>
            <p className="text-sm text-gray-600">mahindra Scorpio</p>
          </div>
        </div>
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <FaLocationDot />
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm">Kankariys Talab, Satna</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <FaLocationDot />
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm">Kankariys Talab, Satna</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <HiCurrencyRupee />

            <div>
              <h3 className="text-lg font-medium">₹193.20</h3>
              <p className="text-sm">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
