import React, { useRef , useState} from 'react'
import { Card, Button, Form , Container, Alert} from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext'
import NavBar from '../../components/NavBar';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false);


     async function handleSubmit(e) {
     e.preventDefault()
     const password = passwordRef.current.value;

     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
     }
     if (password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }
     try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate("/");
      setLoggedIn(true);
     } catch (error) {
      setError("Failed to create an account")
     }

     setLoading(false)
  }
  return (
    <>
    <NavBar loggedIn={true} />
    <Container className='d-flex align-items-center justify-content-center'
    style={{minHeight : "50vh"}}>
        <div className='w-100' style={{maxWidth: '500px'}}>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>

              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} required />
              </Form.Group>

              <Form.Group id='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' ref={passwordRef} required />
              </Form.Group>

              <Form.Group id='password-confirm'>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type='password' ref={passwordConfirmRef} required />
              </Form.Group>
              <Button disabled={loading} className='w-100 mt-3' style={{ backgroundColor: 'black', color: 'white', border: '1px solid black'}} type='submit'>Sign Up</Button>
            </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
      </div>
      </Container>
    </>
  )
}
