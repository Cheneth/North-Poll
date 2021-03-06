import React, { Component } from 'react'

export class CreateChoiceOption extends Component {



  render() {
   
    var items = this.props.options.map( x=> {
        return(
            <div key={x} className="text">
                <label>
                    <input type="text" name="choice" />
                    <button onClick={(e) => { 
                        e.preventDefault();
                        this.props.deleteOption(x);
                        }}>Delete</button>
                </label>
            </div>
                
        )
    });

    return (
      <div>
          {items}
      </div>
    )
  }
}

export default CreateChoiceOption
