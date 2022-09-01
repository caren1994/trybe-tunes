import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    result: [],
    loading: false,
    favoritos: [],

  };

  async componentDidMount() {
    await this.favorite();// chamo antes de redenzirar o componente para saber se tem algo no local
    const { match: { params: { id } } } = this.props;// pego o id do album
    const musicas = await getMusics(id);// faz a requisição a api e retorna as musicas do album recebe como argumento o id passado na rota album:id
    this.setState({
      result: musicas, // guardo as musicas e as informaçoes do cantor ou banda no estado result

    });
  }

  createFavorite = async (element) => {
    const { favoritos } = this.state;
    const novamusica = favoritos.some((e) => e.trackName === element.trackName);
    if (novamusica) {
      this.setState({ loading: true }, async () => {
        await removeSong(element);// removo a musica
        await this.favorite();// atualizo o array com a musica favoritada removida
        this.setState({ loading: false });
      });
    } else {
      this.setState({ loading: true }, async () => { // muda o loading para true e lá embaixo no render mostra o componente Loading
        await addSong(element);// adc no local story
        await this.favorite();// chamo a função de pegar os itens,após ser salvo
        this.setState({ loading: false });// retorno para falso
      });
    }
  };

  favorite = async () => {
    const pegalocal = await getFavoriteSongs();// pego do local story
    this.setState({ favoritos: pegalocal });// favoritos recebe os dados do local
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
