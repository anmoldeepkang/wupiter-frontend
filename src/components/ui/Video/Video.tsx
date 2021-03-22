import React, {FC} from 'react';
import {Button, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {UserModel} from "infrastructure/context";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Form,Modal,ListGroup,Col} from 'react-bootstrap';
import VideoRecorder from 'react-video-recorder';
import {getQuestion} from "../../../service";
import { v4 as uuidv4 } from 'uuid';


export default class Video extends React.Component<any, any> {
  private video=null;
  constructor(props) {
    super(props);
    this.video=React.createRef();
    this.state={
      src:props.src,
      recordedChunks:[],
      recorder:null,
      stream:null,
      file:null,
      url:null
    }
    this.recordVideo=this.recordVideo.bind(this);
    this.stopVideoRecording=this.stopVideoRecording.bind(this);
  }

  componentDidMount(){

  }
  recordVideo() {

    let config={ video: true, audio: true };
    var browser = navigator;

         browser.getUserMedia = (browser.getUserMedia);
         this.video.current.autoplay=true;
      var that=this;
     browser.mediaDevices.getUserMedia(config).then(stream => {
       that.setState({stream:stream});
       that.video.current.srcObject =stream;
       var theRecorder=null;
       try {
          theRecorder = new MediaRecorder(stream, {mimeType : "video/webm"});
       } catch (e) {
         console.error('Exception while creating MediaRecorder: ' + e);
         return;
       }
       let recordedChunks=[];

       theRecorder.ondataavailable =
           (event) => {
             recordedChunks.push(event.data);
             that.setState({recordedChunks:recordedChunks});
           };
       that.setState({recorder:theRecorder});
       that.state.recorder.start(100);
     });
  }
  stopVideoRecording() {
      this.state.recorder.stop();
      this.state.stream.getTracks().forEach(track => { track.stop(); });
      var blob = new Blob(this.state.recordedChunks, {type: "video/webm"});
      var url =  URL.createObjectURL(blob);
      this.video.current.src=url;
      this.video.current.srcObject=undefined;
      this.video.current.autoplay=false;
      let fileName=this.props.src!=undefined && this.props.src!=""?this.props.src.substring(this.props.src.lastIndexOf('/')+1,this.props.src.indexOf("?")):(uuidv4()+".webm");
      this.props.updateVideoFile(new File([blob],fileName));
  }
  render(){

    return (
      <>
      <video ref={this.video} src={this.props.src} controls/>
      <div style={{marginTop:'20px'}}>
        <Button variant="primary" style={{marginRight:'15px'}} onClick={this.recordVideo}>
                Record
        </Button>
        <Button variant="secondary" onClick={this.stopVideoRecording}>
                Stop
        </Button>
      </div>
      </>
    );
  }
}
