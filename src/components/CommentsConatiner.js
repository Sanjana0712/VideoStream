import React from 'react'

const commentsData =[
    {   
        name: "Sanjana",
        text: "Nice video",
        replies:[],
    },
    {   
        name: "Sanjana",
        text: "Nice video",
        replies:[
            {
                name: "Sanjana",
                text: "Nice video",
                replies:[],
            },
            {
                name: "Sanjana",
                text: "Nice video",
                replies:[],
            }
        ],
    },
    {   
        name: "Sanjana",
        text: "Nice video",
        replies:[],
    }
];

const Comment = ({data}) => {
    const {name, text, replies} = data;
    return (
        <div className='flex shadow-sm bg-gray-100 p-2 rounded-lg my-2'>
            <img 
            className='w-12 h-12'
            alt="user"
            src="https://static.vecteezy.com/system/resources/previews/005/005/840/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"/>
        <div className='px-3'>
            <p className='font-bold'>{name}</p>
            <p>{text}</p>
        </div>
        </div>
        
    );
}

//Nested Comments, used recursion to display replies
const CommentsList = ({comments}) => {
    return comments.map((comment, index) => (
    <div key={index}>
        <Comment data={comment}/>
        <div className='pl-5 border border-l-black ml-5'>
            {comment.replies.length > 0 && <CommentsList comments={comment.replies}/>}
        </div>
    </div>
    
    ));
}

const CommentsConatiner = () => {
  return (
    <div className='m-5 p-2'>
        <h1 className='text-2xl font-bold'>Comments</h1>
        <CommentsList comments={commentsData}/>
    </div>
  )
}

export default CommentsConatiner