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
      const d = this.props.articleData[articleId];

      return ( <li key={ articleId }>{ d ? d.title : articleId }</li> );
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
