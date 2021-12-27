function fibonacy(n){
    let arr = [0, 1];
    let num1 = 0;
    let num2 = 1;
    let temp;
    for (let i = 0; i <= n; i++){
        temp = num1 + num2;
        num1 = num2;
        num2 = temp;
        if (temp > n){
            break;
        }
        arr.push(temp);
        document.write(temp + ", ");
        if (temp == n){
            alert(n + " is fibonacy number");
        }
    }
    if (temp !=n ){
        alert(n + " is not fibonacy number");
    }
}