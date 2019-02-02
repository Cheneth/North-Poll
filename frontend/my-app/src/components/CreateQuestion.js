import React, { Component } from 'react';
import CreateChoiceOption from './CreateChoiceOption';
import axios from 'axios';
export class CreateQuestion extends Component {


    constructor(props) {
        super(props);
      // Don't call this.setState() here!
        this.state = {
            question : "",
            options : [0,1],
            questionLink: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteOption = this.deleteOption.bind(this);
        this.addOption = this.addOption.bind(this);
      }


  deleteOption(choiceNumber){//delete option returns true is successful returns false if not
    
    var options = this.state.options;
    for(var i = 0; i < options.length; i++){
        if(options[i] === choiceNumber ){
            options.splice(i, 1);
            this.setState({ options });
            return true;
        }
    }

    return false;
  }

  addOption(e){//add an option to the state
    var options = this.state.options;
    var newOption = options[options.length-1]+1;
    options.push(newOption);
    this.setState({ options : options });
  }

    handleSubmit(event){//send new question object to server
        event.preventDefault();
        var self = this;
        var choices = event.target.choice;
        var questionKey;
        console.log(event.target.question.value);

        axios.post('http://localhost:8000/create_question/', {//post the question
            question_text : event.target.question.value
          })
          .then(function (response) {
              console.log(response);
            questionKey = response.data.question_key;
            console.log(questionKey);
            self.setState({questionLink : questionKey})

            for(var i = 0; i < choices.length; i++){
                console.log(choices[i].value)
                axios.post('http://localhost:8000/create_choice/', {//post the question
                    q_key: questionKey,
                    choice_text: choices[i].value
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {//TODO redirect to an error page
                    console.log(error);
                });
            }

          })
          .catch(function (error) {//TODO redirect to an error page
            console.log(error);
          });
        
        




    }

  render() {
    return (
      
        <div>
            
            <form onSubmit={this.handleSubmit}>
                <label>
                    Question: 
                    <input type="text" name="question" />
                </label>
                <CreateChoiceOption options={this.state.options} deleteOption={this.deleteOption}/>
                <input type="submit" value="Submit" />
            </form>
            <button onClick={() => { this.addOption() }}>Add</button>
            <p>{ this.state.questionLink }</p>

            
         </div>
      
    )
  }
}

export default CreateQuestion
