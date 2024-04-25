import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from 'react-redux';

export default function PrivateRoutes() {
  const { currentUser } = useSelector(state => state.user);

  return (
    currentUser.cHJpdmlsZWdl === 1 ? <Outlet /> : <Navigate to="/" />
  )

}