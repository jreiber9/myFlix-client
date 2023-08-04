import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, setUser, movies }) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.BirthDate);
    const favoriteMovies = movies.filter((movie) => {
        return user.FavoriteMovies.includes(movie.id)
    })

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            BirthDate: birthday
        };

        fetch(`https://myflixdbjr-b47a7be5f2e2.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                alert("Update failed.")
            }
        }).then((data) => {
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        })
    };
    console.log(favoriteMovies)

    return (
        <>
            <h1>Profile</h1>
            <Row>
                <Col>
                    <div>Username: {user.Username}</div>
                    <div>Email: {user.Email}</div>
                </Col>
            </Row>
            <Row>
                <h3>Update your profile info.</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minLength="5"
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="5"
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Update account</Button>
                </Form>
            </Row>
            <Row>
                <h3>Favorite movies:</h3>
                {favoriteMovies.map((movie) => (
                    <Col className="mb-5" key={movie.id} md={4}>
                        <MovieCard movie={movie}></MovieCard>
                    </Col>
                ))}
            </Row>
        </>
    )
}