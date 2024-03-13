import React, { useRef , useState} from 'react'
import { Card, Button, Form , Container, Alert} from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updateUserPassword, updateUserEmail} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


    function handleSubmit(e) {
     e.preventDefault()
     const password = passwordRef.current.value;

     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
     }

    const promises = []
    setLoading(true)
    setError("")
    if (emailRef.current.value !== currentUser.email) {
        promises.push(updateUserEmail(emailRef.current.value));
      }
      if (passwordRef.current.value) {
        promises.push(updateUserPassword(passwordRef.current.value));
      }

    Promise.all(promises).then(() =>{
        navigate("/")
    }).catch((error) =>{
        setError("Failed to update account")
        console.log(error)
    }).finally(() =>{
        setLoading(false)
    })
  }
  return (
    <>
    <Container className='d-flex align-items-center justify-content-center'
    style={{minHeight : "50vh"}}>
        <div className='w-100' style={{maxWidth: '500px'}}>
      <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Update Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>

              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} required  defaultValue={currentUser.email} />
              </Form.Group>

              <Form.Group id='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' ref={passwordRef}  placeholder='Leave blank to keep same' />
              </Form.Group>

              <Form.Group id='password-confirm'>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type='password' ref={passwordConfirmRef}  placeholder='Leave blank to keep same' />
              </Form.Group>
              <Button disabled={loading} className='w-100 mt-3' style={{ backgroundColor: 'black', color: 'white', border: '1px solid black'}} type='submit'>Update</Button>
            </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
         <Link to="/login">Cancel</Link>
      </div>
      </div>
      </Container>
    </>
  )
}
