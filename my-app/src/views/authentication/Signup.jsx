import React, { useRef, useState } from 'react'
import { Card, Button, Form, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const usernameRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const { currentUser } = useAuth()
  const [error, setError] = useState("")
  const {loading, signInError} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()


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
      dispatch(signInStart());
      await signup(usernameRef.current.value, emailRef.current.value, passwordRef.current.value)
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
      setError("Failed to create an account")
    }

    dispatch(signInSuccess(currentUser))
  }
  return (
    <>
      <Container className='d-flex align-items-center justify-content-center'
        style={{ minHeight: "50vh" }}>
        <div className='w-100' style={{ maxWidth: '500px' }}>
          <Card>
            <Card.Body>
              <h2 className='text-center mb-4'>Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>

                <Form.Group id='username'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type='text' ref={usernameRef} required />
                </Form.Group>

                <Form.Group className='mt-2' id='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' ref={emailRef} required />
                </Form.Group>

                <Form.Group className='mt-2' id='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' ref={passwordRef} required />
                </Form.Group>

                <Form.Group className='mt-2' id='password-confirm'>
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control type='password' ref={passwordConfirmRef} required />
                </Form.Group>
                <Button disabled={loading} className='w-100 mt-3' style={{ backgroundColor: 'black', color: 'white', border: '1px solid black' }} type='submit'>Sign Up</Button>
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
