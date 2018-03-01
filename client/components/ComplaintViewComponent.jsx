import React from 'react';
import Lightbox from 'react-image-lightbox';

class ComplaintViewComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  render() {
    const { photoIndex, isOpen } = this.state;

    if (this.props.fileUrls != null) {
      var i = -1;
      var urls = null;
      for (i = 0; i < this.props.fileUrls.length; i++) {
        if (urls == null) urls = [];
        urls.push(<img id={i} 
        onClick={() => this.setState({ isOpen: true
   //     , photoIndex: i 
        })} src={this.props.fileUrls[i]} />);
      }

    }

    var anonAvatarUrl = 'https://s3.amazonaws.com/nvest/Blank_Club_Website_Avatar_Gray.jpg';

    return (

      /*<li className="complaint-list">
        <span className="dvComplaintsContainer complaint-list-content">
        <img style={{'borderRadius': '50%', 'width':'60px'}} src={this.props.anon?anonAvatarUrl:(this.props.avatarUrl?this.props.avatarUrl:anonAvatarUrl)} />
        </span>
        <span className="dvComplaintsContainer dateStyle complaint-list-content">{formatDate(this.props.dtTimestamp)}</span>
        <span className="dvComplaintsContainer complaint-list-author">{this.props.anon?"Anon":this.props.author}</span> says <span className="complaint-list-title">"{this.props.title}"</span> 
        <span className="dvComplaintsContainer complaint-list-content">-{this.props.content}</span>
        <span className="dvComplaintsContainer complaint-list-content"> at {this.props.locality}</span>
        <span className="complaint-list-content">{urls}</span>
        <hr/>*/
      <li className="complaint-list">
        	<div className="ovComplaintsDv">
        	  <div style={{'float':'left', 'position':'relative', 'marginTop':'5%'}}>
        	      <div className="dateStyle">{formatDate(this.props.dtTimestamp)}</div>
                <img className="imgAnon" src={this.props.anon?anonAvatarUrl:(this.props.avatarUrl?this.props.avatarUrl:anonAvatarUrl)} />
                <div className="localityDv"><i className="material-icons">location_on</i>{this.props.locality}</div>
            </div>
            <div className="complaintOv">
                <p className="complaintTitle"> "{this.props.title}"</p>
                <div className="complaintContent">{this.props.content}  <a className="anonDv">-by {this.props.anon?"Anon":this.props.author}</a></div>
                <div className="extraImg">{urls}</div>
            </div>
            
      {
        isOpen && (
          <Lightbox
                mainSrc={this.props.fileUrls[photoIndex]}
                nextSrc={this.props.fileUrls[(photoIndex + 1) % this.props.fileUrls.length]}
                prevSrc={this.props.fileUrls[(photoIndex + this.props.fileUrls.length - 1) % this.props.fileUrls.length]}
                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() =>
                 this.setState({photoIndex: (photoIndex + this.props.fileUrls.length - 1) % this.props.fileUrls.length,})
                }
                onMoveNextRequest={() =>
                  this.setState({
                      photoIndex: (photoIndex + 1) % this.props.fileUrls.length,
                   })
                }/>
        )
      } 
      </div>
      </li>


    );

  }
}

function formatDate(dateStr) {
  var d = new Date(dateStr);
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var date = d.getDate();
  if (date.toString().length == 1)
    date = "0" + date;
  var hour = d.getHours();
  if (hour.toString().length == 1)
    hour = "0" + hour;
  var minute = d.getMinutes();
  if (minute.toString().length == 1)
    minute = "0" + minute;
  return months[d.getMonth()] + " " + " " + date + " " + d.getFullYear();
  //+ " " + hour + ":" + minute;

}
export default ComplaintViewComponent;
