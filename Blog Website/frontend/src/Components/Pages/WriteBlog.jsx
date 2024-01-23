import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

const WriteBlog = () => {

    const [formData, setFormData] = useState({
        // coverImage: '',
        category: '',
        title: '',
        content: '',
    })

    const { config } = useContext(AuthContext)
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }
    const clearForm = () => {
        setFormData({
            category: '',
            title: '',
            content: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:8001/api/blog', formData, config)
            setSuccessMessage('Add story successfully ')

            clearForm()
            // setTimeout(() => {
            //     setSuccess('')
            // }, 7000)

        }
        catch (error) {
            // setTimeout(() => {
            //     setError('')

            // }, 7000)
            setErrorMessage(error.response.data.error)

        }
    }



    return (
        <div className="writeblog">
            <form action="" method="post" encType='multipart/form-data' onSubmit={handleSubmit} >
                {/* <input type="file" name="coverImage" id="coverImage" 

                /> */}
                <input type="text" placeholder='Category' className='category'
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                />
                <input type="text" placeholder='Title' className='title'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                />
                <textarea name="content" id="content" cols="30" rows="10" className='content' placeholder='Tell your story...'
                    value={formData.content}
                    onChange={handleChange}
                ></textarea>
                <button type='submit'>Publish</button>
            </form>
        </div>
    )
}

export default WriteBlog