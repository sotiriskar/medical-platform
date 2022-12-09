import React from 'react'
import { Link, Navigate } from 'react-router-dom'

const Dicom = () => {

    const token = localStorage.getItem('token')
    if(!token){
        return <Navigate to="/login" />
    }

    return (
        <div>
            <h1>Dicom</h1>
            <Link to="/logout">Logout</Link>
        </div>
    )
}

export default Dicom