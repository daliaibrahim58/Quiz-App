class Question {
    constructor(question) {
        this.questionsDom = document.querySelector('#questions');
        this.answersDom = [
            document.querySelector('#a1'),
            document.querySelector('#a2'),
            document.querySelector('#a3'),
            document.querySelector('#a4')
        ];

        this.correctAnswer = question.correct_answer;
        this.question = question.question;
        this.isCorrect = false;

        // Shuffle answers for randomness
        this.answers = [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5);

        // Render the question and answers
        this.render();
    }

    render = () => {
        this.questionsDom.innerHTML = this.question;
        this.answersDom.forEach((el, idx) => {
            el.innerHTML = `<input type="radio" name="radio" /> ${this.answers[idx]}`;
        });
    };

    answer = (checkElement) => {
        this.isCorrect = checkElement.textContent.trim() === this.correctAnswer;
    };
}

export default Question;
