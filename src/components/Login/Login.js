import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {
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

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    
    const SubmitLogin = e => {
        e.preventDefault()
        authUser({ email, password })
        setEmail('')
        setPassword('')
    }

    const authUser = async (user) => {
        try {
            const res = await axios.post('http://localhost:1000/login', user)
            const { token } = res.data
            localStorage.setItem('token', token)
        } catch (error) {
            console.log(error)
        }
    }

    const SubmitSignUp = e => {
        e.preventDefault()
        createUser({ firstName, lastName, email, password })
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
    }

    const createUser = async (user) => {
        try {
            const res = await axios.post('http://localhost:1000/signup', user)
            console.log('res:', res)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div class="container" id="container">
            <div class="form-container sign-up-container">
                <form onSubmit={ SubmitSignUp }>
                    <h1>Create Account</h1>
                    <div class="social-container">
                        <a href="" class="social"><i class="fab fa-facebook-f"></i></a>
                        <a href="" class="social"><i class="fab fa-google-plus-g"></i></a>
                        <a href="" class="social"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" placeholder="Name" value={ firstName } onChange={ e => setFirstName(e.target.value) } required />
                    <input type="email" placeholder="Email" value={ email } onChange={ e => setEmail(e.target.value) } required />
                    <input type="password" placeholder="Password" value={ password } onChange={ e => setPassword(e.target.value) } required />
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
            <div class="form-container sign-in-container">
                <form onSubmit={ SubmitLogin }>
                    <h1>Sign in</h1>
                    <div class="social-container">
                        <a href="" class="social"><i class="fab fa-facebook"></i></a>
                        <a href="" class="social"><i class="fab fa-google"></i></a>
                        <a href="" class="social"><i class="fab fa-linkedin"></i></a>
                    </div>
                    <span>or use your account</span>
                    <input type="email" placeholder="Email" value={ email } onChange={ e => setEmail(e.target.value) } required />
                    <input type="password" placeholder="Password" value={ password } onChange={ e => setPassword(e.target.value) } required />
                    <a href="">Forgot your password?</a>
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button class="ghost" id="signIn">Sign In</button>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <button class="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;