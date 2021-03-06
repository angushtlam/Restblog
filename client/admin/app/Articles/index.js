// Import libraries
import React from 'react';
import { Link } from 'react-router';

class Articles extends React.Component {
  render() {
    return (
      <div className='container'>
        <Link className='float-right' to='/articles'>View All Articles</Link>

        { this.props.children }
      </div>
    );
  }
}

export default Articles;
