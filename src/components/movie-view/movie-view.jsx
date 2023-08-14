// Here you import the PropTypes library
import PropTypes from "prop-types"
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './movie-view.scss';;

export const MovieView = ({ movies, user, setUser, token }) => {
    const { movieId } = useParams();
    const [Favorite, setFavorite] = useState(false);

    useEffect(() => {
        if (user?.Favorite?.length && movieId) {
            setFavorite(user.Favorite.includes(movieId));
        }
    }, [user.Favorite, movieId]);

    const addFavorite = () => {
        fetch(`https://myflixdbjr-b47a7be5f2e2.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((data) => {
            setFavorite(true);
            user.Favorite.push(movieId);
            localStorage.setItem("user", JSON.stringify(data));
            setUser(user);
        })
    };

    const removeFavorite = () => {
        fetch(`https://myflixdbjr-b47a7be5f2e2.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
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
            setFavorite(false);
            user.Favorite = user.Favorite.filter((id) => id !== movieId);
            localStorage.setItem("user", JSON.stringify(data));
            setUser(user);
        })
    };


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

            {Favorite ? (
                <Button
                    className="back-button"
                    onClick={removeFavorite}>Remove from favorites</Button>
            ) : (
                <Button
                    className="back-button"
                    onClick={addFavorite}>Favorite</Button>
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

