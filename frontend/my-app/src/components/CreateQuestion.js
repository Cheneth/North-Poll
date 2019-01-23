import React, { Component } from 'react';
import CreateChoiceOption from './CreateChoiceOption';
export class CreateQuestion extends Component {


    constructor(props) {
        super(props);
      // Don't call this.setState() here!
        this.state = {
            question : "",
            options : [0,1]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteOption = this.deleteOption.bind(this);
        this.addOption = this.addOption.bind(this);
      }


  deleteOption(choiceNumber){//delete option returns true is successful returns false if not
    console.log("HERE");
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

//   editOption(choiceText, choiceNumber){//update the option's text
//     var options = this.state.options;
//     for(i = 0; i < options.length; i++){
//         if(options[i].choiceNumber === choiceNumber ){
//             options[i].choiceText = choiceText;
//             this.setState({ options });
//         }
//     }

//   }

  handleSubmit(){//send new question object to server

  }

  render() {
    return (
      
        <div>
            
            <form onSubmit={this.handleSubmit}>
                <label>
                    Question: 
                    <input type="text" name="Question" />
                </label>
                <CreateChoiceOption options={this.state.options} deleteOption={this.deleteOption}/>
                <input type="submit" value="Submit" />
            </form>
            <button onClick={() => { this.addOption() }}>Add</button>

            
         </div>
      
    )
  }
}

export default CreateQuestion
