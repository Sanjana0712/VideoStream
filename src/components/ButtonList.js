import React from 'react'
import Button from './Button'

const ButtonList = () => {
  const list = ["All", "Gaming", "Music", "News", "Sports", "Learning", "Movies", "Live", "Fashion & Beauty"];
  return (
    <div className='flex'>
        {
            list.map((item) => {
                return <Button key={item} name={item}/>
            })
        }
    </div>
  )
}

export default ButtonList