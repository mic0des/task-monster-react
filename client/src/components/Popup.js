import React from 'react';

class Popup extends React.Component {

  componentDidMount = () => {
    document.body.style.overflow = "hidden";
  }

  render() {
    return (
      <div className='popup meta'>
        <div className='popup_inner meta'>
          <h1 className='meta'>Please <a className="meta" href="https://metamask.io/">download MetMask</a> to use this Dapp.</h1>
          <br/>
          <img height="50%" target="_blank" src="/metamask.png" alt=""/>
        </div>
      </div>
    );
  }

}

export default Popup;
