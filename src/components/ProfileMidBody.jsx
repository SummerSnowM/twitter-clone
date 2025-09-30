import { Button, Col, Image, Nav, Row, Spinner, Form } from 'react-bootstrap';
import ProfilePostCard from './ProfilePostCard';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostsByUser, searchPosts } from '../features/posts/postsSlice';

export default function ProfileMidBody() {
    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();
    const posts = useSelector(store => store.posts.posts)
    const loading = useSelector(store => store.posts.loading)

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            dispatch(fetchPostsByUser(userId))
        }
    }, [dispatch])

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
            <Form onSubmit={e => {
                e.preventDefault();
                dispatch(searchPosts(searchTerm))
            }}>
                <Form.Control
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    type="text"
                />
                <Button type="submit">Search</Button>
            </Form>
            {loading && (
                <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
            )}
            {posts.map((post) => (
                <ProfilePostCard key={post.id} content={post.content} postId={post.id} />
            ))}
        </Col>
    )
}