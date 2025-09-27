import { Button, Col, Image, Nav, Row } from 'react-bootstrap';
import ProfilePostCard from './ProfilePostCard';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

export default function ProfileMidBody() {
    const [posts, setPosts] = useState([]);

    const fetchPosts = (userId) => {
        fetch(
            `https://edd094d0-8e19-471b-bd57-24af5069bce6-00-ytyw0t7ntnoi.pike.replit.dev/posts/user/${userId}`
        )
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error("Error", error));
    }

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            fetchPosts(userId);
        }
    }, [])

    return (
        <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
            <Image src='/src/assets/wallpaper_tweet.png' style={{ height: '240px', width: '1500px' }} fluid />
            <br />
            <Image
                src='/src/assets/tweet_pfp.jpg'
                roundedCircle
                style={{
                    width: 150,
                    position: "absolute",
                    top: "140px",
                    border: "4px soid #F8F9FA",
                    marginLeft: 15,
                }}
            />

            <Row className="justify-content-end">
                <Col xs="auto">
                    <Button className="rounded-pill mt-2" variant="outline-secondary">
                        Edit Profile
                    </Button>
                </Col>
            </Row>

            <p className="mt-5" style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}>
                Summer
            </p>

            <p style={{ marginBottom: "2px" }}>summersnow@gmail.com</p>

            <p>I help people switch careers to be a software developer at sigmaschool.co</p>

            <p>Student</p>

            <p>
                <strong>271</strong> Following <strong>610</strong> Followers
            </p>

            <Nav variant="underline" defaultActiveKeys='/home' justify>
                <Nav.Item>
                    <Nav.Link eventKey="/home">Tweets</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/link-1">Replies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/link-2">Highlights</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/link-3">Media</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/link-4">Likes</Nav.Link>
                </Nav.Item>
            </Nav>
            {posts.map((post) => (
                <ProfilePostCard key={post.id} content={post.content} postId={post.id} />
            ))}
        </Col>
    )
}