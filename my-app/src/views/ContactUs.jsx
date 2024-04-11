import React, { useRef, useState } from 'react';
import { Card, Button, Form, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/ContactUs.css';
import FooterComponent from '../components/FooterComponent';


export default function ContactUs() {
    //using elastic mailler and SmtpJS
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();
    const nameRef = useRef();
    const messageRef = useRef();
    const [loading, setLoading] = useState(false);


    async function handleSubmit(event) {
        setSuccess('');
        setLoading(true);
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const message = messageRef.current.value;

        try {
            // Send email using SMTP.js
            await window.Email.send({
                Host: "smtp.elasticemail.com",
                Username: "sutairuapp@gmail.com",
                Password: "E46FE2684AC57245ED56E26068C86FDD401A",
                To: "sutairuapp@gmail.com",
                From: "sutairuapp@gmail.com",
                Subject: `Contact Form Submission by: ${name}`,
                Body: `\nEmail: ${email}\nMessage: ${message}`
            });

            setSuccess('Your message has been sent successfully.');
            setLoading(false);
            nameRef.current.value = '';
            emailRef.current.value = '';
            messageRef.current.value = '';
        } catch (error) {
            setError('There was an error sending your message. Please try again later.');
            setLoading(false);
        }
    }


    return (
        <div>
            <div className="contact-us-container">
                <h1>CONTACT US</h1>
                <p>Any question related to your order? Feel free to contact us and we will reply in less than 48h, from Monday to Friday, 9 am to 5 pm.</p>
                <p className='email-contact'><img width="24" height="24" src="https://img.icons8.com/material-rounded/24/1A1A1A/full-stop.png" alt="full-stop"/>sutairuapp@gmail.com</p>
                <p className="important-contact">Important:</p>
                <p>In your email, please provide us in priority:</p>
                <p><img width="24" height="24" src="https://img.icons8.com/material-rounded/24/1A1A1A/full-stop.png" alt="full-stop"/>Your complete name</p>
                <p><img width="24" height="24" src="https://img.icons8.com/material-rounded/24/1A1A1A/full-stop.png" alt="full-stop"/>Your order ID</p>
                <p>Or you can contact us using the form below:</p>
                
            </div>
            <Container className='contact-us-form'
                style={{ minHeight: "50vh" }}>
                <div className='w-100' style={{ maxWidth: '1000px' }}>
                    <Card>
                        <Card.Body>
                            <h2 className='text-center mb-4'>Contact Form</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}
                            <Form onSubmit={handleSubmit}>

                                <Form.Group id='name-contact'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type='text' ref={nameRef} required />
                                </Form.Group>

                                <Form.Group id='email-contact'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='email' ref={emailRef} required />
                                </Form.Group>

                                <Form.Group id='message-contact'>
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as='textarea' rows={5} ref={messageRef} required />
                                </Form.Group>

                                <Button disabled={loading} className='w-100 mt-3' style={{ backgroundColor: 'black', color: 'white', border: '1px solid black' }} type='submit'>Send message</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className='w-100 text-center mt-2'>
                        <Link to={"/"}>Go Back</Link>
                    </div>
                </div>
            </Container>
            <FooterComponent/>
        </div>
    )
}
