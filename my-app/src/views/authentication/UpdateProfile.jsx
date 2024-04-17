import React, { useEffect, useRef, useState } from 'react'
import { Card, Button, Form, Container, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import '../../styles/UpdateProfile.css';
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOut } from '../../redux/user/userSlice';

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector(state => state.user);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [failedPassError, setError] = useState("")
  const [updateSuccess, setUpdateSuccess] = useState(false);


  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image])

  const handleFileUpload = async (image) => {
    const storage = getStorage();
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, "usersPFP/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  async function handleSubmit(e) {
    e.preventDefault()

    if (formData.password?.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    try {
      dispatch(updateUserStart());
      const res = await fetch(`https://sutairushop-backend.onrender.com/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      setError("");
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`https://sutairushop-backend.onrender.com/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('https://sutairushop-backend.onrender.com/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };
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
                onChange={(e) => setImage(e.target.files[0])} />

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

              {error && <Alert variant="danger">{error.message}</Alert>}
              {failedPassError && <Alert variant="danger">{failedPassError}</Alert>}
              {updateSuccess && <Alert variant="success">User is updated successfully!</Alert>}
              <Form onSubmit={handleSubmit}>


                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type='text' id='username' required defaultValue={currentUser.username} onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email'id='email' required defaultValue={currentUser.email} onChange={handleChange} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' id='password' placeholder='Leave blank to keep same' onChange={handleChange} />
                </Form.Group>

                <Button disabled={loading} className='w-100 mt-3 p-2' style={{ backgroundColor: 'black', color: 'white', border: '1px solid black' }} type='submit'>{loading ? 'Loading...' : 'Update'}</Button>
                <div className='function-buttons'>
                  <span onClick={handleDeleteAccount} className='delete-account-text'>Delete Account</span>
                  <span onClick={handleSignOut} className='sign-out-text'>Sign out</span>
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
