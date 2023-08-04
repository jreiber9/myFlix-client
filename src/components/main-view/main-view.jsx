import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    // const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        // bearer authorization
        if (!token) return;

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


    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                }}
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
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
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
                                        {movies.map((movie) => (
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
//     return (
//         <Row className="justify-content-md-center">
//             {!user ? (
//                 <Col md={5}>
//                     <LoginView
//                         onLoggedIn={(user, token) => {
//                             setUser(user);
//                             setToken(token);
//                         }}
//                     />
//                     or
//                     < SignupView />
//                 </Col>

//             ) : selectedMovie ? (
//                 <Col md={8}>
//                     <MovieView
//                         movie={selectedMovie}
//                         onBackClick={() => setSelectedMovie(null)}
//                     />
//                 </Col>
//             ) : movies.length === 0 ? (
//                 <div> The list is empty</div>
//             ) : (
//                 <>
//                     <button
//                         onClick={() => {
//                             setUser(null);
//                             setToken(null);
//                             localStorage.clear();
//                         }}
//                     >Logout</button>
//                     {movies.map((movie) => (
//                         <Col className="mb-4" key={movie.Title} md={3}>
//                             <MovieCard
//                                 movie={movie}
//                                 onMovieClick={(newSelectedMovie) => {
//                                     setSelectedMovie(newSelectedMovie);
//                                 }}
//                             />
//                         </Col>
//                     ))}
//                 </>
//             )}
//         </Row>
//     );
// };

