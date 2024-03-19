import React, { useEffect, useRef, useState } from 'react'
import { Card, Button, Form, Container, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import '../../styles/UpdateProfile.css';

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const fileRef = useRef(null);
  const { currentUser } = useSelector(state => state.user);
  const [error, setError] = useState("")
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  useEffect(() =>{
    if(image) {
      handleFileUpload(image);
    }
  }, [image])

  const handleFileUpload = async(image) =>{
    const storage = getStorage();
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, "usersPFP/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) =>{
        const progress =  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

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
      //promises.push(updateUserEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      //promises.push(updateUserPassword(passwordRef.current.value));
    }

    Promise.all(promises).then(() => {
      navigate("/")
    }).catch((error) => {
      setError("Failed to update account")
      console.log(error)
    }).finally(() => {
      setLoading(false)
    })
  }
  return (
    <>
      <Container className='d-flex align-items-center justify-content-center'
        style={{ minHeight: "50vh" }}>
        <div className='w-100' style={{ maxWidth: '500px' }}>
          <Card>
            <Card.Body className='card'>
              <h2 className='text-center mb-4'>Update Profile </h2>

              <input type="file" 
              ref={fileRef}
               hidden accept='image/*'
               onChange={(e) => setImage(e.target.files[0])}/>

              <img src={formData.profilePicture || currentUser.profilePicture} 
              alt="profile" 
              className='profile-picture' 
              onClick={() => fileRef.current.click()}
              />
              
              <p className='image-alerts'>
          {imageError ? (
            <span className='image-error'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='image-percents'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='image-success'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
              
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>

                <Form.Group id='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' ref={emailRef} required defaultValue={currentUser.email} />
                </Form.Group>

                <Form.Group id='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' ref={passwordRef} placeholder='Leave blank to keep same' />
                </Form.Group>

                <Form.Group id='password-confirm'>
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control type='password' ref={passwordConfirmRef} placeholder='Leave blank to keep same' />
                </Form.Group>
                <Button disabled={loading} className='w-100 mt-3 p-2' style={{ backgroundColor: 'black', color: 'white', border: '1px solid black' }} type='submit'>Update</Button>
                <div className='function-buttons'>
                  <span className='delete-account-text'>Delete Account</span>
                  <span className='sign-out-text'>Sign out</span>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <div className='w-100 text-center mt-2'>
            <Link to="/account" className='cancel-button'>Cancel</Link>
          </div>
        </div>
      </Container>
    </>
  )
}
