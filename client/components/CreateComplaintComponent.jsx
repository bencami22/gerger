import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { activeUser } from '../reducers/reducer-activeUser';
import humane from '../public/compiled_js/humane.min.js'


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
        <div className="overallDv">
            <div className="rowArea"><label className="complaintCreateTitleAlign">Title:</label> <input className="inputStyle" value={this.state.title} onChange={this.handleTitleChange} /></div>
            <div className="rowArea">Content: <input className="inputStyle" value={this.state.content} onChange={this.handleContentChange} /></div>
            <button type="submit" className="myButton">Submit</button>
          </div>
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
      },
      function(data) {
        if (data) {
          humane.log('Complaint successfully submitted.');
          this.setState({ author: '', title: '', content: '' });
        }
        else {
          humane.log('Oops, something went wrong with submitting your complaint.');
        }
      }.bind((this)));
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
