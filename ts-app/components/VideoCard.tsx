import React, { useState, useEffect, useRef} from 'react'
import { Video } from '../types'
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go'

interface Iprops {
  post: Video;
}

export const VideoCard = ({ post }: Iprops) => {

  const [isHover, setIsHover] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null);


  const onVideoPress = () => {
    if(playing){
      videoRef.current?.pause();
      setPlaying(false)
    } else {
      videoRef.current?.play();
      setPlaying(true)
    }
  }

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href='/'>
              <>
              <Image
              width={62}
              height={62}
              className='rounded-full'
              src={post.postedBy.image}
              alt='img'
              />
              </>
            </Link>
          </div>
          <div>
            <Link href='/'>
              <div className='flex items-center gap-2'>
                <p className='flex gap-2 items-center md:text-md font-bold text-primary' >{post.postedBy.userName}{" "}  <GoVerified className='text-blue-400 text-md' /></p>
                <p className='capitalize font-medium text-xs text-gray-500 md:block hidden'>{post.postedBy.userName}</p>
              </div>
            </Link>
          </div> 
        </div>
      </div>
      <div className='lg:ml-20 flex gap-4 relative'>
        <div className='rounded-3xl' onMouseEnter={() => setIsHover(true)} onMouseLeave={()=> setIsHover(false)}>
          <Link href='/'>
            <video 
             ref={videoRef}
             rounded-2xl 
             loop 
             className='ld:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] cursor-pointer bg-gray-100' src={post.video.asset.url}>

            </video>
          </Link>

          {isHover && (
            <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3'>
              {playing ? (
                <button onClick={onVideoPress} className='text-black text-2xl lg:text-4xl'><BsFillPauseFill/></button>
              ): <button onClick={onVideoPress}  className='text-black text-2xl lg:text-4xl'><BsFillPlayFill/></button>}


              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)} className='text-black text-2xl lg:text-4xl'><HiVolumeOff/></button>
              ): <button onClick={() => setIsVideoMuted(true)}  className='text-black text-2xl lg:text-4xl'><HiVolumeUp/></button>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
