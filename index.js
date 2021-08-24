// finish each unit and test it then integrate between functions
// the structure of the game and the question

const game = {
    sports: {
        color: "orange",
        questions: [
            {
                q: "football is played by 11 player",
                answer: true,
            },
            {
                q: "number of players in basketball team are ?",
                answer: 1,
                options: [4, 5, 6, 7]
            },
        ],
    },
    javascript: {
        color: "gray",
        questions: [
            {
                q: "type of [1,2,3] is array",
                answer: false,
            },
        ],
    },
    other: {
        color: "white",
        questions: [
            {
                q: "q1",
                answer: true,
            },
            {
                q: "q2",
                answer: false,
            },
            {
                q: "q3",
                answer: true,
            },
        ],
    },
}
// you can't change this object

// answer maybe true or false
// or an index of the answer inside multiple choice




// extract type from url query string
function queryExtractor(url) {
    // you code should be generic and assume you don't know the url
    // expected output
    /*
            input: darb.com/question?type=sports => return: 'sports'
            input: darb.com/question?type=other => return: 'other'
            input: darb.com/question?type=others => return: 'others'
            input: darb.com/question => output: undefined
    */
    if (!url.includes('?'))
        return


    // create an empty object to store the query elements inside it
    let newObject = {}

    // splitting the query each element apart then save the element and its value as key value pair
    //  in the newObject Object.
    url.split('?')[1].split('&').forEach((element) => {
        newObject[element.split('=')[0].toLowerCase()] = element.split('=')[1].toLowerCase()
    })

    // Testing wether the object newObject has a property/key/element named type if so returns its value
    //  or returns 'other'
    if (newObject.hasOwnProperty('type')) {
        return newObject['type']
    }
    else{
        return 'other'
    }


}

// this function return the first question from selected type then put that question in the end
// زي المونابولي بتسحب ورقة من فوق وبتحطها بالاخير بعدما تقراها

function pickQuestion(type) {
    // use game object to get question
    // we use || in case the type not exist in the game ( choosing category not exit )
    // ex type = 'fun' fun not exist in game object so it's value undefined
    const category = game[type] || game['other']
    // based on your understand of array index and object dot and bracket notation return the first question in the array then put this question in the end of the array
    // take first question of the category and store it in pickedQ
    let pickedQ = category.questions.shift();
    // push the question at the end of the category
    category.questions.push(pickedQ);
    return pickedQ
}

// this function should return boolean
/*
    true if user answer is correct
    false otherwise
*/
function validateAnswer(question, userAnswer) {
    // compare question answer with user answer

    /*
        question may be true of false , or maybe multiple choice
        if multiple choice then question answer should represent the index of the correct answer
        inside option property :
        ex1 {answer:1,options:[1,2,3]}
        answer 1 mean that => the answer is 2
        ex2 {answer:2,options:["hatem","ahmed","mohamed"]}
        answer 2 mean that => the answer is mohamed

        but if it is yes or no question , the answer should be like this
        // true => yes , false => no

        write code to print the correct answer

        console.log(......) // the answer is ...
    */
    
    if (typeof userAnswer == 'number' && question.hasOwnProperty('options')) {
        let correctAnswer = question.options[question.answer]
        let answerValue = question.options[userAnswer]
        if (userAnswer == question.answer) {
            console.log('user answer is : ', answerValue)
            return true
        } else {
            console.log('user answer is : ', answerValue)
            console.log('The correct answer is ' + correctAnswer)
            return false
        }
    }
    if (typeof userAnswer == 'boolean') {
        let answerValue = question.answer
        if (userAnswer == question.answer) {
            // convert message from true to Yes and false to No
            userAnswer == true ? answerValue = "Yes" : answerValue = "No"
            console.log('user answer is : ', answerValue)
            return true
        } else {
            // convert message from true to Yes and false to No
            userAnswer == true ? answerValue = "Yes" : answerValue = "No"
            console.log('user answer is : ', answerValue)
            return false
        }
    }
}

function play(url, answer) {
    const type = queryExtractor(url)
    console.log('type picked is ', type)
    const question = pickQuestion(type)
    console.log('question picked is ', question)
    const isCorrect = validateAnswer(question, answer)
    console.log(`your answer is ${isCorrect ? 'correct' : 'incorrect'}`)
}


// testing by passing other, no query, un relevant query
play('darb.com/question?type=other&f=d', true) // { q: 'q1', answer: true }
play('darb.com/question', true) // { q: 'q2', answer: false }
play('darb.com/question?key=value', true) // { q: 'q3', answer: true }
play('darb.com/question?type=s', true) // // { q: 'q1', answer: true }

// testing selecting question from sports category
play('darb.com/question?type=sports', true)
play('darb.com/question?type=sports', 1) // 1 mean : selecting the second choice
