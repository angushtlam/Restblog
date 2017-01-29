// Import libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import Redux
import { checkSessionValidity } from '../actions/auth';
import { fetchArticleData, invalidateAllArticleData } from '../actions/articleData';
import { fetchAllArticleIds, invalidateAllArticleIds } from '../actions/articleIds';
import { fetchPageData, invalidateAllPageData } from '../actions/pageData';
import { fetchAllPageIds, invalidateAllPageIds } from '../actions/pageIds';

// Import custom components
import Auth from './Auth';
import Header from './components/Header';

// Import styling
import './styles/base.scss';

class App extends Component {
  constructor() {
    super();

    // The initialization functions need to be bound to this component.
    this.initializeArticleData = this.initializeArticleData.bind(this);
    this.initializePageData = this.initializePageData.bind(this);
  }

  componentDidMount() {
    this.props.checkSessionValidity(this.props.auth.accessKey);

    // Clear data old data, so there are no residual data.
    this.props.invalidateAllArticleData();
    this.props.invalidateAllArticleIds();
    this.props.invalidateAllPageData();
    this.props.invalidateAllPageIds();

    if (!this.props.auth.isValidating && this.props.auth.isAuthenticated) {
      this.initializeArticleData();
      this.initializePageData();
    }
  }

  componentDidUpdate() {
    if (!this.props.auth.isValidating && this.props.auth.isAuthenticated) {
      this.initializeArticleData();
      this.initializePageData();
    }
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
        <Header></Header>
        { this.props.children }
      </div>
    );
  }

  initializeArticleData() {
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
          this.props.fetchArticleData(articleId, this.props.auth.accessKey);
        }
      });
    }
  }

  initializePageData() {
    const pageIds = this.props.pageIds;

    // Check if the articles need updating.
    if (pageIds.isInvalidated && !pageIds.isFetching) {
      this.props.fetchAllPageIds();
    }

    // Only when the whole article list is updated, check if the individual articles if they need updating.
    if (!pageIds.isFetching && pageIds.pages) {
      pageIds.pages.map((pageId) => {
        const thisPage = this.props.pageData[pageId];
        if (!thisPage || (thisPage.isInvalidated && !thisPage.isFetching)) {
          this.props.fetchPageData(pageId, this.props.auth.accessKey);
        }
      });
    }
  }
}

function mapStateToProps(state) {
  return {
    articleIds: state.articleIds,
    articleData: state.articleData,
    auth: state.auth,
    pageIds: state.pageIds,
    pageData: state.pageData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkSessionValidity,
    fetchArticleData,
    fetchAllArticleIds,
    fetchPageData,
    fetchAllPageIds,
    invalidateAllArticleData: () => dispatch(invalidateAllArticleData()),
    invalidateAllArticleIds: () => dispatch(invalidateAllArticleIds()),
    invalidateAllPageData: () => dispatch(invalidateAllPageData()),
    invalidateAllPageIds: () => dispatch(invalidateAllPageIds())
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
