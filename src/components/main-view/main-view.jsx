import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://myflixdbjr-b47a7be5f2e2.herokuapp.com/movies")
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
            });
    }, []);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div> The list is empty</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.Title}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};
