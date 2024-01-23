import React from 'react'

const WriteBlog = () => {
    return (
        <div className="writeblog">
            <form action="" method="post">
                <input type="file" name="coverImage" id="coverImage" />
                <input type="text" placeholder='Category' className='category' />
                <input type="text" placeholder='Title' className='title' />
                <textarea name="content" id="content" cols="30" rows="10" className='content' placeholder='Tell your story...'></textarea>
                <button type='submit'>Publish</button>
            </form>
        </div>
    )
}

export default WriteBlog