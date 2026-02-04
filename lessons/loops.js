// for(let i = 0; i < 10; i++){
//     if(i%2===0){
//         continue
//     }
//     console.log(i);
// }

// let i = 1;
// while(i<=10){
//     if(i === 6){
//         break;
//     }
//     console.log(i);
//     i++;
// }

// let num = [1, -2, -5, 3];

// num.forEach((value) => {
//     if(value > 0){
//         console.log(value);
//     }
// })

// let i = 1;
// while(i <= 100){
//     if(i%7===0){
//         console.log(i);
//         break;
//     }
    
//     i++;
// }

let attempts = ["1234", "", "admin", "secret"];
for(let i = 0; i<attempts.length; i++){
    let val = attempts[i];
    if(val === ""){
        continue;
    }

    if (val === "secret"){
        break;
    }

    console.log(val);
}