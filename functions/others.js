function n(number){
    return new Decimal(number)
}
function mod(num1,num2){
    return num1.div(num2).sub(num1.div(num2).floor());
}
function w(id,data){
    document.getElementById(id).innerHTML = data
}
function e(id){
    return document.getElementById(id)
}

var zero = n(0)
var one = n(1)
var two = n(2)
var ten = n(10)