class Final {
    constructor(correctAnswers, totalQuestions) {
        this.scoreDom = document.querySelector('.score');
        this.againDom = document.querySelector('#again');

        this.render(correctAnswers, totalQuestions);
        this.againDom.addEventListener('click', this.startAgain);
    }

    render = (correctAnswers, totalQuestions) => {
        this.scoreDom.innerHTML = `You answered ${correctAnswers} out of ${totalQuestions}`;
    }

    startAgain = () => {
        location.reload();
    }
}

export default Final;
