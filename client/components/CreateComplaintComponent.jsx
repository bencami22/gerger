import React from 'react';

const socket=io.connect();

class CreateComplaintComponent extends React.Component{
  constructor() {
    super();
    this.state = {title: '', content: ''};
    
    this.handleTitleChange = ::this.handleTitleChange;
    this.handleContentChange = ::this.handleContentChange;
    this.handleSubmit = ::this.handleSubmit;
  }
  
 
  render() {
    return (
     <form id="sendComplaint" onSubmit={this.handleSubmit}>
            Title: <input value={this.state.title} onChange={this.handleTitleChange} />
            Content: <input value={this.state.content} onChange={this.handleContentChange} />
            <button type="submit" className="myButton">Click me!</button>
        </form>
    );
  };
  
  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }
  
  handleContentChange(e) {
    this.setState({content: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    socket.emit('complaint', {
      title:this.state.title, 
      content:this.state.content
      
    });
  }

};
 
 export default CreateComplaintComponent;