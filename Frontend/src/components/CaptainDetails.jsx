import React , {useContext} from 'react'
import { IoMdTimer } from "react-icons/io";
import { BsSpeedometer } from "react-icons/bs";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { CaptainContext } from '../context/captainContext';


const CaptainDetails = () => {

  const {captain} = useContext(CaptainContext);
  return (
    <div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-3'>
            <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCCVY3pMASPibzeIqrB8TGhWOZwyIKJokYlw&s" alt="Captain image" />
            <h4 className='text-lg font-medium'>{(captain?.fullname.firstname +"  " + captain?.fullname.lastname).toUpperCase()}</h4>
          </div>
          <div>
            <h4 className='text-xl font-bold'>₹193.20</h4>
            <p className='text-sm text-gray-600 '>Earned</p>
          </div>
        </div>
        <div className='flex p-6 bg-gray-100 rounded-3xl justify-center items-start gap-5 mt-6'>
          <div className='text-center'>
            <IoMdTimer className='text-2xl mb-3 font-thin ml-7'/>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <BsSpeedometer className='text-2xl mb-3 font-thin ml-7'/>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          <div className='text-center'>
            <MdOutlineStickyNote2 className='text-2xl mb-3 font-thin ml-7'/>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails