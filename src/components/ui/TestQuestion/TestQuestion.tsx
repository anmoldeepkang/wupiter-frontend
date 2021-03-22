import React, {FC} from 'react';
import {Button,Form} from 'react-bootstrap';
import Countdown from 'react-countdown';
import Timer from '../Timer/Timer';
import Video from '../Video/Video';
import {postAnswer,uploadVideo} from "../../../service";

export default class TestQuestion extends React.Component<any, any> {
private timer=null;
private video=null;
  constructor(props) {
    super(props);
    this.timer=React.createRef();
    this.state={
      answer:{
        choiceId:[],
        assessmentId:this.props.assessmentId,
        attemptId:this.props.attemptId,
        questionId:this.props.questionId,
        videoAnswerUrl:""
      },
      recording:false,
      responseVideo:null
    }

  }

  componentDidMount(){

  }
  markChoice=(e,id)=>{
    let answer=this.state.answer;
    let choices=answer.choiceId;
    if(!e.target.checked) {
      const index = choices.indexOf(id);
        if (index > -1) {
          choices=choices.splice(index, 1);
        }

    } else {
      choices.push(id);
    }
    answer.choiceId=choices;
    this.setState({answer:answer});
  }
  goToNextQuestion=async ()=>{
    let answer=this.state.answer;
    answer.questionId=this.props.question.id;
    await postAnswer(answer);
    await uploadVideo(this.state.responseVideo);
    answer.choiceId=[];
    answer.videoAnswerUrl="";
    this.setState({recording:false,responseVideo:null,answer:answer});
    await this.props.goToNextQuestion();
    if(this.timer.current) {
      this.timer.current.restartTimer(this.props.question.timeLimit);
    }
  }
  videoEnded=()=>{
    if(this.props.question.answerType=='Video') {
      this.setState({recording:true});
    }
  }
  saveVideoResponse(file) {
    if(file) {
      this.setState({responseVideo:file});
      let answer=this.state.answer;
      answer.videoAnswerUrl='https://wupiter1.blob.core.windows.net/videos/'+file.name;
      this.setState({answer:answer});
      this.goToNextQuestion();
    }

  }

  render(){

    return (
      <>
      <h3>{this.props.question.title}</h3>
      {this.props.question.timeLimit>0 &&
        <Timer ref={this.timer} seconds={this.props.question.timeLimit} goToNextQuestion={async ()=>{await this.goToNextQuestion()}}/>
       }
       {this.props.question.questionType=='Video' && !this.state.recording &&
        <div>
        <video ref={this.video} src={this.props.question.videoUrl} autoPlay onEnded={this.videoEnded}/>
        </div>
      }
      {(this.state.recording || (this.props.question.questionType=='MCQ' && this.props.question.answerType=='Video')) &&
        <Video updateVideoFile={(file)=>{this.saveVideoResponse(file)}}/>
      }
      {this.props.question.answerType=='MCQ' &&
        <div>
          {this.props.question.choices.map((choice, index) => (
              <div key={choice.id} style={{display:'flex',flexDirection:'column'}}>
                <Form.Check type="checkbox" label={choice.description} onChange={e=>{this.markChoice(e,choice.id)}} />
              </div>
          ))}
        </div>
      }
      <div style={{marginTop:'20px',float:'right'}}>
      <Button variant="primary" onClick={async()=>{await this.goToNextQuestion()}}>
        Next
      </Button>
      </div>
      </>
    );
  }
}
