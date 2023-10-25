export default function LeftMenu({ updateState }){
    const handleStateUpdate = () => {
      updateState(1);
      const questionElement = document.getElementById('question_menu');
      const tagElement = document.getElementById('tag_menu');
      questionElement.style.backgroundColor = 'lightgray'; 
      tagElement.style.backgroundColor = 'white';
    }
    const handleStateUpdate2 = () => {
       const questionElement = document.getElementById('question_menu');
       const tagElement = document.getElementById('tag_menu');
       questionElement.style.backgroundColor = 'white'; 
       tagElement.style.backgroundColor = 'lightgray';
      updateState(3);
    }
      return(
        <div className = "left"> 
          <button id = "question_menu" onClick={handleStateUpdate}
          style ={{backgroundColor:''}}>Questions</button>
          <button id = "tag_menu"onClick={handleStateUpdate2}
          style ={{backgroundColor:'white'}}>Tags</button>
        </div>
      );
    }