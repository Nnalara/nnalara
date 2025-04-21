document.addEventListener('DOMContentLoaded', () => {
	
	const answers = [
		"This knowledge is not for the faint of heart.",
		"You're better off not knowing.",
		"One step forward, and there's no turning back.",
		"Are you sure you're ready for the answer?",
		"Some doors are better left unopened.",
		"Ask me again when you're ready.",
		"I wouldn't rush into this if I were you.",
		"This answer will change everything.",
		"Do you truly want to understand?",
		"Sometimes silence is the best answer.",
		"The darkness knows but won't tell.",
		"Not all secrets are meant to be uncovered.",
		"You're not prepared for this.",
		"Be careful—the truth cuts deep.",
		"There's darkness behind this question.",
		"Time will tell… or conceal.",
		"You're not the first to ask… nor the last.",
		"This path leads to nowhere.",
		"Sometimes it's better just to believe.",
		"Are you ready for the consequences?",
		"This knowledge will burn your mind.",
		"The secret will remain a secret.",
		"You won't find the answer where you're looking.",
		"Don't wake the sleeping demons.",
		"Fate hasn't spoken its final word.",
		"This question leads to the abyss.",
		"You don't want to know the truth.",
		"Sometimes the answer is worse than not knowing.",
		"Only a madman seeks this.",
		"Leave it in the dark.",
		"You won't be able to forget this.",
		"Some things should stay hidden.",
		"You're playing with fire.",
		"This is not for your ears.",
		"Quiet… someone's listening.",
		"You're not ready for what you'll hear.",
		"Ask again at midnight.",
		"This knowledge demands a sacrifice.",
		"Are you sure you want to continue?",
		"Sometimes the question matters more than the answer.",
		"This answer will break you.",
		"The darkness whispers, but I don't listen.",
		"You won't find the answer in this world.",
		"Beware—knowledge kills.",
		"This path leads to madness.",
		"You shouldn't hear this.",
		"Only the desperate seek this.",
		"Fate isn't ready to reveal its cards.",
		"This question will remain unanswered.",
		"You already know… but fear to admit it."
	];

	
	document.getElementById('que').addEventListener('click', () => {
		document.getElementById('arrow').classList.add('yes');
	});

	document.getElementById('arrow').addEventListener('click', () => {
		document.getElementById('que').classList.add('que_fly');
		document.getElementById('arrow').classList.add('none');
		document.getElementById('next').classList.add('visible');
		updateValues();
	});


	function showAnswer() {
	  const answerEl = document.getElementById("answer");

	  answerEl.classList.add("hidden");

	  setTimeout(() => {
		const randomIndex = Math.floor(Math.random() * answers.length);
		answerEl.textContent = answers[randomIndex];
		answerEl.classList.remove("hidden");
	  }, 1600); 
	}
	
	document.getElementById("arrow").addEventListener("click", showAnswer);
	
	
	document.getElementById('next').addEventListener('click', () => {
		document.getElementById('que').classList.remove('que_fly');
		document.getElementById('arrow').classList.remove('none');
		document.getElementById('arrow').classList.remove('yes');
		document.getElementById('que').value = '';
		document.getElementById("answer").textContent = 'Ask fate a question';
		document.getElementById('next').classList.remove('visible');
		
		updateValues();
	});
	
	
});