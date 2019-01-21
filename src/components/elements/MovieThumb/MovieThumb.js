import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import './MovieThumb.css';

//ES6 Destructuring props ->less code
const MovieThumb = ({clickable, movieId, movieName, image}) => {
  return (
    <div className="rmdb-moviethumb">
    {clickable ?
      <Link to={{pathname:`/${movieId}`, movieName:`${movieName}`}}>
        <img src={image} alt="moviethumb" />
      </Link>
       : <img src={image} alt="moviethumb" />}
    </div>
  )
}

MovieThumb.propTypes = {
  clickable: PropTypes.bool,
  movieId: PropTypes.number,
  image: PropTypes.string,
  movieName: PropTypes.string
}

export default MovieThumb;