// Import libraries
import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
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
              <li><a href='/'>Log Out</a></li>
              <li><a href='/' target='_blank'>View Site</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
