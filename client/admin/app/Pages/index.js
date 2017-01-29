// Import libraries
import React from 'react';
import { Link } from 'react-router';

class Pages extends React.Component {
  render() {
    return (
      <div className='container'>
        <Link className='float-right' to='/pages'>View All Pages</Link>

        { this.props.children }
      </div>
    );
  }
}

export default Pages;
