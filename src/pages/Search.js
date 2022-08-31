import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    nome: '',
    isDisabled: true,
  };

  handleChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        const { nome } = this.state;
        const number2 = 2;
        if (nome.length >= number2) {
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

  render() {
    const { nome, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <form>
          <label htmlFor="name">
            Procurar:
            <textarea
              onChange={ this.handleChange }
              name="nome"
              value={ nome }
              data-testid="search-artist-input"
            />
          </label>
          <button
            type="button"
            //   onClick={ this. }
            disabled={ isDisabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
        <Header />
      </div>
    );
  }
}

export default Search;
