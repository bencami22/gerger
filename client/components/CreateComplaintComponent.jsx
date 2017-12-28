import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { activeUser } from '../reducers/reducer-activeUser';
import humane from '../public/compiled_js/humane.min.js'
import validator from 'validator';
import DropzoneComponent from 'react-dropzone-component';

const socket = io.connect();

class CreateComplaintComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      touched: {
        title: false,
        content: false,
        submit: false
      },
      fileUrls: []
    };

    this.handleTitleChange = ::this.handleTitleChange;
    this.handleContentChange = ::this.handleContentChange;
    this.handleSubmit = ::this.handleSubmit;
    this.sendComplaint = ::this.sendComplaint;

    // For a full list of possible configurations,
    // please consult http://www.dropzonejs.com/#configuration
    this.djsConfig = {
      addRemoveLinks: true,
      acceptedFiles: "image/jpeg,image/png,image/gif",
      autoProcessQueue: false
    };

    this.componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: '/uploadHandler'
    };

    this.dropzone = null;
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  render() {

    const errors = validate(this.state.title, this.state.content);
    const isDisabled = this.state.touched.submit && Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = (field) => {
      return errors[field] && (this.state.touched[field] || isDisabled);
    };

    const config = this.componentConfig;
    const djsConfig = this.djsConfig;

    // For a list of all possible events (there are many), see README.md!
    const eventHandlers = {
      init: dz => this.dropzone = dz,
      success: (file, data) => {
        console.log(data.url);
        this.dropzone.removeFile(file);
        this.state.fileUrls.push(data.url)
        if (this.dropzone.getAcceptedFiles().length == 0) {
          this.sendComplaint();
        }
      }
    };
    return (

      <form id="sendComplaint" onSubmit={this.handleSubmit}>
        <div className="overallDv">
            <div className="rowArea"><label className="complaintCreateTitleAlign">Title:</label> 
              <input className={shouldMarkError('title')?"inputStyle errorTextBox":"inputStyle"} onBlur={this.handleBlur('title')} value={this.state.title} onChange={this.handleTitleChange} />
            </div>
            <div className="rowArea">Content:
              <input className={shouldMarkError('content')?"inputStyle errorTextBox":"inputStyle"} onBlur={this.handleBlur('content')} value={this.state.content} onChange={this.handleContentChange} />
            </div>
            <div className="rowArea">
              <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
            </div>
            <button type="submit" className="myButton" onClick={this.handleBlur('submit')} disabled={isDisabled}>Submit</button>
          </div>
          
        </form>

    );
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleContentChange(e) {
    this.setState({ content: e.target.value });
  }

  sendComplaint() {
    socket.emit('complaint', {
        author: this.props.activeUser.username,
        title: this.state.title,
        content: this.state.content,
        fileUrls: this.state.fileUrls
      },
      function(data) {
        if (data) {
          humane.log('Complaint successfully submitted.');
          this.setState({ author: '', title: '', content: '', fileUrls: [] });
        }
        else {
          humane.log('Oops, something went wrong with submitting your complaint.');
        }
      }.bind((this)));
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.dropzone.getAcceptedFiles().length > 0) {
      this.dropzone.processQueue();
    }
    else {
      this.sendComplaint();
    }
  }
};



function validate(title, content) {
  // true means invalid, so our conditions got reversed
  return {
    title: validator.isEmpty(title),
    content: validator.isEmpty(content),
  };
}

//passes state into component as a prop
function mapStateToProps(state) {
  return {
    activeUser: state.activeUser
  }
}

//this makes it a container, rather than a dumb component.
export default connect(mapStateToProps)(CreateComplaintComponent);
