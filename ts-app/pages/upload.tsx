import React, { useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

import useAuthStore from '../store/authStore'
import axios from 'axios'
import { client } from '../utils/client'


const upload = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [videoAsset, setVideoAsset] = useState()

  return (
    <div className='flex w-full h-full'>
      <div className='bg-white rounded-lg'>
         <div>
            <div>
                <p className='text-2xl font-bold'>Upload Video</p>
                <p className='text-med text-gray-400 mt-1'>Post a video to your account</p>
            </div>
            <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] hover:border-red-300 hover:bg-gray-100'>
               {isLoading ? (
                <p>Uploading...</p>
               ) : (
                <div>
                    {videoAsset ? (
                        <div>
                   
                          </div>
                    ): (
                        <div>
                        <label className='cursor-pointer'>
                            <div className='flex flex-col items-center justify-center h-full'>
                                 <div className='flex flex-col items-center justify-center'>
                                    <p>
                                        <FaCloudUploadAlt
                                        className='text-gray-300 text-6xl'
                                        />
                                    </p>
                                    <p>
                                        Select video to upload
                                    </p>
                                </div>  
                            </div>
                          </label>
                        </div>
                    )}
                </div>
               )}
            </div>
         </div>
      </div>
    </div>
  )
}

export default upload