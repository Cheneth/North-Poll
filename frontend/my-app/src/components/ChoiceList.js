import React, { Component } from 'react';
import ChoiceItem from './ChoiceItem';



export class ChoiceList extends Component {
    
  state = {
    choices: this.props.choices
  }

  render() {

    const item = this.props.choices.map(x => {

        return (

            <div key={x.id} className="radio">
                <label>
                    <input  name="choice" type="radio" value={x.id}   />
                    <ChoiceItem key={x.id} text={x.choice_text} votes={x.votes}/>
                </label>
            </div>
            )
    })
    return(
        <div>
            {item}
        </div>
    )
  }
}

export default ChoiceList
