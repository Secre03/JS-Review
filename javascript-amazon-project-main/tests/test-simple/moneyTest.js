import calculateCents from "../utils/money.js";


console.log('test suite: format currency');
// gourp related test is called - test suite
console.log('converts price to cents');
if(calculateCents(2095) === '20.95'){
  console.log('passed');
}else{
  console.log('failed');
}

console.log('works whit 0');
if(calculateCents(0) === '0.00'){
  console.log('passed');
}else{
  console.log('failed');
}

console.log('round to the nearest cents');
if(calculateCents(2000.5) === '20.01'){
  console.log('passed');
}else{
  console.log('failed')
}
// this called autoomated test using code
// first case Basic Test
// Second is Edge cases(if there are any)
