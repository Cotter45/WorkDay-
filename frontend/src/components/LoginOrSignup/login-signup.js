import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import './form.css';


function LoginSignupForm({ login, setLogin, signUp, setSignUp, setShowModal}) {
    const dispatch = useDispatch();

    // const [login, setLogin] = useState(true);
    // const [signUp, setSignUp] = useState(false);

    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, set_first_name] = useState("");
    const [last_name, set_last_name] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {

    const newErrors = [];

        if (!email.includes('@') || email.includes(" ")) newErrors.push('Please enter a valid email.');
        if (first_name && first_name[0] !== first_name[0].toUpperCase()) newErrors.push('Please capitalize your first name.');
        if (last_name && last_name[0] !== last_name[0].toUpperCase()) newErrors.push('Please capitalize your last name.');
        if (password !== confirmPassword) newErrors.push('Your passwords do not match.');
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')) newErrors.push('Password must contain at least 1 lowercase letter, uppercase letter, number and special character (i.e. "!@#$%^&*")')

        if (newErrors.length) setErrors(newErrors)
        else setErrors([])

    }, [confirmPassword, email, first_name, last_name, password])

    const handleLogin = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password })).catch(
        async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        }
        );
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
        setErrors([]);
        return dispatch(sessionActions.signup({ email, first_name, last_name, password }))
            .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
            });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    if (sessionUser) return <Redirect to="/" />;

    return (
        <>
            {login && (
                <div className='sign-up-container'>
                    <h1 className='switch-forms' onClick={() => {
                        setLogin(!login)
                        setSignUp(!signUp)
                    }}
                    ><i className="fas fa-chevron-left"></i> {login ? 'Log In' : 'Sign Up'} <i className="fas fa-chevron-right"></i></h1>
                    <form className='sign-up-form' onSubmit={handleLogin}>
                        <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                        </ul>
                        <label>
                        Username or Email
                        </label>
                        <input
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                        <label>
                        Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className='sign-up-button' type="submit">Log In</button>
                    </form>
                </div>
            )}
            {signUp && (
                <div id='sign-up-container'>
                    <h1 className='switch-forms' onClick={() => {
                        setLogin(!login)
                        setSignUp(!signUp)
                    }}
                    ><i className="fas fa-chevron-left"></i> {!login ? 'Sign Up' : 'Log In'} <i className="fas fa-chevron-right"></i></h1>
                    <form id='sign-up-form' onSubmit={handleSignup}>
                        <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <label>
                        Email
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>
                        First Name
                        </label>
                        <input
                            type="text"
                            value={first_name}
                            onChange={(e) => set_first_name(e.target.value)}
                            required
                        />
                        <label>
                        Last Name
                        </label>
                        <input
                            type="text"
                            value={last_name}
                            onChange={(e) => set_last_name(e.target.value)}
                            required
                        />
                        <label>
                        Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label>
                        Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button className='sign-up-button' disabled={errors.length ? true : false} type="submit">Sign Up</button>
                    </form>
                </div>
            )}
        </>
    )
}

export default LoginSignupForm;