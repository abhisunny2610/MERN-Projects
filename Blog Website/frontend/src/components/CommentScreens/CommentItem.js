import React from 'react';
import { BsThreeDots } from 'react-icons/bs'
import {editDate} from '../../Helper'

const CommentItem = ({ comment}) => {

    return (

        <div className='comment-item'>
            <div className="comment-top-block">

                <section>
                    <img src={`/userPhotos/${comment.author.photo}`} alt={comment.author.username} width="35" />

                    <div>
                        <span className='comment-author-username' >{comment.author.username}</span>
                        <span className='comment-createdAt'>{editDate(comment.createdAt)}</span>
                    </div>
                </section>

                <section>
                    <BsThreeDots />
                </section>
            </div>


            <div className="comment-content">

                <span dangerouslySetInnerHTML={{ __html: comment.content }}></span>

            </div>

        </div>

    )
}

export default CommentItem;
