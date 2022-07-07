import React, { useState, useEffect } from 'react';
import Navbar from "./Nav";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { fetchData } from "../main";
import { useNavigate } from 'react-router-dom';
import {Modal, Form, Button} from 'react-bootstrap'
import '../styles/profile.css'

const Profile = () => {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [isLoaded, setIsLoaded] = useState(false); //set true if tocken is valid
    const [token, setToken] = useState('');
    const [show, setShow] = useState(false);
    const [post, setPost] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [posts, setPosts] = useState([]);
    const [errorAlert, setErrorAlert] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        await axios.get('http://localhost:3005/user/token', { withCredentials: true }).
            then(function (response) {
                const decoded = jwt_decode(response.data.accessToken);
                setToken(response.data.accessToken);
                setIsLoaded(true);
                setUserId(decoded.userid);
                setName(decoded.username);
              })
              .catch(function (error) {
                // handle errors
                console.log(error);
                if (error.response) {
                    navigate("/");
                }
             })
    }
    //show or hide modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveNewPost = async (e) => {
        e.preventDefault();
        setErrorAlert(false);
        setSuccessAlert(false);
        await axios.post('http://localhost:3005/post/create', {
            post: postTitle,
            content: post,
            userid: userId
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(function (response) {
            // handle success
            console.log(response);
            setPost('');
            setSuccessAlert(response.data.message);
            getUserPosts();
            setTimeout(()=>{
                setSuccessAlert(false);
                setErrorAlert(false);
                handleClose();
            }, 4000);
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            if (error.response) {
                setErrorAlert(error.response.data.message);
            }
            })
        
    }

    const getUserPosts = async () =>{
        await axios.post('http://localhost:3005/post/getposts', {
            userid: userId
        },{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(function (response) {
            console.log(response.data);
            setPosts(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
    }
   
    const deletePost = async (e,post) => {
        e.preventDefault();
        const options = {
            method: 'DELETE',
            credentials: "include",
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id: post._id })
        };
        fetch('http://localhost:3001/post/delete', options)
            .then(response =>response.json())
            .then(data => {
                //console.log('Success:', data);
                getUserPosts();
                alert(data.success)
              })
            .catch(error => {
                if (error.response) {
                    alert('Post not deleted!!');
                }
            });;
    }

    if(isLoaded){
        getUserPosts();
        setIsLoaded(false);
    }
    console.log(posts)
    return (
        <>
            <Navbar/>
            <div className="container bg" >
               <div className="row justify-content-center">
                  <div className="col-md-8 col-sm-12 col-xl-6">
                     <div className="mt-5 mb-3">
                        <h3 className="text-center text">Welcome {name}. How is your day going so far?</h3>
                        <hr/>
                        <div className="row justify-content-center">
                            <button onClick={handleShow} style={{width:"auto"}} className="btn btn-warning">Create Post</button>
                        </div>
                     </div>
                  </div>
               </div>
               {posts.map((post,) => (
                    <div key={post.postid} className="row justify-content-center">
                        <div className="col-md-8 col-sm-12 col-xl-6">
                            <div class="card postCard mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">{post.post}</h5>
                                    <p class="card-text">{post.content}</p>
                                    <p class="delete"><button onClick={e=> deletePost(e, post)}>Delete</button>
</p>
                                </div>
                            </div>
                        </div>
                    </div>
               ))}
               <div className="row">
               <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>New post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {successAlert && 
                            <div className="alert alert-success" role="alert">
                                {successAlert}
                            </div>
                        }

                        {errorAlert && 
                            <div className="alert alert-danger" role="alert">
                                {errorAlert}
                            </div>
                        }
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Post</Form.Label>    
                                <Form.Control onChange={(e) => setPostTitle(e.target.value)} value={postTitle}  type="text" placeholder="Post title" />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Post Content</Form.Label>
                                <Form.Control
                                    as="textarea" 
                                    rows={3}
                                    value={post} 
                                    placeholder="Post Content"
                                    onChange={(e) => setPost(e.target.value)} />
                                </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={saveNewPost}>
                        Save
                    </Button>
                    </Modal.Footer>
                </Modal>
               </div>
            </div>
        </>
    );
}
export default Profile;