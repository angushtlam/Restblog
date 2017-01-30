// Import libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

// Import Redux actions
import { updatePageData } from '../../actions/pageData';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      subtitle: '',
      body: '',
      isPublished: false,
      silentUpdate: false,
      loadInitial: false,
      receivedAt: new Date()
    };

    // Bind to custom component functions.
    this.loadInitialData = this.loadInitialData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleForm = this.handleForm.bind(this);
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
      const fetchingMessage = d.isFetching ? '...' : 'k';

      return (
        <div>
          <h3>{ this.state.title }</h3>
          <p>You are now updating this page.</p>

          <form className='edit' onSubmit={this.handleForm} >
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
                      name='body'
                      onChange={ this.handleInputChange }
                      placeholder='Body'
                      value={ this.state.body }></textarea>

            <button className='button float-right' type='submit'>Update { fetchingMessage }</button>

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

    // TODO: There is probably some kind of logical simplification I can do here.
    const isOutdated = !this.state.loadInitial || (d !== undefined && this.state.receivedAt < d.receivedAt);
    if (this.props.pageData && d && isOutdated) {
      // Want To Buy: Javascript object cloning. Well I guess to be fair it's all client side so its k...
      this.setState({
        title: JSON.parse(JSON.stringify(d.title)),
        subtitle: JSON.parse(JSON.stringify(d.subtitle)),
        body: JSON.parse(JSON.stringify(d.body)),
        isPublished: JSON.parse(JSON.stringify(d.isPublished)),
        receivedAt: JSON.parse(JSON.stringify(d.receivedAt)),
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

  handleForm(event) {
    event.preventDefault();

    const pageId = this.props.params['pageId'];
    this.props.updatePageData(pageId, {
      title: this.state.title,
      subtitle: this.state.subtitle,
      body: this.state.body,
      isPublished: this.state.isPublished,
      silentUpdate: this.state.silentUpdate
    }, this.props.auth.accessKey);
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    pageData: state.pageData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updatePageData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);
