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

  componentWillMount() {
    // Clear data if the user is not authenticated, just in case.
    // this.props.invalidateArticleIds();
    // this.props.invalidateArticleData();
  }

  render() {
    return (
      <div>
        <h3>You are unauthorized. Please log in.</h3>
        <form onSubmit={ this.handleLoginSubmit }>
          <label>
            Username
            <input type="text" name="username" ref={ (input) => this.username = input } />
          </label>
          <br />

          <label>
            Password
          <input type="password" name="password" ref={ (input) => this.password = input } />
          </label>
          <br />

          <input type="submit" value="Login" />
        </form>
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
