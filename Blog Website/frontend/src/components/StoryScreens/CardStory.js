import React from 'react';
import { Link } from 'react-router-dom';
import { editDate } from '../../Helper';

const Story = ({ story }) => {


    const truncateContent = (content) => {
        const trimmedString = content.substr(0, 73);
        return trimmedString
    }
    const truncateTitle= (title) => {
        const trimmedString = title.substr(0, 69);
        return trimmedString
    }
    
    return (

        <div className="story-card">
            <Link to={`/story/${story.slug}`} className="story-link">

                <img className=" story-image" src={`/storyImages/${story.image}`} alt={story.title} />
                <div className="story-content-wrapper">

                    <h5 className="story-title">
                        
                    {story.title.length > 76 ? truncateTitle(story.title)+"..." : story.title
                    
                    }
                    </h5>


                    <p className="story-text"dangerouslySetInnerHTML={{__html : truncateContent( story.content) +"..."}}>
                        </p>
                    <p className="story-createdAt">{editDate(story.createdAt)} 
                    </p>
                </div>
            </Link>
        </div>

    )
}

export default Story;
