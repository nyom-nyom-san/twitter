import { Navbar, Container, Button } from "react-bootstrap"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useLocalStorage from "use-local-storage"

export default function ProfilePage() {

    const [authToken, setAuthToken] = useLocalStorage("authToken", "")
    const navigate = useNavigate()

    useEffect(() => {
        if (!authToken) {
            navigate("/login")
        }
    }, [authToken, navigate])


    const handleLogout = () => {
        setAuthToken("")//Clear token from the local storage
    }

    return (
        <>
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="/">
                        <i className="bi bi-twitter" style={{ fontSize: 30, color: "dodgerblue" }}></i>
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Button variant="primary" onClick={handleLogout}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <h2>Your Profile</h2>
            </Container>
        </>
    )
}