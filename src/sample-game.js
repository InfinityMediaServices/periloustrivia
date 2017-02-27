// This is just some sample data so you don't have to think of your own!
const sampleGame = {
	cats: {}
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
