import React, { useState } from "react"
import { Card, Button, Alert, Container } from "react-bootstrap"
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom"

export default function AccountView() {
  const [error, setError] = useState("")
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate()

  async function handleLogout() {
    setError("")

    try {
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
    <Container className='d-flex align-items-center justify-content-center'
        style={{ minHeight: "50vh" }}>
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
      </Container>
    </>
  )
}