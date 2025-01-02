import { Button, Col, Image, Row } from "react-bootstrap"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"

export default function ProfilePostCard({ content, postId }) {
    const [likes, setLikes] = useState([])

    const token = localStorage.getItem("authToken")
    const decode = jwtDecode(token)
    const userId = decode.id


    const pic = "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg"
    const BASE_URL = "https://5959126e-aff7-4bd3-8f2c-c666b8dbfd9a-00-2bm3di2cmkfwg.pike.replit.dev"

    useEffect(() => {
        fetch(`${BASE_URL}/likes/post${postId}`)
            .then((response) => response.json())
            .then((data) => setLikes(data))
            .catch((error) => console.error("ERROR", error))
    }, [postId])

    const isLiked = likes.some((like) => like.user_id === userId)

    const handleLike = () => (isLiked ? removeFromLikes() : addToLikes())

    const addToLikes = () => {
        axios.post(`${BASE_URL}/likes`, {
            user_id: userId,
            post_id: postId
        })
            .then((response) => {
                setLikes([...likes, { ...response.data, likes_id: response.data.id }])
            })
            .catch((error) => console.error("ERROR", error))
    }
    const removeFromLikes = () => {
        const like = likes.find((like) => like.user_id == userId)
        if (like) {
            axios
                .put(`${BASE_URL}/likes/${userId}/${postId}`)
                .then(() => {
                    setLikes(likes.filter((likesItem) => likesItem.user_id !== userId))
                })
                .catch((error) => console.error("error", error))
        }
    }


    return (
        <Row className="p-3" style={{ borderTop: "1px solid #d3d3d3", borderBottom: "1px solid #d3d3d3" }}>
            <Col sm={1}>
                <Image src={pic} fluid roundedCircle />
            </Col>

            <Col>
                <strong>Nyom-San</strong>
                <span>@nyom.san • Apr 1</span>
                <p>{content}</p>
                <p>Yoooo...</p>
                <div className="d-flex justify-content-between">
                    <Button variant="light">
                        <i className="bi bi-chat"></i>
                    </Button>

                    <Button variant="light">
                        <i className="bi bi-repeat"></i>
                    </Button>

                    <Button variant="light" onClick={handleLike}>
                        {isLiked ?
                            (<i className="bi bi-heart-fill text-danger"></i>) : (<i className="bi bi-heart"></i>)}
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