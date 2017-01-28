// Import libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ArticleList extends Component {
  render() {
    return (
      <ul>
        { this.renderArticles() }
      </ul>
    );
  }

  renderArticles() {
    if (!this.props.articleIds) return ( <li>Initializing...</li> );
    if (!this.props.articleIds.articles) return ( <li>Loading...</li> );

    return this.props.articleIds.articles.map((articleId) => {
      return ( <li key={ articleId }>{ articleId }</li> );
    });
  }
}

function mapStateToProps(state) {
  return {
    articleIds: state.articleIds,
    articleData: state.articleData
  };
}

export default connect(mapStateToProps)(ArticleList);
