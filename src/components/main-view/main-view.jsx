import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [filteredMovies, setFilteredMovies] = useState([]);


    const onLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    };

    useEffect(() => {
        // bearer authorization
        if (!token) { return; }

        fetch("https://myflixdbjr-b47a7be5f2e2.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.Title,
                        image: movie.ImagePath,
                        Description: movie.Description,
                        Director: {
                            Name: movie.Director.Name
                        },
                        Genre: {
                            Name: movie.Genre.Name
                        },
                        Featured: movie.Featured
                    };
                });

                setMovies(moviesFromApi);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, [token]);

    useEffect(() => {
        setFilteredMovies(movies);
    }, [movies]);

    const handleSearchInput = (e) => {
        const searchWord = e.target.value.toLowerCase();
        let tempArray = movies.filter((movie) =>
            movie.title.toLowerCase().includes(searchWord)
        );
        setFilteredMovies(tempArray);
    };


    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                }}
                handleSearchInput={handleSearchInput}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col>
                                        <ProfileView
                                            user={user}
                                            token={token}
                                            setUser={setUser}
                                            movies={movies}
                                            onLogout={onLogout}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView
                                            movies={movies}
                                            user={user}
                                            setUser={setUser}
                                            token={token}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {filteredMovies.map((movie) => (
                                            <Col className="mb-4" key={movie.id} md={3}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
