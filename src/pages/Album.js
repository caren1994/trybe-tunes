import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    result: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musicas = await getMusics(id);
    this.setState({
      result: musicas,

    });
  }

  render() {
    const { result } = this.state;

    return (
      <div data-testid="page-album">
        {result.length > 0 ? (
          <div>
            <p data-testid="artist-name">{result[0].artistName}</p>
            <p data-testid="album-name">{result[0].collectionName}</p>
          </div>)
          : <p>Musicas não encontradas</p>}
        {
          result.map((element, index) => (index > 0 && (
            <MusicCard
              key={ element.trackId }
              trackName={ element.trackName }
              previewUrl={ element.previewUrl }
            />
          )))
        }

        <Header />
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
