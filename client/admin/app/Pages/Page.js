// Import libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Page extends Component {
  render() {
    const pageId = this.props.params['pageId'];
    const d = this.props.pageData[pageId];

    if (d) {
      return (
        <div>
          <h3>{ d.title }</h3>
          <h4>{ d.subtitle }</h4>
          <p>
            Page ID: <em>{ pageId }</em><br />
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
        <h3>This page does not exist.</h3>
        <p>Would you like to create it? <Link to='/pages/create'>Create this page.</Link></p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pageData: state.pageData
  };
}

export default connect(mapStateToProps)(Page);
