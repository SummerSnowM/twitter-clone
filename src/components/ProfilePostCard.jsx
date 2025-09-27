import { Button, Col, Image, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function ProfilePostCard({ content, postId }) {
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        fetch(`https://edd094d0-8e19-471b-bd57-24af5069bce6-00-ytyw0t7ntnoi.pike.replit.dev/likes/post/${postId}`)
            .then((response) => response.json())
            .then((data) => setLikes(data.length))
            .catch((error) => console.error("Error", error));
    }, [postId]);

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
                        <i className="bi bi-heart">{likes}</i>
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