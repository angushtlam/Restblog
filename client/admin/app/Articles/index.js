// Import libraries
import React from 'react';
import { Link } from 'react-router';

class Articles extends React.Component {
  render() {
    return (
      <div>
        <h2>Articles</h2>
        <Link to='/articles'>View All</Link>
        { this.props.children }
      </div>
    );
  }
}

export default Articles;
