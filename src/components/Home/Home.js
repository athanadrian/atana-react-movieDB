import React, { Component } from 'react';
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE
} from "../../config";

import './Home.css';

import HeroImage from '../elements/HeroImage/HeroImage';
// import CragImage from '../elements/CragImage/CragImage';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
//import CragThumb from '../elements/CragThumb/CragThumb';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';


class Home extends Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: ""
  };

  fetchItems = endPoint => {
    fetch(endPoint)
      .then(result => result.json())
      .then(result => {
        this.setState({
          movies: [...this.state.movies, ...result.results],
          heroImage: this.state.heroImage || result.results[0],
          loading: false,
          currentPage: result.page,
          totalPages: result.total_pages
        }, () => {
          if(this.state.searchTerm===''){
            localStorage.setItem('HomeState', JSON.stringify(this.state))
          }
        });
      });
  };

  componentDidMount() {
    if (localStorage.getItem('HomeState')) {
      const state = JSON.parse(localStorage.getItem('HomeState'))
      this.setState({...state})
    } else {
      this.setState({ loading: true });
      const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US$page=1`;
      this.fetchItems(endPoint);
    }
  }

  searchItems = searchTerm => {
    let endPoint = "";
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    });

    if (searchTerm === "") {
      endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endPoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endPoint);
  };

  loadMoreItems = () => {
    let endPoint = "";
    this.setState({ loading: false });

    if (this.state.searchTerm === "") {
      endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${this
        .state.currentPage + 1}`;
    } else {
      endPoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${
        this.state.searchTerm
      }&page=${this.state.currentPage + 1}`;
    }

    this.fetchItems(endPoint);
  };

  render() {
    //ES6 state destructuring ->less code
    const {heroImage, movies, loading, currentPage, totalPages, searchTerm} = this.state;

    return (
      <div className="rmdb-home">
        {heroImage ? (
          <div>
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${
                heroImage.backdrop_path
              }`}
              title={heroImage.original_title}
              text={heroImage.overview}
            />
            <SearchBar callback={this.searchItems} />
          </div>
        ) : null}
        <div className="rmdb-home-grid">
          <FourColGrid
            header={searchTerm ? "Search Result" : "Popular Movies"}
            loading={loading}
          >
            {movies.map((element, index) => {
              return (
                <MovieThumb
                  key={index}
                  clickable={true}
                  image={
                    element.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                      : "./images/no_image.jpg"
                  }
                  movieId={element.id}
                  movieName={element.original_title}
                />
              );
            })}
          </FourColGrid>
          {loading ? <Spinner /> : null}
          {currentPage <= totalPages &&
          !loading ? (
            <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;