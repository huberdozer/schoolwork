const sentences = [
  {
    fullSentence: "The quick brown fox jumps over the lazy dog.",
    blankedWords: ["quick", "lazy"]
  },
  {
    fullSentence: "She loves to read books in her spare time.",
    blankedWords: ["loves", "spare"]
  },
  {
    fullSentence: "The little bird flew away from its nest.",
    blankedWords: ["little", "nest"]
  },
  {
    fullSentence: "Eating healthy foods is important for growth.",
    blankedWords: ["healthy", "growth"]
  },
  {
    fullSentence: "I enjoy listening to music.",
    blankedWords: ["enjoy"]
  }
];

let score = 0;

function displaySentences() {
  const sentencesContainer = document.getElementById("sentences-container");
  sentencesContainer.innerHTML = "";

  sentences.forEach((sentence, index) => {
    const blankedWordsRegex = new RegExp(sentence.blankedWords.join("|"), "gi");
    const blankedSentence = sentence.fullSentence.replace(blankedWordsRegex, () => '<span class="blank-word"></span>');

    const sentenceDiv = document.createElement("div");
    sentenceDiv.classList.add("sentence");
    sentenceDiv.innerHTML = blankedSentence;

    const blankWords = sentenceDiv.querySelectorAll(".blank-word");
    blankWords.forEach((blankWord, blankIndex) => {
      const input = document.createElement("input");
      input.type = "text";
      input.dataset.sentenceIndex = index;
      input.dataset.blankIndex = blankIndex;
      blankWord.appendChild(input);
    });

    sentencesContainer.appendChild(sentenceDiv);
  });

  // Focus the first input field
  const firstInput = document.querySelector("#sentences-container input");
  firstInput.focus();
}

displaySentences();

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", checkAnswers);

function checkAnswers() {
  const inputFields = document.querySelectorAll("#sentences-container input");
  let correctAnswers = 0;

  inputFields.forEach((input) => {
    const sentenceIndex = parseInt(input.dataset.sentenceIndex);
    const blankIndex = parseInt(input.dataset.blankIndex);
    const sentence = sentences[sentenceIndex];
    const correctAnswer = sentence.blankedWords[blankIndex].toLowerCase();
    const userAnswer = input.value.trim().toLowerCase();

    if (userAnswer === correctAnswer) {
      correctAnswers++;
      input.classList.remove("incorrect");
      input.classList.add("correct");
    } else {
      input.classList.remove("correct");
      input.classList.add("incorrect");
    }
  });

  score += correctAnswers;
  document.getElementById("score-display").textContent = `Score: ${score}`;

  const resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = "";

  if (correctAnswers === inputFields.length) {
    const congratsMessage = document.createElement("p");
    congratsMessage.textContent = "Congratulations! You've completed all sentences.";
    resultsContainer.appendChild(congratsMessage);
  } else {
    const tryAgainMessage = document.createElement("p");
    tryAgainMessage.textContent = `You got ${correctAnswers} out of ${inputFields.length} correct. Try again!`;
    resultsContainer.appendChild(tryAgainMessage);
  }
}