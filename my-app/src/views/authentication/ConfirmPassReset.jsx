import React, { useRef, useState } from 'react'
import { Card, Button, Form, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import { resetPasswordStart, resetPasswordSuccess, resetPasswordFailure } from '../../redux/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';

export default function ConfirmPassReset() {
    const emailRef = useRef()
    // const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const { loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            dispatch(resetPasswordStart());
            const fromData = {
                email: emailRef,
            };
            const res = await fetch('http://localhost:3000/api/user/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fromData),
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success === false) {
                throw new Error(data.message);
            }
            setMessage("Check your inbox!")
            setTimeout(() => {
                navigate("/reset-password-confirmation");
            }, 1500);
        } catch (error) {
            setError("Failed to reset password")
            console.log(error);
        }
    }
    return (
        <>
            <Container className='d-flex align-items-center justify-content-center'
                style={{ minHeight: "50vh" }}>
                <div className='w-100' style={{ maxWidth: '500px' }}>
                    <Card>
                        <Card.Body>
                            <h2 className='text-center mb-4'>Confirm Reset Password</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}
                            <Form onSubmit={handleSubmit}>

                                <Form.Group id='token'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='text' ref={tokenRef} required />
                                </Form.Group>
                                <Form.Group id='new-password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' ref={passwordRef} required />
                                </Form.Group>
                                <Form.Group id='new-password-confirm'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' ref={passwordConfirmRef} required />
                                </Form.Group>

                                <Button disabled={loading} className='w-100 mt-3' style={{ backgroundColor: 'black', color: 'white', border: '1px solid black' }} type='submit'>Reset Password</Button>
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