import React from 'react'
import { Link } from 'react-router-dom'

const Logout = () => {
    localStorage.removeItem('token')

    // return html and redirect to /login after 2 seconds
    return (
        <div>
            <h1>You have been logged out</h1>
            <p>Redirecting to <Link to="/login">login</Link> in 2 seconds...</p>
            <script>
                {setTimeout(() => {
                    window.location.href = '/login'
                }, 2000)}
            </script>
        </div>
    )
}

export default Logout