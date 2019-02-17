var numbers = [15.5, 2.3, 1.1, 4.7];
 
function getSum(total, num) {
    return total + Math.round(num);
}

function myFunction() {
    console.log(numbers.reduce(getSum, 0))
}

myFunction()