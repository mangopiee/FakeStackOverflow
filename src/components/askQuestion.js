import React, { Component } from 'react'
import Model from '../models/model.js'

let model = new Model();
const questions = model.getAllQstns();
const tags = model.getAllTags();

class AskQuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            detail: '',
            tags: '',
            username:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
        this.checkHyperLinkPost = this.checkHyperLinkPost.bind(this);
    }

    
    handleInputChange (e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    checkHyperLinkPost(question){
        const regex = /\[([^\]]+)\]\(([^\s]+)\)/g;
          const matches = question.text.match(regex);
          if(matches){
            for (const match of matches) {
              const [,, url] = match.match(/\[([^\]]+)\]\(([^]+)\)/);
              
              if (url.startsWith('http://') === false && url.startsWith('https://') === false) {
                
                return false;
            }
        }
          
        }
        return true;
        
      }
    submit() {
        
        const title = this.state.title;
        const text = this.state.detail;
        const tags_element = this.state.tags;
        const username = this.state.username;
        var empty_input = 0;
        document.getElementById('title_error').textContent = '';
        document.getElementById('question_error').textContent = '';
        document.getElementById('tag_error').textContent = '';
        document.getElementById('user_error').textContent = '';
        var tags_array = tags_element.split(' ');
        if (title.length > 100) {
            document.getElementById('title_error').textContent = 'Your title is too long';
            empty_input = 1;
        } 
        if (title.length === 0) {
            document.getElementById('title_error').textContent = 'Please enter the title';
            empty_input = 1;
        }
        if (text.length === 0) {
            document.getElementById('question_error').textContent = 'Please enter the text';
            empty_input = 1;
        }
        if (tags_element.length === 0) {
            document.getElementById('tag_error').textContent = 'Please enter the tags';
            empty_input = 1;
        }
        if (username.length === 0) {
            document.getElementById('user_error').textContent = 'Please enter the username';
            empty_input = 1;
        }
        if(tags_array.length > 5){
            document.getElementById('tag_error').textContent = 'Too many tags';
            empty_input = 1;
        }
        tags_array.forEach(function(tag){
            if(tag.length >10){
              document.getElementById('tag_error').textContent = 'Tags should be less than 10 characters';
              empty_input = 1;
            }
          });
       if(empty_input === 0){
            
            var tids = [];
            for(let i = 0; i<tags_array.length;i++){
                for(let j = 0; j <tags.length;j++){
                
                    if(tags_array[i].toLowerCase() === tags[j].name.toLowerCase()){
                        tids.push(tags[j].tid);
                        break;
                    }
                    if(j===tags.length-1){
                      if(tags_array[i].length <= 10){
                        const new_tag = {tid:`t${tags.length+1}`, name:tags_array[i].toLowerCase()};
                        tags.push(new_tag);
                        tids.push(new_tag.tid);
                        this.props.updateTags(tags);
                        
                        break;
                      }
                    }
                }
            }
            const new_question = {
                qid:'q'+(questions.length+1),
                title:title,
                text:text,
                tagIds: tids ,
                askedBy:username,
                askDate: new Date(),
                ansIds: [],
                views:0,
            };
            if(this.checkHyperLinkPost(new_question)=== true){
                questions.push(new_question);
                questions.sort((a, b) => b.askDate - a.askDate);
                this.props.updateQuestions(questions);
                this.props.setPage();
            }
            else{
                alert('Hyperlink URL must start with "http://" or "https://"');
            }
           
        }
    }

    render() {
        return (
            <div>
                <h1 id="question_title">Question Title*</h1>
                <div id="title_limit">limit title to 100 characters or less</div>
                <textarea
                    id="title_input"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                ></textarea>
                <div id = 'title_error' className = 'error_msg'></div>

                <h1 id="question_title">Question Text*</h1>
                <div id="title_limit">add detail</div>
                <textarea
                    id="text_input"
                    name="detail"
                    value={this.state.detail}
                    onChange={this.handleInputChange}
                ></textarea>
                <div id = 'question_error' className = 'error_msg'></div>

                <h1 id="question_title">Tags*</h1>
                <div id="title_limit">add keywords separated by space</div>
                <textarea
                    id="tags_input"
                    name="tags"
                    value={this.state.tags}
                    onChange={this.handleInputChange}
                ></textarea>
                <div id = 'tag_error' className = 'error_msg'></div>

                <h1 id="question_title">Username*</h1>

                <textarea id="user_input"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                ></textarea>
                <div id = 'user_error' className = 'error_msg'></div>

                <button id="sumbit" onClick={this.submit}>
                    Post question
                </button>
                <span id="remind_sumbit"> *indicates a mandatory field</span>
            </div>
        );
    }
}

export default AskQuestionPage;