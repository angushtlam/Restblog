// Import libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

// Import Redux
import { attemptSessionInvalidation } from '../../actions/auth';

class Header extends Component {
  constructor() {
    super();

    // The initialization functions need to be bound to this component.
    this.logOut = this.logOut.bind(this);
  }

  render() {
    return (
      <div className='header'>
        <div className='container'>
          <Link to='/'><span className='logo'>Restblog</span></Link>
          <div className='nav-links'>
            <ul>
              <li><Link to='/articles'>Articles</Link></li>
              <li><Link to='/pages'>Pages</Link></li>
            </ul>
            <ul className='float-right'>
              <li><a href='#' onClick={ this.logOut }>Log Out</a></li>
              <li><a href='/' target='_blank'>View Site</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  logOut(event) {
    event.preventDefault();
    this.props.attemptSessionInvalidation(this.props.auth.accessKey);
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    attemptSessionInvalidation
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
