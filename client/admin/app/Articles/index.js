// Import libraries
import React from 'react';

// Import custom components
import ArticleList from './ArticleList';

class Articles extends React.Component {
  render() {
    return (
      <div>
        <h2>Articles</h2>
        <ArticleList></ArticleList>
      </div>
    );
  }
}

export default Articles;
