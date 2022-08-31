import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    result: [],
    loading: false,
    favoritos: [],

  };

  async componentDidMount() {
    await this.favorite();
    const { match: { params: { id } } } = this.props;
    const musicas = await getMusics(id);
    this.setState({
      result: musicas,

    });
  }

  createFavorite = async (e) => {
    this.setState({ loading: true }, async () => {
      await addSong(e);
      await this.favorite();
      this.setState({
        loading: false });
    });
  };

  favorite = async () => {
    const checked = await getFavoriteSongs();
    this.setState({ favoritos: checked });
  };

  render() {
    const { result, favoritos, loading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {result.length > 0 ? (
          <div>
            <p data-testid="artist-name">{result[0].artistName}</p>
            <p data-testid="album-name">{result[0].collectionName}</p>
          </div>)
          : <p>Musicas não encontradas</p>}
        {
          loading ? <Loading /> : result.map((element, index) => (index > 0 && (
            <div key={ element.trackId }>
              <label htmlFor="favorita">
                Favorita
                <input
                  name="favorita"
                  onClick={ async () => {
                    await this.createFavorite(element);
                    await this.favorite();
                  } }
                  data-testid={ `checkbox-music-${element.trackId}` }
                  type="checkbox"
                  defaultChecked={ favoritos.length > 0
                     && (favoritos.some((e) => e.trackName === element.trackName)) }
                />

              </label>
              <MusicCard
                key={ element.trackId }
                trackName={ element.trackName }
                previewUrl={ element.previewUrl }

              />
            </div>
          )))
        }

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
