import Model from '../models/model.js';
import React from 'react';

const model = new Model();

class PostAnswer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            aid: '',
            text: '',
            username: '',
            ansDate: ''
        };
        this.model = model;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.displayNewAnswer = this.displayNewAnswer.bind(this);
    }

    handleInputChange (e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    displayNewAnswer(){
        const text = this.state.text;
        const username = this.state.username;
        document.getElementById('user_error').textContent = '';
        document.getElementById('question_error').textContent = '';
        var empty_input = 0;
        if (text.length === 0) {
            document.getElementById('question_error').textContent = 'Please enter the text';
            empty_input = 1;
        }
        if (username.length === 0) {
            document.getElementById('user_error').textContent = 'Please enter the username';
            empty_input = 1;
        }
        if(empty_input === 0){
            const new_answer = {
                aid:'a'+(this.props.answers.length+1),
                text:text,
                ansBy:username,
                ansDate: new Date(),
            };
            this.props.answers.push(new_answer);
            this.props.newQuestion.ansIds.push(new_answer.aid);
            //this.props.updateAnswers(answers);
            
            this.props.goAnswer();
        }
    }

    render(){
        return(
            <div>
                <h1 id = "username">Username*</h1>
                <textarea id="user_input" name = "username" value = {this.state.username} onChange={this.handleInputChange} required></textarea>
                <div id = 'user_error' className = 'error_msg'></div>

                <h1 id = "answer_text">Answer Text*</h1>
                <textarea id="text_input" name = "text" value = {this.state.text} onChange={this.handleInputChange} required></textarea>
                <div id = 'question_error' className = 'error_msg'></div>

                <div className="submit_button">
                    <button id = "sumbit" onClick={() => this.displayNewAnswer()}> Post Answer</button>
                    <span id="remind_sumbit"> *indicates mandatory field</span>
                </div>
            </div>
        );
    }
          
}export default PostAnswer;