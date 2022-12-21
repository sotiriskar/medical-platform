import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [email, setEmail ] = useState(null)
    const [loginError, setLoginError] = useState(null);
    const [signupError, setSignupError] = useState(null);
    const [password, setPassword ] = useState(null)
    const [firstName, setFirstName ] = useState(null)
    const navigate = useNavigate();

    if (localStorage.getItem('token')) {
        navigate('/')
    }

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }, []);

    const authUser = async (user) => {
        try {
            const res = await axios.post('http://localhost:5000/login', user)
            const { token } = res.data
            localStorage.setItem('token', token)
            navigate('/')
        } catch (error) {
            console.log(error)
            setLoginError(error.response.data)
        }
    }

    const SubmitLogin = e => {
        e.preventDefault()
        authUser({ email, password })
        setEmail('')
        setPassword('')
    }

    const createUser = async (user) => {
        try {
            const res = await axios.post('http://localhost:5000/signup', user)
            console.log(res.data)
        } catch (error) {
            console.log(error)
            setSignupError(error.response.data)
        }
    }

    const SubmitSignUp = e => {
        e.preventDefault()
        createUser({ firstName, email, password })
        setFirstName('')
        setEmail('')
        setPassword('')
    }

    return (
        <div className="container" id="container">
            <div className="form-container sign-up-container">
                <form onSubmit={ SubmitSignUp }>
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <a href="" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" value={ firstName } onChange={ e => setFirstName(e.target.value) } required />
                    <input type="email" placeholder="Email" value={ email } onChange={ e => setEmail(e.target.value) } required />
                    <input type="password" placeholder="Password" value={ password } onChange={ e => setPassword(e.target.value) } required />
                    { signupError && (<p className="error"> { signupError } </p>) }
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form onSubmit={ SubmitLogin }>
                    <h1>Sign in</h1>
                    <div className="social-container">
                        <a href="" className="social"><i className="fab fa-facebook"></i></a>
                        <a href="" className="social"><i className="fab fa-google"></i></a>
                        <a href="" className="social"><i className="fab fa-linkedin"></i></a>
                    </div>
                    <span>or use your account</span>
                    <input type="email" placeholder="Email" value={ email } onChange={ e => setEmail(e.target.value) } required />
                    <input type="password" placeholder="Password" value={ password } onChange={ e => setPassword(e.target.value) } required />
                    { loginError && (<p className="error"> { loginError } </p>) }
                    <a href="">Forgot your password?</a>
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className="ghost" id="signIn">Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button className="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;