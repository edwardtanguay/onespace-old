import React, { Component } from 'react';

const greyBox = require('datapod/images/greybox.png');

interface IFlashcard {
	category: string,
	front: string,
	back: string
}

class Flashcard extends Component<IFlashcard> {
	toggleFlashcard = () => {
		console.log(`clicked a flashcard: ${this.props.front}`);
	}

	render() {
		return (
			<figure className="flashcard">
				<img src={greyBox} alt="grey box" className="img-fluid" />
				<figcaption className="front" onClick={this.toggleFlashcard}>{this.props.category.toUpperCase()}: {this.props.front}</figcaption>
				<div className="back">{this.props.back}</div>
			</figure>
		)
	}
}

export default Flashcard;
