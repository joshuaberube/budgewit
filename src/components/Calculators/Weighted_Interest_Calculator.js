

let total = loans.reduce((acc, {amount}) => acc += amount, 0)
let interest = loans.reduce((acc, {amount, rate}) => acc += amount * rate, 0)
let avgInterest = (interest / total.toFixed(2) *100 + '%')

console.log(total)
console.log(interest)
console.log(avgInterest)