import Model from '../models/model.js';
import React from 'react';

const model = new Model();



class Questions extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      qid:'',
      title:'',
      text:'',
      tagIds:'',
      askedBy:'',
      askDate:'',
      ansIds:'',
      views:''
    };
    this.model = model;
    this.makeTitleClickable = this.makeTitleClickable.bind(this)
  }

//     makeTitleClickable(question){
//       this.props.setCurQuestion(question);
//       this.setState(() => ({views: question.views}));
//       //view ++ when clicked on the question to display the answer
//       this.setState((prevState) => ({ views: prevState.views + 1 }), () => {
//         // After the state has been updated, call updateView
//         this.model.updateView(question, this.state.views); // update views to the model
//         this.props.goAnswer();
//       });
//     }

makeTitleClickable(question){
  this.props.setCurQuestion(question);
  question.views += 1;
  this.props.goAnswer();

}
render(){
  const questions = this.props.questions;
  const tags = this.props.tags;
  
  if(questions.length === 0){
    return(
      <h1 id = "NotFound"> No Question Founded</h1>
    );
  }
  return(
    
    <div>
      
      {questions.map((question,index)=>(
        <div className="question" key={index}>
      <div className = "p1">
        <h4 className="number_answers" >{question.ansIds.length} answers</h4>
        <h4 className = "views"> {question.views} views</h4>
      </div>
  
      <div className="p2">
        <h1 className = "title" onClick = {() => this.makeTitleClickable(question)}>
          {question.title}
        </h1>
        <br/>
        <div className="tags">
          {TagsComponent(question,tags)}
        </div>
      </div>
      <div className="p3">
      
        <p className="ask">{question.askedBy} asked </p>
        <p className="date"> at {formatQuestionTime(question.askDate)}</p>
      
      </div>

      <div></div>
    </div>
    ))}
  </div>
  );
}
  
}
export default Questions;

function TagsComponent( question, tags ) {
const arr = [];

for (let i = 0; i < question.tagIds.length; i++) {
  for (let j = 0; j < tags.length; j++) {
    if (question.tagIds[i] === tags[j].tid) {
      arr.push(tags[j].name);
    }
  }
}

const tagButtons = arr.map((tagName, index) => (
  <button key={index}>{tagName}</button>
));
return(
  <div>
    {tagButtons}
  </div>
)
}

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