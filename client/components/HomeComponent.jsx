import React from 'react'

const HomeComponent = () => (
  <div className="overallDv">
    <div className="homeScrnTitle"><p style={{ marginTop:'0px'}}>Gerger</p><p style={{marginTop:'-20px',marginBottom:'1px'}}><img src="https://i.imgur.com/XpMyjdG.png" style={{width:'130px'}} /></p></div>
    <p style={{fontWeight:"bold"}}>How it works</p>
 
   <p className="alignTextLeft">Want to speak out loud on an issue that has been bothering you but your local council doesn't seem to be helping?</p>
   <p className="alignTextLeft">Share your complaint publically, and we will also forward it to the local council for you.</p>
   <p className="alignTextLeft">Choose to do it publically or anonymously.</p>
  
    
    <p style={{fontWeight:"bold"}}>Rules:</p>
    <ul>
    <li className="alignTextLeft">Do not submit complaints that contain personal information.</li>
    <li className="alignTextLeft">Do not submit complaints that are unlawful, harassing, abusive, threatening, harmful, obscene, profane, sexually orientated or racially offensive.</li>
    <li className="alignTextLeft">Do not swear or use language that could offend other participants.</li>
    <li className="alignTextLeft">Do not advertise or promote products or services.</li>
    <li className="alignTextLeft">Do not spam or flood the forum. Only submit a complaint once.</li>
    <li className="alignTextLeft">Do not resubmit the same, or similar, complaints.</li>
    <li className="alignTextLeft">Keep your complaints relevant to the local scene.</li>
    </ul>
    <p style={{fontWeight:"bold"}}>
    Notice:
    </p>
    <p className="alignTextLeft">
    This is not a public service entity owned website.<br />
    Images uploaded are to be shared publically and not owned by the website.
    </p>
    
    
  </div>
)

export default HomeComponent
