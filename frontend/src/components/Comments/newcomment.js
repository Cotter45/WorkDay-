

function NewComment({ handleSubmit, comment, setComment, edit, addImage, setAddImage, setAddPhoto, addPhoto, user, setPhoto, photo, }) {

    return (
        <>
        <form onSubmit={handleSubmit} className='post-comment-form'>
            <div className='post-comment'>
                <img className='post-comment-image' src={user.profile_picture} alt='user'></img>
                <input 
                    value={comment ? comment : ''}
                    onChange={(e) => setComment(e.target.value)}
                ></input>
            </div>
            {!edit && photo && (
                <img className='comment-image' alt='post' src={photo.name ? URL.createObjectURL(photo) : photo}></img>
            )}
            <div className='post-buttons'>
                {!edit && !addImage && (
                    <div onClick={() => setAddPhoto(!addPhoto)} className='icons'>
                        <i className="far fa-image fa-2x photo"></i>
                        <p>URL</p>
                    </div>
                    )}
                {!edit && addPhoto && (
                    <div>
                        <input
                            value={photo ? photo : ''}
                            onChange={(e) => setPhoto(e.target.value)}
                            className='post-image-input'
                            ></input>
                    </div>
                )}
                {!edit && addImage && (
                    <label className='upload'>
                            <input
                                type='file'
                                className='upload-button'
                                onChange={(e) => setPhoto(e.target.files[0])}
                                ></input>
                            Choose File
                        </label>
                )}
                {!edit && !addPhoto && (
                    <div onClick={() => setAddImage(!addImage)} className='icons'>
                        <i className="far fa-image fa-2x photo"></i>
                        <p>UPLOAD</p>
                    </div>
                    )}
            <button onClick={handleSubmit} className='post-button'>Submit</button>
            </div>
        </form>
        </>
    )
}

export default NewComment;