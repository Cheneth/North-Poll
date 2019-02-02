import React, { Component } from 'react'
import Question from './Question'
import ChoiceList from './ChoiceList'
import axios from 'axios';


export class QuestionView extends Component {


  constructor(props) {
      super(props);
    // Don't call this.setState() here!
      this.state = {
        questionKey : this.props.match.params.key,
        choiceID : 0,
        choices: [],
        isValid : false
      };
     
     this.handleSubmit = this.handleSubmit.bind(this);
     this.getQuestionKey = this.getQuestionKey.bind(this);
     this.generateForm = this.generateForm.bind(this);
     this.getQuestionKey();
    }

  handleSubmit(event){//sends a get request to vote on a question
    var self = this;  
    event.preventDefault();
     // console.log(this.state.questionKey);
      axios.get(`http://localhost:8000/${self.state.questionKey}/${event.target.choice.value}`);
      //console.log(event.target.choice.value);
      this.getQuestionKey();
  }

  getQuestionKey() {//obtain question choices based on teh question key

    var self = this;

    axios.get(`http://localhost:8000/get_choices/${this.state.questionKey}`)
      .then(res => {
        const choices = res.data;
        self.setState({ isValid : true });
        self.setState({ choices });
      }).catch(function (error){
          if(error.response.status === 404){
              self.setState({ isValid : false });
          }
      })
  }

  generateForm(){
      if(this.state.isValid == true){
          
        return(
          <form onSubmit={this.handleSubmit}>
            <ChoiceList choices={this.state.choices} />
            <input type="submit" value="Submit" />
          </form>
        );
      }
      console.log("HERE");
        return(<div></div>);
    
  }

  render() {
    console.log(this.state.isValid);
    var form = this.generateForm();

    return (
      
      <div>
          <Question questionKey = {this.state.questionKey}/>
          {form}
          
      </div>
    )
  }
}

export default QuestionView
