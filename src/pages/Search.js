import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {

    nomeArtista: '',
    isDisabled: true,
    result: [],
    loading: false,
    nomerec: '',
  };

  handleChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        const { nomeArtista } = this.state;
        const number2 = 2;
        if (nomeArtista.length >= number2) {
          this.setState({
            isDisabled: false,
          });
        } else {
          this.setState({
            isDisabled: true,
          });
        }
      },
    );
  };

  handleReq = async () => {
    const { nomeArtista } = this.state;
    const gnome = nomeArtista;
    this.setState({ nomeArtista: '', loading: true }, async () => {
      const pesquisa = await searchAlbumsAPIs(nomeArtista);
      this.setState({
        loading: false,
        result: pesquisa,
        nomerec: gnome,
      });
    });
  };

  render() {
    const { isDisabled, nomeArtista, result, loading, nomerec } = this.state;
    return (
      <div data-testid="page-search">
        {loading === true ? (
          <Loading />
        ) : (
          <div>
            <form>
              <label htmlFor="name">
                Procurar:
                <input
                  type="text"
                  onChange={ this.handleChange }
                  name="nomeArtista"
                  value={ nomeArtista }
                  data-testid="search-artist-input"
                />
              </label>
              <button
                type="button"
                onClick={ this.handleReq }
                disabled={ isDisabled }
                data-testid="search-artist-button"
              >
                Pesquisar
              </button>
            </form>
            <Header />
          </div>
        )}

        <div>
          { result.length > 0 ? (
            <div>
              <p>{`Resultado de álbuns de: ${nomerec}`}</p>
              {
                result.map((element) => (
                  <div key={ element.artistId }>
                    <img src={ element.artworkUrl100 } alt={ element.artistName } />
                    <p>{`Álbum ${element.trackCount} ${element.collectionName}`}</p>
                    <p>{`Artista ${element.artistName}`}</p>
                    <Link
                      data-testid={ `link-to-album-${element.collectionId}` }
                      to={ `/album/${element.collectionId}` }
                    >
                      Album
                    </Link>
                  </div>
                ))
              }
            </div>)
            : (
              <p>Nenhum álbum foi encontrado</p>)}
        </div>
      </div>
    );
  }
}

export default Search;
