import '../style/main.scss'

import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent'

cosnt API_URL = 'http://www.reddit.com/r'

class SearchForm extends React.Component{
  render(){

  }
}

class SearchResultsList extends React.Component{
  render(){

  }
}

class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      results: null,
      searchErrorMessage; null,
    }
    this.redditBoardFetch = this.redditBoardFetch.bind(this);
  }

  componentDidUpdate(){
    console.log('___STATE___', this.state);
  }

  redditBoardFetch(board){
    superagent.get(`${APUI_URL}/${board}.json`)
    .then(res =>{
      this.setState ({
        results : res.body,
        searchErrorMessage: null,
      })
    })
    .catch(err =>{
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
        <SearchForm />
        <SearchResultsList />
      </main>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))
