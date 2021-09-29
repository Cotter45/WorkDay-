

function ProfileCard({ visitProfile, user }) {

    return (
        <div onClick={visitProfile} className='profile-card'>
            <div className='profile-images'>
                <div className='background-image-container'>
                    <img src={user?.background_image} alt='background'></img>
                </div>
                <img className='profile-image' src={user?.profile_picture} alt='me'></img>
            </div>
            <div className='profile-info'>
                <h4>{user?.first_name + ' ' + user?.last_name}</h4>
                <p>{user?.current_job}</p>
                <div className='profile-extra-info'>
                    <h4>Location</h4>
                    <p>{user?.location}</p>
                    <h4>Email</h4>
                    <p>{user?.email}</p>
                    <h4>Birthday</h4>
                    <p>{user && new Date(user.birthday).toDateString()}</p>
                    <h4>About</h4>
                    <p>{user?.description}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;