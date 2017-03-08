// This is just some sample data so you don't have to think of your own!
const sampleGame = {
	cats: [],
	phase: {
		possibleNames:[
			'roundIntro',
			'categoryPresentation',
			'clueSelection',
			'cluePresentation',
			'buzzIn',
			'questionSelectIntro',
			'questionSelect',
			'results',
			'scoreAdjustment',
			'init'
		],
		name: 'init',
		// State Helper booleans
		isInit: true,
		isRoundIntro: false,
		isCategoryPresentation: false,
		isClueSelection: false,
		isCluePresentation: false,
		isBuzzIn: false,
		isQuestionSelectIntro: false,
		isQuestionSelect: false,
		isResults: false,
		isScoreAdjustment: false,

		hasInit: false

	},
	round: 0,
	rounds: [
		{ 
			cats:[]
		},
		{ 
			cats:[]
		},
		{ 
			cats:[]
		},
		{ 
			cats:[]
		},
	],
	currentClue: {
		cat:0,
		clue:0,
	},
	// round: 1, // single 
	// round: 2, // double
	// round: 3, // final
	players: [
		// id reserved for game use
		{id: 0, name:'system'}, 
		// ids of real players may be weird and long
		{id: 1, name:'Player 1'},
		{id: 2, name:'Player 2'},
		{id: 3, name:'Player 3'},
		{id: 4, name:'Player 4'}
	],
	// system is player through init phase and between rounds etc.
	activePlayer: 0
};

for (var i = 1; i <= 6; i++) {
	sampleGame.cats[i] = {
		catTitle: `Category ${i}`,
		clues: {
		}
	};
	for (var j = 1; j <= 5; j++) {
		sampleGame.cats[i].clues[j] = {
			clue: `This Is A Thing`,
			q:{
				1: `What Is Stuff?`,
				2: `What Are Things?`,
				3: `Who Is This?`,
				4: `Where Is That?`,
			},
			cq: 3
		};
	}
}

export default sampleGame;
