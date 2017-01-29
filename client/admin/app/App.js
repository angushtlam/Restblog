// Import libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

// Import Redux
import { fetchArticleData } from '../actions/articleData';
import { fetchAllArticleIds } from '../actions/articleIds';

// Import custom components
import Auth from './Auth';

class App extends Component {
  constructor() {
    super();

    // The initialization functions need to be bound to this component.
    this.initializeArticleData = this.initializeArticleData.bind(this);
  }

  componentDidMount() {
    this.initializeArticleData();
  }

  componentDidUpdate() {
    this.initializeArticleData();
  }

  render() {
    // Ask for user to log in if they are not authenticated.
    const isAuthenticated = this.props.auth.isAuthenticated;
    if (!isAuthenticated) {
      return <Auth></Auth>;
    }

    // Otherwise show them the dashboard.
    return (
      <div>
        <Link to='/'><h1>Restblog Dashboard</h1></Link>
        { this.props.children }
      </div>
    );
  }

  initializeArticleData() {
    const isAuthenticated = this.props.auth.isAuthenticated;

    if (isAuthenticated) {
      const articleIds = this.props.articleIds;

      // Check if the articles need updating.
      if (articleIds.isInvalidated && !articleIds.isFetching) {
        this.props.fetchAllArticleIds();
      }

      // Only when the whole article list is updated, check if the individual articles if they need updating.
      if (!articleIds.isFetching && articleIds.articles) {
        articleIds.articles.map((articleId) => {
          const thisArticle = this.props.articleData[articleId];
          if (!thisArticle || (thisArticle.isInvalidated && !thisArticle.isFetching)) {
            this.props.fetchArticleData(articleId);
          }
        });
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    articleIds: state.articleIds,
    articleData: state.articleData,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchArticleData,
    fetchAllArticleIds
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
