import { useState } from 'react';
import { signupUser } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './SignupForm.css';

function SignupForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to='/' />

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setErrors([]);

        return dispatch(signupUser({email, username, password}))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }

                if (data?.errors) {
                    setErrors(data.errors);
                } else if (data) {
                    setErrors([data]);
                } else {
                    setErrors([res.statusText]);
                }
            });
    }

    return (
        <div className='signup-form-container'>
            <h1>Signup Form</h1>
            <form className='signup-form' onSubmit={handleSubmit}>
                <label>
                    <input 
                        type="text"
                        id='username'
                        placeholder='username' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    <input 
                        type="text"
                        id='email'
                        placeholder='email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    <input 
                        type="password"
                        id='password'
                        placeholder='password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />

                <input type="submit" value="Sign Up" />
            </form>
        </div>
    )
}

export default SignupForm;