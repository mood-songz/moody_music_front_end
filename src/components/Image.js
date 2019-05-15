import React from 'react';
import './App.css';


class Image extends React.Component {
  constructor(props){
    super(props);
    this.state={
      selectedFile: null,
      file:null
    }
  }


fileSelectedHandler= async e=>{
e.preventDefault();
await this.setState({
  selectedFile: URL.createObjectURL(e.target.files[0]),
  file:e.target.files[0]
})

}
render(){                                                
    return(
      <div className="App">
      <form action="http://localhost:8080/upload" encType="multipart/form-data" method="POST"> 
      <input type="file" name="theFile" onChange={this.fileSelectedHandler} accept="image/*"/>
      <input type="submit"  value="Upload Photo" />
      </form>
      <img src={this.state.selectedFile} alt="" />
      {/* <button onClick={this.fileUploadHandler}>Upload My Image</button> */}
      </div>
    )
  } 
}

export default Image;
