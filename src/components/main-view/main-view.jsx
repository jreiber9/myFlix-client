import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Interstellar",
            description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
            image:
                "https://m.media-amazon.com/images/I/A1JVqNMI7UL._AC_UF894,1000_QL80_.jpg",
            genre: "Sci-fi",
            director: "Christopher Nolan"
        },
        {
            id: 2,
            title: "Jaws",
            description: "When a killer shark unleashes chaos on a beach community off Cape Cod, it's up to a local sheriff, a marine biologist, and an old seafarer to hunt the beast down.",
            image:
                "https://m.media-amazon.com/images/I/71eMMDtyi8L._AC_UF894,1000_QL80_.jpg",
            genre: "Thriller",
            director: "Steven Spielberg"
        },
        {
            id: 3,
            title: "Hook",
            description: "When Captain James Hook kidnaps his children, an adult Peter Pan must return to Neverland and reclaim his youthful spirit in order to challenge his old enemy.",
            image:
                "https://m.media-amazon.com/images/I/71qogNdrdFL._RI_.jpg",
            genre: "Adventure",
            director: "Steven Spielberg"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};
