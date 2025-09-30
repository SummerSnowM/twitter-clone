import { getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { Navbar, Container, Button, Row } from 'react-bootstrap'
// import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthProvider';
// import useLocalStorage from 'use-local-storage';
import ProfileSideBar from '../components/ProfileSideBar';
import ProfileMidBody from '../components/ProfileMidBody'

export default function ProfilePage() {
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!currentUser) {
        navigate('/login');
    }

    const handleLogout = () => {
        auth.signOut();
    }
    return (
        <>
            <Container>
                <Row>
                    <ProfileSideBar handleLogout={handleLogout} />
                    <ProfileMidBody />
                </Row>
            </Container>
        </>
    )
}