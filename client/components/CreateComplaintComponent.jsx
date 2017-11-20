import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { activeUser } from '../reducers/reducer-activeUser';

const socket = io.connect();

class CreateComplaintComponent extends React.Component {
  constructor() {
    super();
    this.state = { title: '', content: '' };

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
    this.setState({ title: e.target.value });
  }

  handleContentChange(e) {
    this.setState({ content: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    socket.emit('complaint', {
      author: this.props.activeUser.username,
      title: this.state.title,
      content: this.state.content
    });
  }

};

//passes state into component as a prop
function mapStateToProps(state) {
  return {
    activeUser: state.activeUser
  }
}

//this makes it a container, rather than a dumb component.
export default connect(mapStateToProps)(CreateComplaintComponent);
