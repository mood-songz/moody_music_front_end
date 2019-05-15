import React, {Component} from 'react';

/*
code for camera taken from
http://sviridovserg.com/2017/09/18/react-photo-capture/
*/

class CameraPhoto extends Component{
  render(){
    setTimeout(() => {
      if (!this.props.isOpen) {
        return;
      }
      const context = this.canvas.getContext('2d');
      context.drawImage(this.props.video, 0, 0, 640, 480);
    });
    
    const canvasEl = (<canvas id="canvas" width="640" height="480" className="photoCard" ref={(input) => this.canvas = input} />)

    return (
      <div className="content">
        {canvasEl}
      </div>
    );
  
  }
}

export default CameraPhoto;
