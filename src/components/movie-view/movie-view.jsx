// Here you import the PropTypes library
import PropTypes from "prop-types"
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './movie-view.scss';;

export const MovieView = ({ movies, user, setUser, token }) => {
    const { movieId } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const isFavorited = user.FavoriteMovies.includes(movieId)
        setIsFavorite(isFavorited)
    }, []);

    const removeFavorite = () => {
        fetch(`https://myflixdbjr-b47a7be5f2e2.herokuapp.com/users/${user.Username}/${movieId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((data) => {
            setIsFavorite(false);
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        })
    };

    const addToFavorite = () => {
        fetch(`https://myflixdbjr-b47a7be5f2e2.herokuapp.com/users/${user.Username}/${movieId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((data) => {
            setIsFavorite(true);
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        })

        const movie = movies.find((m) => m.id === movieId);
        return (
            <div>
                <div>
                    <img className="w-50" src={movie.image} />
                </div>
                <div>
                    <span>Title: </span>
                    <span>{movie.title}</span>
                </div>
                <div>
                    <span>Description: </span>
                    <span>{movie.Description}</span>
                </div>
                <div>
                    <span>Director: </span>
                    <span>{movie.Director.Name}</span>
                </div>
                <div>
                    <span>Genre: </span>
                    <span>{movie.Genre.Name}</span>
                </div>
                {isFavorite ? (
                    <Button onClick={removeFavorite}>Remove from favorites</Button>
                ) : (
                    <Button onClick={addToFavorite}>Add to favorites</Button>
                )}
                <Link to={`/`}>
                    <button
                        className="back-button"
                        style={{ cursor: "pointer" }}
                    >
                        Back
                    </button>
                </Link>
            </div>
        );
    };

    //PropType conditions
    MovieView.propTypes = {
        movie: PropTypes.shape({
            ImagePath: PropTypes.string.isRequired,
            Title: PropTypes.string.isRequired,
            Genre: PropTypes.shape({
                Name: PropTypes.string.isRequired
            }),
            Description: PropTypes.string.isRequired,
            Director: PropTypes.shape({
                Name: PropTypes.string.isRequired
            }),
            Featured: PropTypes.bool.isRequired
        }).isRequired,
        onBackClick: PropTypes.func.isRequired
    };