var quesElement = document.getElementById("question");
var answerElement = document.getElementById("answers");
var next = document.getElementById("next");
var previous = document.getElementById("previous");
var questionNumber = document.getElementById("question number")
var mark = document.getElementById("mark");
var submit = document.getElementById("submit");
var exam = document.getElementById("exam-container");
var markList = document.getElementById("markList");
var resultContainer = document.getElementById("result");
var userName = document.getElementById("userNmae");


////////////////////answers objects
var ans1 = new Answer(1, "onkeyboardpress")
var ans2 = new Answer(2, "onkeydown")
var ans3 = new Answer(3, "onfocus")
var ans4 = new Answer(4, "onclick")
var ans5 = new Answer(5, "true")
var ans6 = new Answer(6, "false")
var ans7 = new Answer(7, "undefined")
var ans8 = new Answer(8, "error")
var ans9 = new Answer(9, "It returns the decimal values in string form")
var ans10 = new Answer(10, "it returns only the integer portion of the number")
var ans11 = new Answer(11, "None of the above")
var ans12 = new Answer(12, "const")
var ans13 = new Answer(13, "var")
var ans14 = new Answer(14, "let")
var ans15 = new Answer(15, "stringify()")
var ans16 = new Answer(16, "parse()")
var ans17 = new Answer(17, "convert()")
var ans18 = new Answer(18, "It is used to spread iterables to individual elements")
var ans19 = new Answer(19, "It is used to describe a datatype of undefined size")
var ans20 = new Answer(20, "No such operator exists")
var ans21 = new Answer(21, "All objects have a prototype")
var ans22 = new Answer(22, "Base Object")
var ans23 = new Answer(23, "None of the objects have a prototype")
var ans24 = new Answer(24, "Number")
var ans25 = new Answer(25, "Boolean")
var ans26 = new Answer(26, "floot")
var ans27 = new Answer(27, "reverse")
var ans28 = new Answer(28, "shift")
var ans29 = new Answer(29, "slice")
var ans30 = new Answer(30, "splice")

//////////////////////questions object
var q1 = new Question(1, "The event specific to keyboard is", 1, [ans1, ans2, ans3, ans4])
var q2 = new Question(2, `What is the output of the following code snippet" print(NaN === NaN)`, 1, [ans5, ans6, ans7, ans8])
var q3 = new Question(3, ` 
What will be the output of the following code snippet?

const obj1 = {Name: "Hello", Age: 16};
const obj2 = {Name: "Hello", Age: 16};
print(obj1 !== obj2);`, 0, [ans5, ans6, ans7, ans8])
var q4 = new Question(4, "What if you use parseInt() to convert a string containing decimal value?", 2, [ans8, ans9, ans10, ans11])
var q5 = new Question(5, "How can a datatype be declared to be a constant type ?", 0, [ans12, ans13, ans14, ans11])
var q6 = new Question(6, "Which function is used to serialize an object into a JSON string in Javascript ?", 2, [ans17, ans16, ans15, ans11])
var q7 = new Question(7, "What does … operator do in JS ?", 3, [ans20, ans19, ans11, ans18])
var q8 = new Question(8, "Which object in Javascript doesn’t have a prototype?", 1, [ans21, ans22, ans23, ans11])
var q9 = new Question(9, "Which of the following is not JavaScript Data Types?", 3, [ans7, ans24, ans25, ans26])
var q10 = new Question(10, " The _______ method of an Array object adds and/or removes elements from an array.", 3, [ans27, ans28, ans29, ans30])

/////////////////////////////////////////////////////////////////////global variables
var questionsArr = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
var randomQues = [];
var randIndex = [];
var flag = false;
var currentQues = 0;
var currQuesNum = currentQues;
var grades = [];
var result = 0;
var markListArr = [];
var chekList = false;
var markListEl = [];
var markedEl = markList.childNodes;
var time = document.getElementById("timer");
var isActiveAnswer = false;
var activeUserIndx = getCookie("activeUser");
var activeUserName = getCookie(`userFname${activeUserIndx}`)



////////////////////////////////////////////////////////// display user Name
function displayUserName() {
    userName.innerHTML = `Welcome, ${activeUserName}`
}
displayUserName();


// default zero values for all elemnts of grade array
questionsArr.forEach(function () {
    grades.push(0);

})


/////////////////////////////////functions constructors
function Answer(id, val) {
    this.id = id;
    this.value = val;
}

function Question(id, val, ans, choices, SelectedChoice) {
    this.id = id;
    this.value = val;
    this.correctAns = ans;
    this.choices = choices;
    this.SelectedChoice = SelectedChoice;

};
////////////////////////////////////////////////////////////////////////////////////////////methods in prototype

Question.prototype.displayQuestion = function (qNum) {
    quesElement.innerHTML = " ";
    answerElement.innerHTML = " ";
    quesElement.innerHTML = ` ${qNum}-${this.value}`;
    this.choices.forEach(function (choice) {

        var chois = document.createElement("div");
        chois.innerHTML = `${choice["value"]}`;
        chois.classList.add("choice", "col-5", "ps-3", "mb-2");
        answerElement.append(chois);
        questionNumber.innerHTML = `${qNum}/${randomQues.length}`
    })

}

