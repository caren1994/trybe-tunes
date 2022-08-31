import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

import Loading from '../pages/Loading';

class Header extends React.Component {
  state = {
    loading: true,
    user: '',
  };

  async componentDidMount() {
    const usuario = await getUser();
    console.log(usuario); // lembrar sempre de ver oq esta sendo retornado
    this.setState({
      loading: false,
      user: usuario.name,
    });
  }

  render() {
    const { loading, user } = this.state;

    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : <h1 data-testid="header-user-name">{user}</h1>}
        <Link to="/search" data-testid="link-to-search">
          Search
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          Favorites
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          Profile
        </Link>
      </header>
    );
  }
}
export default Header;
