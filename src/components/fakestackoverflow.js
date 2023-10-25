import Model from '../models/model.js';
import LeftMenu from './leftMenu.js'
import Homepage from './homepage.js'
import React from 'react';
import Search from './searching.js'

let model = new Model();
class FakeStackOverflow extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      page:1,
      questions:model.getAllQstns().sort((a, b) => b.askDate - a.askDate),
      answers:model.getAllAnswers(),
      tags:model.getAllTags(),
      active:null,
      unanswer:[],
      searching: []
    }
    this.updateState = this.updateState.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
    this.updateAnswers = this.updateAnswers.bind(this);
    this.updateTags = this.updateTags.bind(this);
    this.updateSearching = this.updateSearching.bind(this);
    this.searchByTags = this.searchByTags.bind(this);
    this.checkHyperLink = this.checkHyperLink.bind(this);
  }
  
  updateState(newState){
    this.setState({page:newState});
  }
  updateQuestions(updatedQuestions){
    this.setState({ questions: updatedQuestions });
  }

  updateAnswers(updatedAnswers){
        this.setState({answers: updatedAnswers});
  }

  updateTags(updatedTags){
    this.setState({ tags: updatedTags });
  }

  updateSearching(updateSearch){
    this.setState({searching:updateSearch})
  }
  searchByTags(tag){
    var search_arr = [];
    var tag_arr = [tag];
    this.state.questions.forEach(question => {
      if(this.check_exist_byTag(question,tag_arr) === true){
        search_arr.push(question);
      }
    });
    this.setState({page:7, searching: search_arr});
  }
  check_exist_byTag(question,tag_search){
    const tags = this.state.tags;
    const tag_arr = question.tagIds;
    var tag_in_ids = [];
    for(let i = 0; i<tag_search.length;i++){
      
      for(let j = 0;j<tags.length;j++){
        
        if(tag_search[i] === tags[j].name){
          tag_in_ids.push(tags[j].tid);
        }
      }
    }
    
    for(let i = 0; i < tag_arr.length; i++){
      for(let j = 0; j< tag_in_ids.length;j++){
        if(tag_arr[i] === tag_in_ids[j]){
          return true;
        }
      }
    }
    return false;
  }

  checkHyperLink(){
    const questions = this.state.questions;
    for (const question of questions) {
      question.hyper = 0; // 0 stand for error, 1 stand for true, 2 stand for incorrect format
      question.hyperText = [];
      question.hyperLinks = [];
    }
    const regex = /\[([^\]]+)\]\(([^\s]+)\)/g;
    
    for (const question of questions) {
      const matches = question.text.match(regex);
      if(matches){
        for (const match of matches) {
          
          const [,linkText, url] = match.match(/\[([^\]]+)\]\(([^]+)\)/);
          
          if (url.startsWith('http://') === false && url.startsWith('https://') === false) {
            alert('Hyperlink URL must start with "http://" or "https://"');
            return;
        }
        question.hyper = 1;
        question.hyperLinks.push(url);
        question.hyperText.push(linkText);
        }
      }
    }
    
    
  }

  render(){
    this.checkHyperLink();
    return (
      <>
        <div className="header">
            <h1 id="header">Fake Stack Overflow</h1>
            <Search searching = {this.state.searching} questions = {this.state.questions} tags = {this.state.tags} 
            updateState = {this.updateState} updateSearching = {this.updateSearching}/>
            
        </div>
        <div id="main" className="main">
          <LeftMenu  updateState = {this.updateState}/>
          <Homepage newpage ={this.state.page} questions = {this.state.questions} answers = {this.state.answers} tags = {this.state.tags}
          updateState = {this.updateState} updateQuestions = {this.updateQuestions} updateAnswers = {this.updateAnswers}
          updateTags = {this.updateTags} searchByTag = {this.searchByTags} searching = {this.state.searching}
          checkHyperLink = {this.checkHyperLink}/>
        </div>
        
      </>
    );
  }
  
}

export default FakeStackOverflow;
