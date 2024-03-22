import React, { useRef, useState } from 'react'
import { Card, Button, Form, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signUpStart, signUpSuccess, signUpFailure } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../../components/OAuth';

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const usernameRef = useRef()
  const passwordConfirmRef = useRef()
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("")
  const { loading, signInError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()


  async function handleSubmit(e) {
    e.preventDefault()
    const formData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    if (formData.password !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }
    try {
      setError("")
      dispatch(signUpStart());
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signUpFailure(data.user));
        setError(data.message);
        return;
      }
      setError("");
      setSuccessMessage("Account created successfully! You can now log in.");
      dispatch(signUpSuccess());
      setTimeout(() => {
        navigate("/login");
      }, 1500); 
    } catch (error) {
      setError("Failed to create an account")
      dispatch(signUpFailure(error));
    }
  }
  return (
    <>
      <Container className='d-flex align-items-center justify-content-center'
        style={{ minHeight: "50vh" }}>
        <div className='w-100' style={{ maxWidth: '500px' }}>
          <Card>
            <Card.Body>
              <h2 className='text-center mb-4'>Sign Up</h2>
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
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
                <OAuth />
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
