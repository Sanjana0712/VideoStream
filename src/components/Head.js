import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';

const Head = () => {

    const dispatch = useDispatch();
    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    }
  return (
    <div className='grid grid-flow-col p-2 m-2 shadow-lg'>
        <div className='flex col-span-1'>
            <img 
            onClick={() => toggleMenuHandler()}
            className='h-8 cursor-pointer'
            alt="menu"
            src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-45/hamburger-menu-4.png"/>
            
            <a href="/">
            <img className='h-12 mx-2 my-[-7px] '
            alt="youtube-logo"
            src="https://lh3.googleusercontent.com/3zkP2SYe7yYoKKe47bsNe44yTgb4Ukh__rBbwXwgkjNRe4PykGG409ozBxzxkrubV7zHKjfxq6y9ShogWtMBMPyB3jiNps91LoNH8A=s500"/>
            </a>
        </div>
        
        <div className='col-span-10 flex justify-center'>
            <input className='w-1/2 border border-gray-400 p-2 rounded-l-full' type="text" placeholder="Search" />
            <button className='border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100'>Search </button>
        </div>
        
        <div className='col-span-1'>
            <img className='h-10'
            alt="user"
            src="https://static.vecteezy.com/system/resources/previews/005/005/840/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
            />
        </div>
    </div>
  )
}

export default Head