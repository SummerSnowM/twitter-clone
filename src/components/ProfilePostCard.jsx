import { Button, Col, Image, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function ProfilePostCard({ content, postId }) {
    let [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        fetch(`https://edd094d0-8e19-471b-bd57-24af5069bce6-00-ytyw0t7ntnoi.pike.replit.dev/likes/post/${postId}`)
            .then((response) => response.json())
            .then((data) => setLikes(data.length))
            .catch((error) => console.error("Error", error));
    }, [postId]);

    const handleUnlike = () => {
        likes -= 1;
        setLiked(false);
        const token = localStorage.getItem("authToken");
        axios.delete(
            `https://edd094d0-8e19-471b-bd57-24af5069bce6-00-ytyw0t7ntnoi.pike.replit.dev/likes/${postId}`,
            {
                headers: {
                    Authorization: token.replace(/^"|"$/g, "") //remove bearers
                }
            })
            .then((response) => console.log('Success', response.data))
            .catch((error) => console.log('Failed', error));
    }

    const handleLike = () => {
        likes += 1;
        setLiked(true);

        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;

        axios.post(
            `https://edd094d0-8e19-471b-bd57-24af5069bce6-00-ytyw0t7ntnoi.pike.replit.dev/likes`,
            {
                "user_id": userId,
                "post_id": postId
            }
        )
            .then((response) => console.log('Success', response.data))
            .catch((error) => console.log('Failed', error));
    }

    return (
        <Row
            className="p-3"
            style={{
                borderTop: "1px solid #D3D3D3",
                borderBottom: "1px solid #D3D3D3"
            }}
        >
            <Col sm={1}>
                <Image src='/src/assets/tweet_pfp.jpg' fluid roundedCircle />
            </Col>

            <Col>
                <strong>Summer</strong>
                <span>@summer</span>
                <p>{content}</p>
                <div className="d-flex justify-content-between">
                    <Button variant="light">
                        <i className="bi bi-chat"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-repeat"></i>
                    </Button>
                    <Button variant="light">
                        {console.log(liked)}
                        <i className="bi bi-heart" onClick={liked ? handleUnlike : handleLike}>{likes}</i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-graph-up"></i>
                    </Button>
                    <Button variant="light">
                        <i className="bi bi-upload"></i>
                    </Button>
                </div>
            </Col>
        </Row>
    )
}