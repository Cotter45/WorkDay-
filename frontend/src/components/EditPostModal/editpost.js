import { useState, useEffect } from 'react';

import './edit_post.css';

function EditPostForm({ post, setShowModal }) {

    const [errors, setErrors] = useState([])


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('submitted');
    }

    return (
        <>
        <button className='close-modal' onClick={() => setShowModal(false)}><i className="fas fa-times fa-2x" /></button>
        <form className='edit-post-form' onSubmit={handleSubmit}>
            {post.description && (
                <>
                <label>Description</label>
                <input></input>
                </>
            )}
            <button disabled={errors.length ? true : false}>Submit</button>
        </form>
        </>
    )
}

export default EditPostForm;