Question.prototype.checkAnswer = function (index) {
    var correct = this.correctAns;
    var choice = this.choices;
    var answerChilds = document.getElementsByClassName("choice");
    var checkedChoice;
    for (var i = 0; i < answerChilds.length; i++) {

        answerChilds[i].addEventListener("click", function (e) {

            checkedChoice = "selectedAnswer";

            if ((e.target.innerHTML) == choice[correct]["value"]) {
                grades.splice(index, 1, 10)
            }
            else {
                grades.splice(index, 1, 0)
            }


            if (this && checkedChoice) {

                this.classList.toggle(`${checkedChoice}`)
                for (var ans of answerChilds) {
                    if (this !== ans) {
                        ans.classList.remove(`${checkedChoice}`)

                    }
                }
            }
        })
    }

}


/// creating random indexes for random questions
function randomIndex() {
    randIndex = [];
    var randomQ;
    while (randIndex.length < questionsArr.length) {
        if (randIndex.length == 0) {
            randomQ = Math.floor(Math.random() * questionsArr.length);
            randIndex.push(randomQ)
        }
        else {

            randomQ = Math.floor(Math.random() * questionsArr.length);
            for (var i = 0; i < randIndex.length; i++) {
                if (randomQ == randIndex[i]) {
                    flag = false;
                    break;
                }
                else {
                    flag = true;
                }
            }
        }
        if (flag) {
            randIndex.push(randomQ);
        }
    }
    //putting the question in random questions array using  random index "numbers"
    randIndex.forEach(function (el) {
        randomQues.push(questionsArr[el])
    })

}
randomIndex();




//next button
function nextbtn() {
    next.addEventListener("click", function () {
        if (currentQues != randomQues.length - 1) {
            currentQues++
            currQuesNum = currentQues
            randomQues[currentQues].displayQuestion(++currQuesNum);
        }
        randomQues[currentQues].checkAnswer(currentQues)
    })

}
nextbtn();


//previous button
function prevbtn() {
    previous.addEventListener("click", function () {
        if (currentQues != 0) {
            currQuesNum = currentQues
            currentQues--;
            randomQues[currentQues].displayQuestion(currQuesNum);
        }

        randomQues[currentQues].checkAnswer(currentQues)

    })
}
prevbtn()


//display first random question
randomQues[0].displayQuestion(++currQuesNum);

//check first answer of the first question
(function checkFirstAns() {
    if (currentQues == 0) {
        randomQues[0].checkAnswer(0);
    }
})()


//////////////////////////////////mark the questions////////////////////////////////////////
function backToQuestion() {
    markedEl.forEach(function (mEl) {
        var quesMarked = mEl.innerHTML.split(" ");
        var quesNum = Number(quesMarked[2]) - 1;

        mEl.addEventListener("click", function () {
            randomQues.forEach(function (q, indx) {
                if (indx == quesNum) {
                    q.displayQuestion(++quesNum);
                    quesNum--;
                    currentQues = quesNum;
                }
            })
            randomQues[currentQues].checkAnswer()
        })
    })

}
function markQuestion() {
    var marknum;
    mark.addEventListener("click", function () {

        marknum = currentQues;
        var markedQ;
        if (markListArr.length < questionsArr.length) {
            if (markListArr.length == 0) {
                markListArr.push(currentQues);
                markedQ = document.createElement("div");
                markedQ.innerHTML = `question number ${++marknum} <span class="closeBtn">X</span>`;
                markedQ.classList.add("markedStyle")
                markList.append(markedQ)
            }
            else {

                for (var i = 0; i < markListArr.length; i++) {
                    if (markListArr[i] == currentQues) {
                        chekList = false;
                        break;
                    }
                    else {
                        chekList = true;
                    }
                }
                if (chekList) {
                    markListArr.push(currentQues);
                    markedQ = document.createElement("div");
                    markedQ.innerHTML = `question number ${++marknum} <span class="closeBtn">X</span>`;
                    markedQ.classList.add("markedStyle")
                    markList.append(markedQ)

                }
            }
        }

        closeMarkedQues();
        backToQuestion();



    })
}
markQuestion();

//////////////////////////pop up the marked questions//////////////////////////////
function closeMarkedQues() {
    markedEl.forEach(function (markQ) {
        var quesMarked = markQ.innerHTML.split(" ");
        var quesNum = Number(quesMarked[2]) - 1
        markQ.childNodes[1].addEventListener("click", function (e) {
            e.stopPropagation();

            for (var i = 0; i < markListArr.length; i++) {

                if (quesNum == markListArr[i]) {
                    markListArr.splice(i, 1)
                }
            }
            markQ.style.display = "none";

        }
        )



    })

}


///////////////////////////////////////////////////submit///////////////////////////// 
function showResult() {
    result = 0;
    if (confirm("are you sure, you want submit?")) {

        grades.forEach(function (grade) {
            result += grade

        })
        location.replace("result.html");
        setcookie("grade", result, new Date("1/1/2023"));
    }
  
}

submit.addEventListener("click", showResult)

/// timer function to close the exam after specific period of time
function timer() {
    var minuts = 9;
    var seconds = 60;

    time.innerHTML = `${minuts}:${seconds}`

    var timer = setInterval(function () {
        if (minuts !== -1) {
            if (seconds != 0) {

                time.innerHTML = `${minuts}:${seconds - 1}`;
                seconds--;
            }
            else {
                minuts--;
                seconds = 60;
            }
        }
        else {
            clearInterval(timer);
            time.innerHTML = ` 00:00 Time Is Up`
            setTimeout(function () {
                showResult();
            }, 1000)

        }

    }, 1000)

}
timer();

















