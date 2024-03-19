import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom"

export default function AccountView() {
  const [error, setError] = useState("")
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate()

  async function handleLogout() {
    setError("")

    try {
      //await logout()
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}