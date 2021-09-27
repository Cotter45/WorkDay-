

function EditComment({ handleEditComment, comment, newComment, setNewComment, edit, photo, editComment, addImage, setAddPhoto, addPhoto, setPhoto, setAddImage}) {

    return (
        <form onSubmit={(e) => handleEditComment(e, comment.id)} className='edit-form'>
            <label>Edit Comment</label>
            <input 
                value={newComment ? newComment : ''}
                onChange={(e) => setNewComment(e.target.value)}
            ></input>
            <label>Selected Photo</label>
            {edit && photo && (
                <img className='comment-image' alt='post' src={photo.name ? URL.createObjectURL(photo) : photo}></img>
            )}
            <div className='post-buttons'>
                {editComment === comment.id && edit && !addImage && (
                    <div onClick={() => setAddPhoto(!addPhoto)} className='icons'>
                        <i className="far fa-image fa-2x photo"></i>
                        <p>URL</p>
                    </div>
                    )}
                {editComment === comment.id && edit && addPhoto && (
                    <div>
                        <input
                            value={photo ? photo : ''}
                            onChange={(e) => setPhoto(e.target.value)}
                            className='post-image-input'
                            ></input>
                    </div>
                )}
                {editComment === comment.id && edit && addImage && (
                    <label className='upload'>
                            <input
                                type='file'
                                className='upload-button'
                                onChange={(e) => setPhoto(e.target.files[0])}
                                ></input>
                            Choose File
                        </label>
                )}
                {editComment === comment.id && edit && !addPhoto && (
                    <div onClick={() => setAddImage(!addImage)} className='icons'>
                        <i className="far fa-image fa-2x photo"></i>
                        <p>UPLOAD</p>
                    </div>
                    )}
                <button onClick={(e) => handleEditComment(e, comment.id)} className='post-button'>Submit</button>
            </div>
        </form>
    )
}

export default EditComment;