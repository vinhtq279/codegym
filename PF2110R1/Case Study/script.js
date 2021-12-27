class Question{
    constructor(id, context, answers){
        this.id = id;
        this.context = context;
        this.answers = answers;
    }
}

class User{
    username;
    password;
    picture;
    result;
    answers = [];
    constructor(_username, _password){
        this.username = _username;
        this.password = _password;
    }
}

function save(_questions){
    let answers = [];
    for (let x = 0; x < _questions.length; x++){   
        answers.push([]);     
        for (let i = 0; i < _questions[x].answers.length; i++){
            let id = `${_questions[x].id}_${_questions[x].answers[i]}`
            console.log(id);
            let answer = document.getElementById(id)
            if(answer.checked == true){
                answers[x].push(answer.value);
            }
        }
    }
    console.log(answers);
    return answers;
}

function check_result(_results){
    let point = 0;
    let answers = save(questions);
    console.log(_results);
    for (let x = 0; x < answers.length; x++){
        if (_results[x].toString() == answers[x].toString()){
            point ++;
        }
    }
    alert("You are have " + point + " points");
}

function load_question(){
    let str = "";
    let questions = [];
    let answers1 = ["A. Vinh", "B. David", "C. Viny"];
    let question1 = new Question(1, "What's your name?", answers1);
    let answers2 = ["A. 19", "B. 35", "C. 30"];
    let question2 = new Question(2, "How old are you?", answers2);
    let results = [['1'], ['2']];
    questions.push(question1);
    questions.push(question2);

    // List question
    for (const x of questions){
        str += x.context + "<br>";
        for (let i = 0; i < x.answers.length; i++){
            let str1 = `<input type='checkbox' id='${x.id}_${x.answers[i]}' value='${i + 1}'>${x.answers[i]}</input><br>`;
            str += str1;
        }
    }
    document.getElementById("questions").innerHTML = str;
}

// User
function setCookie(cname, cvalue, exdays){
    const d = new Date();
    d.setTime(d.getTime() + (exdays + 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + "=" + ";path=/";
    console.log(cname + "=" + cvalue + ";" + expires + "=" + ";path=/");
}

function getCookie(cname){
    let name = cname + "=";
    let ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++){
        let c = ca[i];
        
        while (c[0] == " "){
            //console.log(c);
            c = c.substring(1);
            //console.log(c);
        }
        //console.log(c);
        if (c.indexOf(name) == 0){
            return c.substring(name.length, c.length);
            console.log(c);
        }  
        
    }
    return "";
}

function index(){
    let get = JSON.parse(localStorage.getItem('user'));
    users = get;
    if (getCookie("username" != "")){
        users.forEach(user => {
            // Have logined
            if (getCookie("username") == user.username && getCookie("password") == user.password){
                console.log("go to quiz");
                //window.location.replace("http://127.0.0.1:5500/PF2110R1/Case%20Study/quiz.html");
            }
            else{
                alert(user.username + user.password);
            }   
            console.log(user);      
        });
        console.log(users);
    }else {
        console.log("go to login");
        //window.location.replace("http://127.0.0.1:5500/PF2110R1/Case%20Study/login.html");
    }
}

function login(){
    users = JSON.parse(localStorage.getItem('users') || "[]");
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let account = new User(username, password);
    setCookie("username", username, 1);
    setCookie("password", password, 1);
    console.log(users);
    if (users.length > 0){
        if (users.indexOf(account) >= 0){
            console.log("go to quiz");
            console.log(users.indexOf(account));
            //window.location.replace("http://127.0.0.1:5500/PF2110R1/Case%20Study/quiz.html");
        }else{
            users.push(account);
            localStorage.setItem('users', JSON.stringify(users));
            console.log("go to login because this is first time you login");
        }
    }else{
        users = [];
        users.push(account);
        localStorage.setItem('users', JSON.stringify(users));
        alert("pls login");
    }
    
    console.log(users);
}
    
    

let users = [];

function create_users(){    
    let user1 = new User("vinhtq", "123@123a");
    let user2 = new User("quangtv", "123@123a@");
    users.push(user1);
    users.push(user2);
}

function debug(){
    console.log(users);
}

