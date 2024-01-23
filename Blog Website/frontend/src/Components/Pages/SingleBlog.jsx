import React, { useState, useEffect } from 'react'
import img1 from '../../Assests/pexels-matheus-bertelli-3856039.jpg'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const SingleBlog = () => {

    const id = useParams()

    
  const [blog, setBlog] = useState({})

  const getBlog = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8001/api/blog/${id}`);
      console.log(response)
      const data = await response?.data;
      setBlog(data?.data);
      console.log("API Response:", data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    getBlog(id)
  }, [])    

    return (
        <div className="single-blog">
            <div className="single-blog-content">
                <h2>Coroutine patterns in Android, and why they work</h2>

                <div className="author">
                    <div className="image">
                        <img src={img1} alt="" />
                    </div>
                    <div className="details">
                        <h5>Tom Colvin</h5>
                        <p>Published in <span>NexVerse</span> - jan 14, 2024</p>
                    </div>
                </div>
                <div className="cover-image">
                    <img src={img1} alt="" />
                </div>
                <div className="content">
                    <p>I know many Android developers who learn coroutines through code patterns, and that is usually enough to get by. But doing so misses the beauty behind them — and the fact that, at the heart of it, it’s all quite simple really. So, what makes those patterns work?

                        Grab your toolkit, let’s prise open some common coroutine patterns you’ve probably seen a hundred times, and marvel at the clockwork behind.</p>
                </div>

            </div>
        </div>
    )
}

export default SingleBlog