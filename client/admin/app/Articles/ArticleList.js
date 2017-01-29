// Import libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

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
      const articleHref = '/article/' + articleId;

      return (
        <li key={ articleId }>
          <Link to={ articleHref }>{ d ? d.title : articleId }</Link>
        </li> );
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
