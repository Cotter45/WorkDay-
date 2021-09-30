import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { get_data } from '../../store/api';

import './home.css';

function HomePage() {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const data = useSelector(state => state.data);

    useEffect(() => {
        if (!user) return;
        if (data) return;
        dispatch(get_data(user.id));
    }, [data, dispatch, user])
    
    const [slide, setSlide] = useState(1);

    useEffect(() => {
        if (slide === 4) setSlide(1);
     
        let timeout = setTimeout(() => {
            setSlide(slide + 1)
        }, 3000)

        return () => clearTimeout(timeout)
    }, [slide])


    return (
        <div id='home-main'>
            <div id='home-welcome'>
                <div className='welcome'>
                    <div className='welcome-header'>
                        <h1>Welcome to your last browser tab</h1>
                    </div>
                    <div className='welcome-links'>
                        <button><a href='#about'>About</a></button>
                        <button><a href='#companies'>For Companies</a></button>
                        <button><a href='#job-seekers'>For Job Seekers</a></button>
                    </div>
                </div>
            </div>
            <div className='home-about'>
                <div id='about'>
                    <p>WorkDay is here for jobseekers and companies alike, bringing people together like never before.
                        At WorkDay an application or jobseeker is just one click away. No need for cover letters, applications
                        to multiple sites or not knowing if the company is listening. As a company owner at WorkDay you can manage
                        customizable internal pages as well as navigate prospective employees. The process is designed to be as 
                        seemless as possible. One browser tab, unlimited possibilities!
                    </p>
                </div>
                <div className='about-carousel'>
                    <div className={slide === 1 ? 'carousel' : 'hide'}>
                        <img alt='alone' src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aHVtYW58ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"></img>
                        <div className="description">No need to feel alone</div>
                    </div>
                    <div className={slide === 2 ? 'carousel' : 'hide'}>
                        <img alt='interview' src="data:image/jpeg;base64,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"></img>
                        <div className="description">Simplify Interviews</div>
                    </div>
                    <div className={slide === 3 ? 'carousel' : 'hide'}>
                        <img alt='disorganized' src="https://cdn.vox-cdn.com/thumbor/zEkDCjx5mRnSCpH9V0kyL6YGtiI=/0x0:5760x3840/1400x933/filters:focal(2420x1930:3340x2850):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/56578693/akrales_170907_1974_0026_02.1504880732.jpg"></img>
                        <div className="description">Get Organized</div>
                    </div>
                </div>

            </div>
            <div id='companies'>

            </div>
            <div id='job-seekers'>

            </div>
            <div id='home-info'>
                <button><a href='#home-main'>WorkDay</a></button>
            </div>
        </div>
    )
}


export default HomePage;