// Import libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class WidgetPages extends Component {
  render() {
    return (
      <div className='card'>
        <Link className='float-right' to='/pages'>View All Pages</Link>

        <h2><Link to='/pages'>Pages</Link></h2>
        <p>You have a total of { this.props.pageIds.pages.length } pages.</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pageIds: state.pageIds
  };
}

export default connect(mapStateToProps)(WidgetPages);
