import React, { Component } from 'react';
import './App.css';

const videos = [
	{
		id: "LsA84bXrBZw",
		max: 300
	},
	{
		id: "PQdVTMZQtAk",
		max: 600
	},
	{
		id: "10mUJTmd9Jk",
		max: 100
	},
	{
		id: "Rh9ZSBa06hE",
		max: 100
	},
	{
		id: "zFjLSlTMV2k",
		max: 600
	},
	{
		id: "m728qku93YQ",
		max: 600
	},
	{
		id: "PhxE1RFtAWY",
		max: 600
	},
	{
		id: "HAfFfqiYLp0",
		max: 290
	},
	{
		id: "fJ0JikMcRO4",
		max: 290
	},
	{
		id: "OWa5rzEOumQ",
		max: 500
	},
	{
		id: "wMH0e8kIZtE",
		max: 180
	},
	{
		id: "0J2QdDbelmY",
		max: 150
	},
	{
		id: "ljg_EgXMjO0",
		max: 500
	},
	{
		id: "ljg_EgXMjO0",
		max: 0
	},
	{
		id: "ALgKzRyCLiY",
		max: 400
	},
	{
		id: "zLAhRiUeJ8E",
		max: 120
	},
	{
		id: "VWSRtPTmRr4",
		max: 200
	},
	{
		id: "phr1pOFK1V8",
		max: 120
	},
]

const deadline = '2017/01/01'; //change to date to count down to


class VideoPlayer extends Component {
	render() {
		return (
			<div style={{
				position: "fixed",
				zIndex: -99,
				left: "-10%",
				width: "120%",
				height: "120%",
				opacity: this.props.opacity
			}}>
				<iframe
					style={{
						outline: 0,
						border: 0
					}}
					frameborder="0" 
					height="100%" 
					width="100%" 
					src={`https://youtube.com/embed/${this.props.video.id}?start=${this.props.video.start}&autoplay=1&controls=0&showinfo=0&autohide=1`}>
    			</iframe>
    		</div>
    	);
	}
}

class CountdownTimer extends Component {
	render (){
		let time = this.props.time;

		let hours = time.hours + time.days * 24
		if(hours < 10){
			hours = "0"+time.hours
		}

		let minutes = time.minutes
		if(minutes < 10){
			minutes = "0"+time.minutes
		}

		let seconds = time.seconds
		if(seconds < 10){
			seconds = "0"+time.seconds
		}

		return (
			<div>{hours}:{minutes}:{seconds}</div>
		)
	}
}


class App extends Component {
	constructor(props) {
		super(props);

		let firstVid = videos[Math.floor(Math.random() * videos.length)]

		this.state = {
			time: this.getTimeRemaining(deadline),
			video: {
				id: firstVid.id,
				start: Math.floor(Math.random() * firstVid.max)
			},
			videoOpacity: 1,
			countDownInterval: {},
			videoInterval: {},
		}

		this.skipVideo = this.skipVideo.bind(this);
		this.randVideo = this.randVideo.bind(this);
		this.countdown = this.countdown.bind(this);
	}

	getTimeRemaining(endtime){
		let t = Date.parse(new Date());
		let seconds = Math.floor( (t/1000) % 60 );
		let minutes = Math.floor( (t/1000/60) % 60 );
		let hours = Math.floor( (t/(1000*60*60)) % 24 );
		let days = Math.floor( t/(1000*60*60*24) );
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	countdown() {
		let time = this.getTimeRemaining(deadline);

		let opacity = 1
		if(time.hours === 0){
			opacity = 1 * (time.minutes/60 + time.seconds)/100;				
		}
		
		this.setState({
			time: time,
			videoOpacity: opacity
		})

		if(time.hours === 0 && time.minutes === 0 && time.seconds === 0){
			clearInterval(this.state.countDownInterval);
			clearInterval(this.state.videoInterval);
		}
	}

	randVideo() {
		//choose random video
		const rand = videos[Math.floor(Math.random() * videos.length)];
		console.log(rand)
		//choose random time
		const time = Math.floor(Math.random() * rand.max);
		this.setState({
			video: {
				id: rand.id,
				start: time
			}
		});
	}

	componentDidMount() {
		this.setState({
			videoInterval: setInterval(this.randVideo(), 15 * 1000), 
			countDownInterval: setInterval(this.randVideo(), 500),
		})
	}

	skipVideo() {
		clearInterval(this.state.videoInterval);
		this.setState({
			videoInterval: setInterval(this.randVideo(), 15 * 1000)
		})
	}

	render() {
		let time = this.getTimeRemaining(deadline);
		return (
			<div className="App">
				<VideoPlayer video={this.state.video} opacity={this.state.videoOpacity}/>
				<div 
					onClick={this.skipVideo}
					style={{
						width: "100%",
						position: "absolute",
						zIndex: 99,
						top: "55%",
						color: "white"
					}}>
					<div style={{
						width: 125,
						margin: "0 auto",
						background: "#000000",
						padding: 12,
					}}>
						<div>"{this.state.video.id}"</div>
						<CountdownTimer time={time} />
					</div>
				</div>

			</div>
		);
	}
}

export default App;
