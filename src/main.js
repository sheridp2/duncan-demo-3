import '../style/main.scss'

import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent'

const API_URL = 'http://www.reddit.com/r'

let renderIf = (test, component) => test ? component : undefined;

class SearchForm extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      searchText: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({
      searchText: e.target.value,
    })
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.handleSearch(this.state.searchText)
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
      <label> {this.props.title} </label>
      <input
        type='text'
        onChange={this.handleChange}
        value={this.state.searchText}
        />
        <button type='submit'> search </button>
      </form>
    )
  }
}

class SearchResultsList extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    let articles = this.props.articles || []
    return(
    <ul>
      {articles.map((item, i )=>
      <li key={i}>
        <a target="_blank" href ={item.data.url}> {item.data.title}</a>
      </li>
    )}
    </ul>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      results: null,
      searchErrorMessage: null,
    }
    this.redditBoardFetch = this.redditBoardFetch.bind(this);
  }

  componentDidUpdate(){
    console.log('___STATE___', this.state);
  }

  redditBoardFetch(board){
    superagent.get(`${API_URL}/${board}.json`)
    .then(res =>{
      console.log('request success', res);
      this.setState ({
        results : res.body.data.children,
        searchErrorMessage: null,
      })
    })
    .catch(err =>{
      console.error(err)
      this.setState({
        results: null,
        searchErrorMessage: `unable to find board ${board}`
      })
    })
  }

  render(){
    return(
      <main>
        <h1>home</h1>
        <SearchForm title= 'Reddit board' handleSearch={this.redditBoardFetch} />
        {renderIf(this.state.results,
          <SearchResultsList articles={this.state.results} /> )}
        {renderIf(this.state.searchErrorMessage,
          <p> {this.state.searchErrorMessage} </p> )}
      </main>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))
