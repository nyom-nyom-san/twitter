import { Col, Image, Row, Button, Modal, Form } from "react-bootstrap"
import { useState } from "react"
import axios from "axios"

export default function AuthPage() {
    const loginImage = "https://sig1.co/img-twitter-1"
    const url = "https://5959126e-aff7-4bd3-8f2c-c666b8dbfd9a-00-2bm3di2cmkfwg.pike.replit.dev"
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${url}/signup`, { username, password })
            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Row className="justify-content-center">
            <Col md={6}>
                <Image src={loginImage} fluid />
            </Col>
            <Col md={6}>
                <i className="bi bi-twitter" style={{ fontSize: 50, color: "dodgerblue" }}></i>

                <p className="mt-5" style={{ fontSize: 64 }}>Happening Now</p>
                <h2 className="my-5" style={{ fontSize: 31 }}><b>Join Twitter Today</b></h2>

                {/* Google */}
                <Col sm={5} className="d-grid gap-2">
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-google"></i> Sign up with Google
                    </Button>
                    {/* Apple */}
                    <Button className="rounded-pill" variant="outline-dark">
                        <i className="bi bi-apple"></i> Sign up with Apple
                    </Button>
                    {/* Create Account */}

                    <p style={{ textAlign: "center" }}>or</p>
                    <Button className="rounded-pill" onClick={handleShow}>Create an Account</Button>
                    <p style={{ fontSize: "12px" }}> By signing up, you agree to the TErms of Service and Privacy Policy including Cookie Use</p>

                    <p className="mt-5" style={{ fontWeight: "bold" }}> Already have an account?</p>
                    <Button className="rounded-pill" variant="outline-dark">Sign in</Button>
                </Col>

                {/* Sign Up */}
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Body>
                        <h2 className="mb-4" ><b>Create your account</b></h2>
                        <Form className="d-grid gap-2 px-5" onSubmit={handleSignUp}>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control onChange={(e) => setUsername(e.target.value)}
                                    type="email" placeholder="Enter Email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" />
                            </Form.Group>

                            <p>By signing up, you agree to the Terms of Service and Privacy Policy including Cookie Use. SigmaTweets may use your contanct information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalising our services, indluding ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here</p>

                            <Button className="rounded-pill" type="submit">Sign-up</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Col>
        </Row>
    )
}