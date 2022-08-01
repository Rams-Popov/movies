import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import css from './moviesListCard.module.css';
import {movieActions} from "../../redux";
import {backgroundURL, noImageURL, posterURL} from "../../constants";
import {GenreBadge} from "../genreBadge/GenreBadge";
import StarsRating from "../starsRating/StarsRating";

const MoviesListCard = ({movieId}) => {

    const {oneMovie} = useSelector(state => state.movie);
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(movieActions.getOne({id: movieId.slice(1)}));
    }, [dispatch, movieId]);

    useEffect(() => {
        if (oneMovie) {

            if (oneMovie.backdrop_path) {
                setImage(oneMovie.backdrop_path);
            } else {
                setImage(oneMovie.poster_path);
            }
        }
    }, [oneMovie])

    return (
        <div>
            {oneMovie &&
                <div>
                    <div className={css.movieInfoImage} style={{
                        backgroundImage: `url(${image? backgroundURL + image : noImageURL})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        width: "98.7vw",
                        height: "100vh",
                    }}/>

                    <div className={css.movieInfoBlock}>
                        <h2>{oneMovie.title.toUpperCase()} </h2>

                        {oneMovie.genres.map(genre => <GenreBadge key={genre.id} genreName={genre.name}/>)}

                        <p>{oneMovie.overview}</p>

                        <div>
                            Vote average: {oneMovie.vote_average} <br/>
                            Vote count: {oneMovie.vote_count}
                            <StarsRating size={20} allowHover={true} movieRating={oneMovie.vote_average} vote={true}/>
                        </div>

                        <div className={css.companyImagesBlock}>{
                            oneMovie.production_companies.map(company => {
                                const image = posterURL + company.logo_path;
                                return (company.logo_path && <img src={image} alt="" key={company.id}/>);
                            })}
                        </div>
                    </div>

                </div>
            }
        </div>
    );
};

export {
    MoviesListCard
};