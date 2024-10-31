import Final from "./final.js";
import Question from "./question.js";

class Quiz {
    constructor(quizDom, amount, questions) {
        this.quizDom = quizDom;
        this.currentDom = document.querySelector('.current');
        this.totalDom = document.querySelector('.total');
        this.finalDom = document.querySelector('.final');
        this.nextBtnDom = document.querySelector('#next');

        this.totalAmount = amount;
        this.answeredAmount = 0;

        this.questions = this.setQuestion(questions);

        console.log(this.questions);

        this.nextBtnDom.addEventListener('click', this.nextQuestion.bind(this)); // Pass function reference
        
        this.renderQuestion();
    }

    setQuestion = (questions) => {
        return questions.map(question => new Question(question));
    };

    renderQuestion = () => {
        this.questions[this.answeredAmount].render();
        this.currentDom.innerHTML = this.answeredAmount + 1;
        this.totalDom.innerHTML = this.totalAmount;
    };

    nextQuestion = () => {
        const checkElement = this.questions[this.answeredAmount].answersDom.find(ele => ele.querySelector('input').checked);
        if (!checkElement) {
            alert("Please select an answer.");
        } else {
            this.questions[this.answeredAmount].answer(checkElement);
            this.answeredAmount++;
            this.answeredAmount < this.totalAmount ? this.renderQuestion() : this.endQuizApp();
        }
    };

    endQuizApp = () => {
        this.quizDom.style.display = "none";
        this.finalDom.style.display = "block";

        const correct = this.countCorrectAnswers();
        new Final(correct, this.totalAmount);
    };

    countCorrectAnswers = () => {
        return this.questions.reduce((count, question) => count + (question.isCorrect ? 1 : 0), 0);
    };
}

export default Quiz;
