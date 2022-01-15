

function validate(text){
    const daysOfWeek = [`Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`, `Sunday`];

    const myArray = text.split(" ");
    let boolAmount;
    let boolDay;
    for(i=0; i<myArray.length; i++){
        
        if(myArray[i].includes('$')){
            let amount = myArray[i];

            const onlyInt = amount.replace("$", "");
             if(!isNaN(onlyInt)){
                boolAmount = true;
             }
        }

        if(daysOfWeek.includes(myArray[i])){
            boolDay = true;
        }
    }
    if(boolAmount && boolDay){
        console.log("VALID");
    }else{
        console.log("INVALID");
    }
}

validate("Your order value is $500 and it should arrive by Monday");