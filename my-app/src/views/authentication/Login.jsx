import React, { useRef, useState } from 'react';
import { Card, Button, Form, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../../components/OAuth';
import { getCartStart, getCartSuccess, getCartFailure } from '../../redux/cart/cartSlice';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const { loading, signInError } = useSelector((state) => state.user);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    
    let userId; // Declare a variable to store the user ID
  
    try {
      dispatch(signInStart());
      const formData = {
        email: emailRef.current.value,
        password: passwordRef.current.value
      };
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        throw new Error(data.message); 
      }
      setError("");
      dispatch(signInSuccess(data));
      userId = data._id; // Store the user ID
  
    } catch (error) {
      setError(error.message); 
      dispatch(signInFailure(error.message)); 
      console.log(error);
      return; 
    }
  
    try {
      dispatch(getCartStart());
      const cartRes = await fetch(`http://localhost:3000/api/cart/get/${userId}`, { // Use the stored user ID
        method: 'GET',
        credentials: 'include',
      });
      const cartData = await cartRes.json();
      if (cartData.success === false) {
        throw new Error(cartData.message); 
      }
      dispatch(getCartSuccess(cartData));
      navigate('/');
    } catch (error) {
      setError(error.message); 
      dispatch(getCartFailure(error.message));
    }
  }
  
  
  return (
    <>
      <Container className='d-flex align-items-center justify-content-center'
        style={{ minHeight: "50vh" }}>
        <div className='w-100' style={{ maxWidth: '500px' }}>
          <Card>
            <Card.Body>
              <h2 className='text-center mb-4'>Log In</h2>
              {error && <Alert  variant="danger">{ error || 'Something went wrong!'}</Alert>}
              <Form onSubmit={handleSubmit}>

                <Form.Group id='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' ref={emailRef} required />
                </Form.Group>

                <Form.Group id='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className='w-100 mt-3' style={{ backgroundColor: 'black', color: 'white', border: '1px solid black' }} type='submit'>Log In</Button>
                <OAuth/>
              </Form>
              <div className='w-100 text-center mt-3'>
                <Link to="/forgot-password">Forgot Password?</Link>
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
