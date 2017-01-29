// Import libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class WidgetArticles extends Component {
  render() {
    return (
      <div className='card'>
        <Link className='float-right' to='/articles'>View All Articles</Link>

        <h2><Link to='/articles'>Articles</Link></h2>
        <p>You have a total of { this.props.articleIds.articles.length } articles.</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articleIds: state.articleIds
  };
}

export default connect(mapStateToProps)(WidgetArticles);
