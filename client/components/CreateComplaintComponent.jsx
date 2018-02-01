import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { activeUser } from '../reducers/reducer-activeUser';
import { socketConnection } from '../reducers/reducer-socketConnection';

import humane from '../public/compiled_js/humane.min.js'
import validator from 'validator';
import DropzoneComponent from 'react-dropzone-component';
import LocalitiesComponent from '../components/LocalitiesComponent.jsx';


class CreateComplaintComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      locality: 'Select',
      anon: false,
      touched: {
        title: false,
        content: false,
        submit: false
      },
      fileUrls: []
    };

    this.handleTitleChange = ::this.handleTitleChange;
    this.handleContentChange = ::this.handleContentChange;
    this.handleLocalityChange = ::this.handleLocalityChange;
    this.handleAnonChange = ::this.handleAnonChange;
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

    const errors = validate(this.state.title, this.state.content, this.state.locality);
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
              <textarea  cols="30" rows="3" className={shouldMarkError('content')?"inputStyle errorTextBox":"inputStyle"} onBlur={this.handleBlur('content')} value={this.state.content} onChange={this.handleContentChange} />
            </div>
            <div className="rowArea">
            Locality: 
            <LocalitiesComponent handleOnChange={this.handleLocalityChange.bind(this)} />
            </div>
            <div className="rowArea">
             Post anonymously:
              <input id="checkBox" type="checkbox" value={this.state.anon} onChange={this.handleAnonChange} />
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

  handleLocalityChange(e) {
    this.setState({ locality: e.target.value });
  }

  handleAnonChange(e) {
    this.setState({ anon: e.target.checked });
  }

  sendComplaint() {
    this.props.socketConnection.emit('complaint', {
        user: this.props.activeUser,
        title: this.state.title,
        content: this.state.content,
        locality: this.state.locality,
        anon: this.state.anon,
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
    const errors = validate(this.state.title, this.state.content, this.state.locality);
    const isDisabled = this.state.touched.submit && Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = (field) => {
      return errors[field] && (this.state.touched[field] || isDisabled);
    };
    if (!isDisabled) {
      if (this.dropzone.getAcceptedFiles().length > 0) {
        this.dropzone.processQueue();
      }
      else {
        this.sendComplaint();
      }
    }
  }
};



function validate(title, content, locality) {
  // true means invalid, so our conditions got reversed
  return {
    title: validator.isEmpty(title),
    content: validator.isEmpty(content),
    locality: validator.equals(locality, "Select")
  };
}

//passes state into component as a prop
function mapStateToProps(state) {
  return {
    activeUser: state.activeUser,
    socketConnection: state.socketConnection
  }
}

//this makes it a container, rather than a dumb component.
export default connect(mapStateToProps)(CreateComplaintComponent);
