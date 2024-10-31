import Quiz from "./quiz.js";

class Setting {
    constructor() {
        this.settingDom = document.querySelector('.setting');
        this.quizDom = document.querySelector('.quiz');
        this.categoryDom = document.querySelector('#category');
        this.difficultyDom = [
            document.querySelector('#easy'),
            document.querySelector('#medium'),
            document.querySelector('#hard')
        ];
        this.nQuestionsDom = document.querySelector('#n-questions');
        this.startBtnDom = document.querySelector('#start-btn');

        this.quiz = {};
        // Bind 'this' for startQuizApp to ensure the right context is used
        this.startBtnDom.addEventListener('click', this.startQuizApp.bind(this));
    }

    getAmount = () => {
        const amount = this.nQuestionsDom.value;
        if (amount > 0 && amount <= 20)
            return amount;
        else
            alert('Please enter a number between 1 and 20 for questions.');
    };

    getCategory = () => {
        const category = this.categoryDom.value;
        if (!isNaN(category))
            return category;
        else
            alert("Please select a category.");
    };

    getDifficulty = () => {
        const difficulty = this.difficultyDom.find(el => el.checked);
        if (difficulty)
            return difficulty.id;
        else
            alert('Please select a difficulty level.');
    };

    startQuizApp = async () => {
        try {
            const amount = this.getAmount();
            const category = this.getCategory();
            const difficulty = this.getDifficulty();

            // Stop if any of the values are invalid
            if (!amount || !category || !difficulty) return;

            const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`;
            let result = await this.fetchData(url);

            if (result && result.length > 0) {
                console.log(result);
                this.settingDom.style.display = "none";
                this.quizDom.style.display = "block";
                this.quiz = new Quiz(this.quizDom, amount, result);
            } else {
                alert("No questions found. Please try different settings.");
            }
        } catch (error) {
            console.error("Error starting quiz:", error);
        }
    };

    fetchData(url) {
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    return data.results;
                } else {
                    alert("No questions found for the selected settings.");
                    return [];
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                return [];
            });
    }
}

export default Setting;
