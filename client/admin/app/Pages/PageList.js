// Import libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class PageList extends Component {
  render() {
    return (
      <div>
        <h3>My Pages</h3>
        <p>This is a list of your pages.</p>
        <ul>
          { this.renderPages() }
        </ul>
      </div>
    );
  }

  renderPages() {
    if (!this.props.pageIds) return ( <li>Initializing...</li> );
    if (!this.props.pageIds.pages) return ( <li>Loading...</li> );

    return this.props.pageIds.pages.map((pageId) => {
      const d = this.props.pageData[pageId];
      const pageHref = '/page/' + pageId;

      return (
        <li key={ pageId }>
          <Link to={ pageHref }>{ d ? d.title : pageId }</Link>
        </li>
      );
    });
  }
}

function mapStateToProps(state) {
  return {
    pageIds: state.pageIds,
    pageData: state.pageData
  };
}

export default connect(mapStateToProps)(PageList);
