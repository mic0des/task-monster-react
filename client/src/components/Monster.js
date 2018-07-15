import React from 'react';

const Monster = props => {
	return (
		<div className="monster" >
      		<img src="/Neko-Breathing-Resize.gif" id="monster" alt="your monster" height= "220px" width="281px" onMouseOver={e => (e.currentTarget.src = "/Neko-Open.gif")} onMouseLeave={e => (e.currentTarget.src = "/Neko-Breathing-Resize.gif")} onMouseUp={e => (e.currentTarget.src = "/Neko-Breathing-Resize.gif")}/>
		</div>
	)
}

export default Monster;