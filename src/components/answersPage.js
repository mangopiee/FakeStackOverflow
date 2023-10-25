import Model from '../models/model.js';
import React from 'react';

const model = new Model();

class AnswersPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:props.newQuestion.title,
            text: props.newQuestion.text,
            askedBy: props.newQuestion.askedBy,
            askDate: props.newQuestion.askDate,
            ansIds: props.newQuestion.ansIds,
            views: props.newQuestion.views,
            num_ans: props.newQuestion.ansIds.length,
            link_index: 0,
            index: 0
        };
        this.model = model;
        this.goPostAnswer = this.goPostAnswer.bind(this);
        this.applyWebSide = this.applyWebSide.bind(this);
        this.brainPower = this.brainPower.bind(this);
        this.updateIndex = this.updateIndex.bind(this);
    }

    goPostAnswer(){
        this.props.goPost();
    }
    updateIndex(){
      var new_i = this.state.link_index;
      this.setState({link_index:new_i});
    }

    applyWebSide(question){
        const regex = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/;
        var output = [];
        if(question.hyper === 1){
          for(let i = 0;i<question.hyperLinks.length;i++){
            const parts = question.text.split(regex);
            for(let j = 0; j < parts.length;j++){
              if(parts[j] === question.hyperText[i]){
                output.push('hyperlink**');
                i++;
                j++;
              }
              else{
                output.push(parts[j]);
              }
            }
          }
          return output;
        }else{
            const parts = question.text.split(regex);
          return parts;
        }
      }
    
    returnText(output,index){
        if(output!=='hyperlink**'){
          return(
            <span key = {index}>
              {output}
            </span>
          );
        }
        else{
          
          var link_index = this.state.link_index;
          this.updateIndex();
          return(
            <a key={`a-${link_index}`} href = {this.props.newQuestion.hyperLinks[link_index]}>
              {this.props.newQuestion.hyperText[link_index]}
            </a>
          );
        }
        
    }
    
    brainPower(answer_text) {
      const regex = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g; // Note the 'g' flag for global matching
      const matches = [...answer_text.matchAll(regex)];
    
      if (matches.length > 0) {
        let lastIndex = 0;
        const elements = [];
    
        matches.forEach((match) => {
          const [fullMatch, hypertext, url] = match;
          const front_text = answer_text.slice(lastIndex, match.index);
          lastIndex = match.index + fullMatch.length;
    
          // Push the non-hyperlink text
          if (front_text) {
            elements.push(<span key={lastIndex}>{front_text}</span>);
          }
    
          // Push the hyperlink
          elements.push(
            <a href={url} key={lastIndex + 1}>
              {hypertext}
            </a>
          );
        });
    
        // Add any remaining text after the last hyperlink
        if (lastIndex < answer_text.length) {
          elements.push(
            <span key={lastIndex + 2}>
              {answer_text.slice(lastIndex)}
            </span>
          );
    
          return <>{elements}</>;
        }
      } else {
        return (
          <span>
            {answer_text}
          </span>
        );
      }
    }
    render(){
        const answersIds = this.state.ansIds;
        const answers = this.props.answers.sort((a, b) => b.ansDate - a.ansDate)
        const filteredAnswers = answers.filter((answer) => answersIds.includes(answer.aid));
        const text_arr = this.applyWebSide(this.props.newQuestion);
        const display = text_arr.map((text,index)=>(this.returnText(text,index)))
        
        return (
            <>
            <div className="question_main">
                <div className = "question_section1">
                    <h1 id="numberOfAnswers" >{this.state.num_ans} answers</h1>
                    <h1 id = "q_title">{this.state.title}</h1>

                    <button id="askQ" onClick={this.props.setPage}>Ask Question</button>
                </div>
                <div className="question">
                    <div className="viewdisplay">
                        <h2 id = "numOfViews"> {this.state.views} views</h2>
                    </div>
                    <div className="textdisplay">
                        <p id = "questionText">{display}</p>
                    </div>


                    <div className="thedate">
                        <p className="ask">{this.state.askedBy} asked </p>
                        <p className="date"> at {formatQuestionTime(this.state.askDate)}</p>
                    </div>
                </div>
            <div></div>

            </div>

            <div>
                {filteredAnswers.map((answer, index)=>(
                    <div className = "oneAnswer" key={index}>
                        <div className = "answerBody">
                            <p>{this.brainPower(answer.text)}</p>
                        </div>
          
                        <div className="userInfo">
                        <p id="answer">{answer.ansBy} answered </p>
                        <p id="date"> {formatQuestionTime(answer.ansDate)}</p>
                        </div>

                        <div></div>
                    </div>
                ))}
            </div>
            
            <p>
                <button id = "answer_question" onClick = {() => this.goPostAnswer()}>Answer Question</button>
            </p>
            </>
        );
    }
  
}export default AnswersPage;

function formatQuestionTime(questionDate) {
    const currentDate = new Date();
    const postDate = new Date(questionDate);
  
    const timeDifference = currentDate - postDate;
  
    // Convert milliseconds to seconds, minutes, or hours
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
  
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[postDate.getMonth()];
    const date = postDate.getDate();
    const hour = postDate.getHours();
    const min = postDate.getMinutes();
    const str = `${month} ${date} at ${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
    const str2 = `${month} ${date}, ${postDate.getFullYear()} at ${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
  
    if (secondsDifference < 60) {
      return `${secondsDifference} second${secondsDifference !== 1 ? 's' : ''} ago`;
    } else if (minutesDifference < 60) {
      return `${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''} ago`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
    } else if (currentDate.getFullYear() === postDate.getFullYear()) {
      return str;
    }else {
      // If more than 24 hours ago, you can display the full date or another format
      return str2;
    }
  }