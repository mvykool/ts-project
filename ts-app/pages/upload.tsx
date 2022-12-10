import React, { useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { SanityAssetDocument } from '@sanity/client'
import useAuthStore from '../store/authStore'
import axios from 'axios'
import { client } from '../utils/client'

import { topics } from '../utils/constants'

const upload = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>()
   const [wrongType, setWrongType] = useState(false)

   const [caption, setCaption] = useState('')
   const [category, setCategory] = useState('')
   const [savingPost, setSavingPost] = useState(false)


   const { userProfile }: { userProfile: any} = useAuthStore();

   const router = useRouter()


   const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ['video/mp4']

    if(fileTypes.includes(selectedFile.type)){
      client.assets.upload('file', selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name
      })
      .then((data) => {
        setVideoAsset(data);
        setIsLoading(false);
      })
    }else {
        setIsLoading(false)
        setWrongType(true)
    }
}


const handlePost = async () => {
    if(caption && videoAsset?._id && category){
        setSavingPost(true);

        const document = {
            _type: 'post',
            caption,
            video: {
                _type: 'file',
                asset: {
                    _type: 'reference',
                    _ref: videoAsset?._id
                }
                
            },
            userId: userProfile?._id,
            postedBy: {
                _type: 'postedBy',
                _ref: userProfile?._id
            },
            topic: category
        }

        await axios.post('http://localhost:3000/api/post', document);

        router.push('/');
    }
}
  

  return (
    <div className='flex w-full h-full'>
      <div className='bg-white rounded-lg lg:flex items-center gap-10 justify-between'>
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

                            <video 
                            loop
                            controls
                            className='rounded-xl h-[450px] mt-16 bg-black'
                            src={videoAsset.url}>

                            </video>
                   
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
                                    <p className='bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>Select file</p>
                                </div>  
                            </div>
                            <input
                            name='upload video'
                            className='w-0 h-0'
                            onChange={uploadVideo}
                            type="file" />
                          </label>
                        </div>
                    )}
                </div>
               )}

            </div>
         </div>
         <div className='flex flex-col gap-3 pb-10 mt-10 xl:mt-1'>
            <label className='text-md font-medium'>Caption</label>
             <input
             value={caption}
             onChange={(e) => setCaption(e.target.value)}
             className="rounded outline-none text-md border-2 border-gray-200 p-2"
             type="text" />
             <label className='text-md font-medium' >Choose a category</label>
             <select
             onChange={(e) => setCategory(e.target.value)}
             className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
             >
                {topics.map((topic) => (
                    <option
                    className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                    key={topic.name}
                    value={topic.name}
                    >
                        {topic.name}
                    </option>
                ))}
             </select>
             <div className='flex gap-6 mt-10'>
               <button
               onClick={() => {}}
               type="button"
               className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28  lg:w-44 outline-none'
               >
                Discard
               </button>
               <button
               onClick={handlePost}
               type="button"
               className='bg-[#F51997] text-white border-2 text-md font-medium p-2 rounded w-28  lg:w-44 outline-none'
               >
                Post
               </button>
             </div>
         </div>
      </div>
    </div>
  )
}

export default upload