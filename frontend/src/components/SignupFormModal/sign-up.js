import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

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

  if (sessionUser) return <Redirect to="/" />;


  const handleSubmit = (e) => {
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

  return (
    <div id='sign-up-container'>
      <h1>Sign Up</h1>
      <form id='sign-up-form' onSubmit={handleSubmit}>
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
  );
}

export default SignupFormPage;
