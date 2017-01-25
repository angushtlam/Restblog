// Import libraries
import React from 'react';

class Admin extends React.Component {
  render() {
    return (
      <div>
        <h1>Restblog Dashboard</h1>
        { this.props.children }
      </div>
    );
  }
}

export default Admin;
