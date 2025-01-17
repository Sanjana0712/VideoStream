import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { cacheResults } from '../utils/searchSlice';

const Head = () => {

    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");

    const [suggestions, setSuggestions] = useState([]);

    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchCache = useSelector((store) => store.search);

    //Debouncing. In this case, we are limiting the number of times the 
    // getSearchSuggestions function is called when the user is typing in the search bar. 
    // We are setting a timer of 200ms and clearing the previous timer when the user types 
    // something new. This is to prevent the function from being called multiple times when the user is typing fast.
    
    useEffect(() => {
        const timer = setTimeout(() => {
            if(searchCache[searchQuery])
            {
                setSuggestions(searchCache[searchQuery]);
            }
            else{
                getSearchSuggestions();
            }      
        },200)
        return () => clearTimeout(timer);
    },[searchQuery]);

    const getSearchSuggestions = async() => {
        // console.log("API CALL-"+searchQuery);
        const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
        const json = await data.json();
        setSuggestions(json[1]);
        dispatch(cacheResults(
            {
                [searchQuery] : json[1]
            }
        ));
    }

    // const handleSuggestions = (event) => {
    //     setSearchQuery(event.target.innerText);
    //     setShowSuggestions(false);
    //     navigate('/results?search_query=' + encodeURI(event.target.innerText));
    //  }

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
            <div className='flex w-full justify-center'>
                <input className='w-1/2 border border-gray-400 p-2 rounded-l-full' 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
                placeholder="Search" />
                <button className='border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100'>
                 🔍 
                </button>
            </div>
            {showSuggestions && 
                <div className='absolute bg-white py-2 px-2 mt-10 w-[465px] rounded-lg shadow ml-[-95px] border border-gray-100'>
                    <ul>
                        {suggestions.map((suggestion) => (
                            <li key={suggestion} className='py-1 shadow-sm hover:bg-gray-100'>{suggestion}</li>
                        ))}
                    </ul>
                </div>
            }
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

export default Head;