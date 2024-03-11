import React, { useRef , useState} from 'react'
import { Card, Button, Form , Container, Alert} from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext'
import NavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';


export default function ForgotPass() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

     async function handleSubmit(e) {
     e.preventDefault()

     try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
     } catch (error) {
      setError("Failed to reset password")
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
            <h2 className='text-center mb-4'>Forgot Reset</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>

              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} required />
              </Form.Group>

            
              <Button disabled={loading} className='w-100 mt-3' style={{ backgroundColor: 'black', color: 'white', border: '1px solid black'}} type='submit'>Reset Password</Button>
            </Form>
            <div className='w-100 text-center mt-3'>
              <Link to="/login">Log In</Link>
            </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to={"/signup"}>Sign Up</Link>
      </div>
      </div>
      </Container>
    </>
  )
}
