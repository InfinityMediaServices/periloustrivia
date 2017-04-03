// This is just some empty data so you don't have to think of your own!
const emptyGame = {
	cats: [],
	phase: {
		possibleNames:[
			'playerSelect',
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
		// State Helper booleans
		isPlayerSelect: false,
		isRoundIntro: false,
		isCategoryPresentation: false,
		isClueSelection: false,
		isCluePresentation: false,
		isBuzzIn: false,
		isQuestionSelectIntro: false,
		isQuestionSelect: false,
		isResults: false,
		isScoreAdjustment: false,

		isInit: true,
		name: 'init',
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
	emptyGame.cats[i] = {
		catTitle: 'false',
		clues: {}
	};
	for (var j = 1; j <= 5; j++) {
		emptyGame.cats[i].clues[j] = {
			clue: 'false',
			q:{
				1: 'false',
				2: 'false',
				3: 'false',
				4: 'false',
			},
			cq: 0
		};
	}
}

export default emptyGame;
