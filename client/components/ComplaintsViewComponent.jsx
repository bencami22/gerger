import React from 'react';
import ComplaintViewComponent from './ComplaintViewComponent.jsx';

const socket=io.connect();

class ComplaintsViewComponent extends React.Component{
  constructor() {
    super();
    
    this.state= {complaints:new Array()};
    
    socket.on('complaint', (data)=>
     {
        var arrayvar = this.state.complaints;
        arrayvar.push({author:data.author, title:data.title, content:data.content})
        this.setState({ complaints: arrayvar })

     });
     
  }
  
  render() {
    return (
        <dl>
            {this.state.complaints.map((x, i)=>
                <ComplaintViewComponent key={i} author={x.author} title={x.title} content={x.content} />
            )}
        </dl>
    );
  };
  
};
 
 export default ComplaintsViewComponent;