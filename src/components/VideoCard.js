import React from 'react'

const VideoCard = ({info}) => {
const {snippet,statistics} = info;
const {channelTitle,title,thumbnails} = snippet;
  return (
    <div className='p-2 m-2 w-60 shadow h-[300px]'>
        <img className="rounded-lg" alt="thumbnail" src={thumbnails.medium.url} />
        <ul>
            <li className='font-bold py-2'>{title}</li>
            <li>{channelTitle}</li>
            <li>{statistics.viewCount} views</li>
        </ul>
    </div>
  )
}

//Higher Order Function
// export const AdVideoCard = ({info}) => {
//     return(
//         <div className='p-1 m-1 border border-red-500'>
//             <VideoCard info={info}/>
//         </div>
//     )
// }

export default VideoCard