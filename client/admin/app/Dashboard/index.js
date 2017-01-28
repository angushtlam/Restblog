// Import libraries
import React from 'react';
import { Link } from 'react-router';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <p>Dashboard</p>
        <Link to="/articles">View All Articles</Link>
      </div>
    );
  }
}

export default Dashboard;
