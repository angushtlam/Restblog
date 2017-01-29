// Import libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import Redux actions
import { invalidateAllArticleData } from '../../actions/articleData';
import { invalidateAllArticleIds } from '../../actions/articleIds';
import { attemptLogin } from '../../actions/auth';

class Auth extends Component {
  constructor() {
    super();

    // The form related functions need to be bound to this component.
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  render() {
    return (
      <div className='auth'>
        <div className='content'>
          <h1 className='logo'>Restblog</h1>
          <p>Restricted Access</p>

          <form onSubmit={ this.handleLoginSubmit }>
            <label>
              Username
              <input type='text' name='username' ref={ (input) => this.username = input } />
            </label>
            <br />

            <label>
              Password
            <input type='password' name='password' ref={ (input) => this.password = input } />
            </label>
            <br />

            <button className='button button-outline' type='submit'>Login</button>
          </form>
        </div>
      </div>
    );
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    this.props.attemptLogin(this.username.value, this.password.value);
  }
}

function bindStateToProps(state) {
  return {
    auth: state.auth
  };
}

function bindDispatchToProps(dispatch) {
  return bindActionCreators({
    attemptLogin,
    invalidateAllArticleData: () => dispatch(invalidateAllArticleData()),
    invalidateAllArticleIds: () => dispatch(invalidateAllArticleIds())
  }, dispatch);
}

export default connect(bindStateToProps, bindDispatchToProps)(Auth);
