// Here you import the PropTypes library
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card>
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>.
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Button onClick={() => onMovieClick(Movie)} variant="link">
                    Open
                </Button>
            </Card.Body>
        </Card>
    );
};

{/* <div
    onClick={() => {
        onMovieClick(movie);
    }}
>
    {movie.title}
</div>
    );
}; */}

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};