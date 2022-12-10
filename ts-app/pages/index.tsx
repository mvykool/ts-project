import axios from "axios";
import { NextPage } from 'next';
import { Video } from '../types'

interface Iprops {
  videos: Video[]
}


const Home= ({ videos }: Iprops) => {

 console.log(videos)

  return (
    <div >
       <h1>hola</h1>
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