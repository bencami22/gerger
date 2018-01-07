import React from 'react';

class ComplaintViewComponent extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <li className="complaint-list">
      <div>
      <p>
        <span className="complaint-list-author">{this.props.anon?"Anon":this.props.author}</span> says <span className="complaint-list-title">"{this.props.title}"</span> 
        </p>
        <p>
        <span className="complaint-list-content">-{this.props.content}</span>
        </p>
        <hr/>
      </div>
      </li>
    );
  };

};

export default ComplaintViewComponent;
