// Import libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import Redux
import { fetchAllArticleIds } from '../actions/articleIds';

class App extends Component {
  componentDidMount() {
    this.props.fetchAllArticleIds();
  }

  render() {
    return (
      <div>
        <h1>Restblog Dashboard</h1>
        { this.props.children }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchAllArticleIds
  }, dispatch);
}

export default connect(() => { return {}; }, mapDispatchToProps)(App);
