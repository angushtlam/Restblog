// Import libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      subtitle: '',
      body: '',
      isPublished: false,
      silentUpdate: false,
      loadInitial: false
    };

    // Bind to custom component functions.
    this.loadInitialData = this.loadInitialData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.loadInitialData();
  }

  componentDidUpdate() {
    this.loadInitialData();
  }

  render() {
    const pageId = this.props.params['pageId'];
    const d = this.props.pageData[pageId];

    if (this.state.loadInitial && this.props.pageData && d) {
      return (
        <div>
          <h3>{ this.state.title }</h3>
          <p>You are now updating this page.</p>

          <form className='edit'>
            <label>Title</label>
            <input disabled={ !this.state.loadInitial }
                   name='title'
                   onChange={ this.handleInputChange }
                   placeholder='Title'
                   type='text'
                   value={ this.state.title } />

            <label>Subtitle</label>
            <input disabled={ !this.state.loadInitial }
                   name='subtitle'
                   onChange={ this.handleInputChange }
                   placeholder='Subtitle'
                   type='text'
                   value={ this.state.subtitle } />

            <label>Body</label>
            <textarea disabled={ !this.state.loadInitial }
                      id='body'
                      onChange={ this.handleInputChange }
                      placeholder='Body'
                      value={ this.state.body }></textarea>

            <button className='button float-right' type='submit'>Update</button>

            <input disabled={ !this.state.loadInitial }
                   checked={ this.state.isPublished }
                   name='isPublished'
                   onChange={ this.handleInputChange }
                   type='checkbox' />
            <label className='label-inline'>Publish page</label>
            <br />

            <input disabled={ !this.state.loadInitial }
                   checked={ this.state.silentUpdate }
                   name='silentUpdate'
                   onChange={ this.handleInputChange }
                   type='checkbox' />
            <label className='label-inline'>Silently update this page</label>
            <br />
          </form>

          <p>
            Page ID: <em>{ pageId }</em><br />
            Author: <em>{ d.author }</em><br />
            Created At: <em>{ new Date(d.createdAt).toString() }</em><br />
            Last Updated: <em>{ new Date(d.lastUpdated).toString() }</em><br />
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

  loadInitialData() {
    const pageId = this.props.params['pageId'];
    const d = this.props.pageData[pageId];

    if (!this.state.loadInitial && this.props.pageData && d) {
      // Want To Buy: Javascript String cloning.
      this.setState({
        title: JSON.parse(JSON.stringify(d.title)),
        subtitle: JSON.parse(JSON.stringify(d.subtitle)),
        body: JSON.parse(JSON.stringify(d.body)),
        isPublished: JSON.parse(JSON.stringify(d.isPublished)),
        loadInitial: true
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
}

function mapStateToProps(state) {
  return {
    pageData: state.pageData
  };
}

export default connect(mapStateToProps)(Page);
