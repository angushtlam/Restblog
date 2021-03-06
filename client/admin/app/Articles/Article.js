// Import libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Article extends Component {
  render() {
    const articleId = this.props.params['articleId'];
    const d = this.props.articleData[articleId];

    if (d) {
      return (
        <div>
          <h3>{ d.title }</h3>
          <h4>{ d.subtitle }</h4>
          <p>
            Article ID: <em>{ articleId }</em><br />
            Author: <em>{ d.author }</em><br />
            Published: <em>{ d.isPublished ? 'Yes' : 'No' }</em><br />
            Created At: <em>{ new Date(d.createdAt).toString() }</em><br />
            Last Updated: <em>{ new Date(d.lastUpdated).toString() }</em><br />
          </p>

          <p>
            { d.body }
          </p>
        </div>
      );
    }

    return (
      <div>
        <h3>This article does not exist.</h3>
        <p>Would you like to create it? <Link to='/articles/create'>Create this article.</Link></p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articleData: state.articleData
  };
}

export default connect(mapStateToProps)(Article);
