/**
 * Nguoi dung vao trang index, neu co cookie (da login) thi vao thang trang quiz, khong thi redirect sang trang login
 * Nguoi dung vào trang login, nếu đăng nhập bằng user chưa có trong localStorage thì redirect sang trang register
 * Nguoi dùng vào trang register, thông tin sẽ dc save vào localStorage.
 * Người dùng vào trang quiz, nếu đã làm quiz (có cookie lưu point) thì sẽ dc thông báo điểm quiz đã làm. Chưa có cookie thì sẽ làm sau đó nhận kq & kq dc lưu vào localStorage
 */


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



var users = [];                 // Luu mang user
var results = [['1'], ['2']];   // Dap an
var questions = [];             // Mang luu tru cac cau hoi & mang dap an cua no

function save(_questions){      // Save lai cac cau tra loi cua user de tinh diem & luu vao cookie
    let answers = [];
    for (let x = 0; x < _questions.length; x++){   
        answers.push([]);     
        for (let i = 0; i < _questions[x].answers.length; i++){
            let id = `${_questions[x].id}_${_questions[x].answers[i]}`
            let answer = document.getElementById(id)
            if(answer.checked == true){
                answers[x].push(answer.value);
            }
        }
    }
    console.log(_questions);
    console.log(answers);
    return answers;
}

function check_result(_results){
    let point = 0;
    let answers = save(questions);
    for (let x = 0; x < answers.length; x++){
        if (_results[x].toString() == answers[x].toString()){
            point ++;
        }
    }
    alert("You are have " + point + " points");
    setCookie("point", point, 1);   // Save diem cua user vao cookie
}



function load_question(_questions){
    if (getCookie("point") != ""){
        username = getCookie("username");
        point = getCookie("point");
        alert(username + " have " + point + " points");
    }
    let str = "";
    let answers1 = ["A. Vinh", "B. David", "C. Viny"];
    let question1 = new Question(1, "What's your name?", answers1);
    let answers2 = ["A. 19", "B. 35", "C. 30"];
    let question2 = new Question(2, "How old are you?", answers2);
    
    _questions.push(question1);
    _questions.push(question2);

    // List question
    for (const x of _questions){
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
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0){
            return c.substring(name.length, c.length);
        }  
    }
    return "";
}

function index(){
    users = JSON.parse(localStorage.getItem('users') || "[]");
    if (getCookie("username") != ""){
        users.forEach(user => {
            // Have logined
            if (getCookie("username") == user.username && getCookie("password") == user.password){
                console.log("go to quiz");
                //window.location.replace("http://127.0.0.1:5500/PF2110R1/Case%20Study/quiz.html");
            }
            else{
                alert(user.username + user.password);
            }       
        });
    }else {
        console.log("go to login");
        //window.location.replace("http://127.0.0.1:5500/PF2110R1/Case%20Study/login.html");
    }
}

function login(){
    if (getCookie("username") != ""){
        users.forEach(user => {
            // Have logined
            if (getCookie("username") == user.username && getCookie("password") == user.password){
                console.log("go to quiz");
                //window.location.replace("http://127.0.0.1:5500/PF2110R1/Case%20Study/quiz.html");
            }  
        });
    }
    users = JSON.parse(localStorage.getItem('users') || "[]");
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let account = new User(username, password);
    setCookie("username", username, 1);
    setCookie("password", password, 1);
    console.log(users);
    if (users.length > 0){
        for (let i = 0; i < users.length; i++){
            if (users[i].username == account.username && users[i].password == account.password){
                console.log("go to quiz");
                //window.location.replace("http://127.0.0.1:5500/PF2110R1/Case%20Study/quiz.html");
            }
        }
    }else{
        console.log("go to register");
    }
}
    

function register(){
    users = JSON.parse(localStorage.getItem('users') || "[]");
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let account = new User(username, password);
    users.push(account);
    localStorage.setItem('users', JSON.stringify(users));
    console.log("go to login");
}
