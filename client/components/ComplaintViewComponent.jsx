import React from 'react';
import reactCSS from 'reactcss';

class ComplaintViewComponent extends React.Component{
  constructor() {
    super();
  }
  
 
  render() {
    const styles = reactCSS({
      'default': {
        ptitle: {
         color:'#FFFFFF',
          letterspacing:'2pt',
          wordspacing:'2pt',
          fontsize:'30px',
          textalign:'left',
          lineheight:3
        },
        pcontent: {
         color:'#f2f2f2',
          letterspacing:'2pt',
          wordspacing:'2pt',
          fontsize:'20px',
          textalign:'left',
          lineheight:3
        },
        pauthor: {
          color:'#D3D3D3',
          letterspacing:'2pt',
          wordspacing:'2pt',
          fontsize:'10px',
          textalign:'left',
          lineheight:3
        },
        li: {
         counterIncrement: 'item',
         marginBottom: 5,
       }
    
      },
    });
    
    return (
      <li>
      <p style={styles.ptitle}>"{this.props.title}"</p>
      <p style={styles.pcontent}>{this.props.content}</p>
      <p style={styles.pauthor}>{this.props.author}</p>
      </li>
    );
  };
  
};
 
 export default ComplaintViewComponent;