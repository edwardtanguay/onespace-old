import React, { Component } from 'react';


import FlashcardList from './FlashcardList';

const flashcards = require('../data/custom/itemType_flashcards.json');


interface MainState {
	flashcards: any[]
}

class Home extends Component<{}, MainState> {
	constructor(props: any) {
		super(props);
		this.state = {
			flashcards: []
		};
	}

	componentDidMount() {
		this.setState({
			flashcards
		});
	}
	
	render() {
		return (
			<div>
				<h2>Latest items:</h2>
				<FlashcardList flashcards={this.state.flashcards} />
			</div>
		);
	}
}

export default Home;