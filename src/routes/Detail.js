import React, { Component } from 'react';
import './Detail.css';

class Detail extends Component {
  componentDidMount() {
    const { location, history } = this.props;

    if (location.state === undefined) {
      history.push('/');
    }
  }

  render() {
    const { location } = this.props;

    if (location.state) {
      return (
        <div className="movies detail">
          <h1 className="detail__title">상세 페이지</h1>
          <div className="movie detail__movie">
            <img
              className="detail__poster"
              src={location.state.poster}
              alt={location.state.title}
              title={location.state.title}
            />
            <div className="movie__data">
              <h3 className="movie__title">{location.state.title}</h3>
              <h5 className="movie__year">{location.state.year}</h5>
              <ul className="movie__genres">
                {location.state.genres.map((genre, index) => (
                  <li className="genres__genre">{genre}</li>
                ))}
              </ul>
              <p className="movie__summary">{location.state.summary}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Detail;
