import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    isDisabled: true,
    user: '',
    redirect: false,
    loading: false,
  };

  handleChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        const { user } = this.state;
        const number = 3;
        const lengthUser = user.length;
        if (lengthUser >= number) {
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

  handleClick = async () => {
    const { user } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: user });
    this.setState({
      loading: false,
      redirect: true,
    });
  };

  render() {
    const { user, isDisabled, redirect, loading } = this.state;

    return (
      <div data-testid="page-login">
        {loading ? (
          <Loading />
        ) : (
          <form>
            <label htmlFor="name">
              Login:
              <textarea
                onChange={ this.handleChange }
                name="user"
                value={ user }
                data-testid="login-name-input"
              />
            </label>
            <button
              type="button"
              onClick={ this.handleClick }
              disabled={ isDisabled }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </form>
        )}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
