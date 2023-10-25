import React, { Component } from 'react';

class Tag_page extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const tags = this.props.tags;
    const questions = this.props.questions;
    for (const tag of this.props.tags) {
      tag.count = 0; 
    }
    for(let i = 0; i<questions.length;i++){
        for(let j = 0; j<questions[i].tagIds.length;j++){
          var index = Number(questions[i].tagIds[j].substring(1));
          tags[index-1].count++;
        }
      }
    return (
      <>
        <h1 className="tag_title">
          <span id="num_tag">{this.props.tags.length} Tags</span>
          <span id="all_tag">All Tags</span>
          <button
            id="ask_question"
            onClick={this.props.setPage}
            style={{ marginLeft: '20%' }}>
            Ask Question
          </button>
        </h1>
        <div id="tag_container" style={{marginTop:'5%'}}>
          {tags.map((tag,index) => (
            <div key={index} className= "tag_box">
              <div className="tag_name" onClick = {()=> this.props.searchByTag(tag.name)}>{tag.name}</div>
              <div>{tag.count} question(s)</div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Tag_page;