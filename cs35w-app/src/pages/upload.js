import React from 'react';


const Upload = () => {

  class RecipeForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: ''
      };


      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
      alert('A recipe was submitted: ' + this.state.value);
      event.preventDefault();
    }

    render() {
      return (
        <form className='cardTextArea' onSubmit={this.handleSubmit}>
          <div>
            <label>
              Recipe:
            </label>
          </div>
          <div>
            <textarea value={this.state.value} onChange={this.handleChange} rows="10" cols="45" placeholder='Please share your favorite recipe.' /></div>
          <div className>
            <input className='btn' type="submit" value="Submit" /></div>
        </form>
      );
    }
  }
  return (
    <RecipeForm />
  )
};

export default Upload;