// Import libraries
import React from 'react';

// Import components
import WidgetArticles from './WidgetArticles';
import WidgetPages from './WidgetPages';

class Dashboard extends React.Component {
  render() {
    return (
      <div className='container'>
        <h1>Welcome back.</h1>
        <p>Here is an overview of your blog.</p>

        <WidgetArticles></WidgetArticles>
        <WidgetPages></WidgetPages>
      </div>
    );
  }
}

export default Dashboard;
