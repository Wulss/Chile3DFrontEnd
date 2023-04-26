import React from 'react'
import { Route, Navigate, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';

export default function LogOutButton () {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
        
    }
    
    return (
        <Button onClick={handleLogout} variant="contained">Cerrar sesión</Button>
    )
}
