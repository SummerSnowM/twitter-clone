import axios from 'axios';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap'
import { jwtDecode } from 'jwt-decode';

export default function NewPostModal({ show, handleClose }) {
    const [postContent, setPostContent] = useState("");

    const handleSave = () => {
        //get jwt token
        const token = localStorage.getItem("authToken");

        //decode and fetch user id
        const decode = jwtDecode(token);
        const userId = decode.id;

        //prepare data
        const data = {
            title: "Post Title",
            content: postContent,
            user_id: userId,
        }

        //api call
        axios.post("https://edd094d0-8e19-471b-bd57-24af5069bce6-00-ytyw0t7ntnoi.pike.replit.dev/posts", data)
            .then((response) => {
                console.log("Success:", response.data);
                handleClose();
            })
            .catch((error) => {
                console.error("Error", error);
            })
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="postContent">
                            <Form.Control
                                placeholder="What is happening?!"
                                as="textarea"
                                rows={3}
                                onChange={(e) => setPostContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        className="rounded-pill"
                        onClick={handleSave}
                    >
                        Tweet
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}