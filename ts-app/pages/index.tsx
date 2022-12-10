import axios from "axios";
import { NextPage } from 'next';
import { Noresults } from "../components/Noresults";
import { VideoCard } from "../components/VideoCard";
import { Video } from '../types'

interface Iprops {
  videos: Video[]
}


const Home= ({ videos }: Iprops) => {

 console.log(videos)

  return (
    <div  className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard  post={video} key={video._id} />
        ))
      ): (
        <Noresults text={"no videos"} />
      )} 
    </div>
  )
}


export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`);


return {
  props: {
    videos: data
  }
}
}

export default Home