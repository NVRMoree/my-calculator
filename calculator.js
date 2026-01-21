let backspaceButton = document.getElementById("backspace");

backspaceButton.addEventListener("click", function(){
    handleBackspace();
});

function handleBackspace()
{
    if(display.value !== "0" && !shouldResetDisplay)
    {
        let temp = display.value.slice(0,-1);
        display.value = temp;

        if(display.value === "")
        {
            display.value = "0";
        }
    }
}

let decimalButton = document.getElementById("decimal");

decimalButton.addEventListener("click", function(){
    handleDecimal();
});


let a = null;
let b = null;
let operator = null;

let shouldResetDisplay = false;
let display = document.getElementById("num");
display.value = 0;
let numberButtons = document.querySelectorAll(".num");

numberButtons.forEach(function (btn)
{
    btn.addEventListener("click", function (event)
    {
        handleNumber(event.target.dataset.num);
    });
});

function handleNumber(num)
{
    if(shouldResetDisplay || display.value === "0")
    {
        display.value = num;
        shouldResetDisplay = false;
    }
    else
    {
        display.value += num;
    }
}

let buttons = document.querySelectorAll(".op");

buttons.forEach(function (btn) //a loop that scans all buttons and registers it
{
    
    btn.addEventListener("click", function(event){ 
        let op = event.target.dataset.op;

        if(op === '=')
        {
            compute();
        }
        else if(op === 'C')
        {
            clearCalc();
        }
        else
        {
            setOperator(op);
        }
    });
});

function setOperator(op) 
{
    if(display.value === '-')
    {
        return;
    }
    
    if(op === '-' && (display.value === "0" || shouldResetDisplay))
    {
        display.value = "-";
        shouldResetDisplay = false;
        return;
    }

    if(operator !== null && !shouldResetDisplay)
    {
        compute();
    }
    
    if(shouldResetDisplay && operator)
    {
        operator = op;
        return;
    }

    a = Number(display.value);
    operator = op;
    shouldResetDisplay = true;
}

let lastB = null;
let lastOperator = null;

function compute()
{
    if(operator !== null && !shouldResetDisplay)
    {
        b = Number(display.value);
        lastB = b;
        lastOperator = operator;    
    }
    else if(operator === null && lastOperator !== null)
    {
        b = lastB;
        operator = lastOperator;
    }
    else
    {
        return;
    }

    let result;
    
    if(operator === '+')
    {
        result = a + b;
    }
    else if(operator === '-')
    {
        result = a - b;
    }
    else if(operator === '*')
    {
        result = a * b;
    }   
    if(operator === '/')
    {
        if(b === 0)
        {
            display.value = "Error";
            operator = null;
            shouldResetDisplay = true;
            return;
        }
        result = a / b;
    }

    display.value = result;
    a = result;
    shouldResetDisplay = true;
    operator = null;
    
}

function clearCalc ()
{
    display.value = "0";
    a = null;
    b = null;
    operator = null;
    shouldResetDisplay = true;
    lastOperator = null;
    lastB = null;
}

function handleDecimal()
{
    if(shouldResetDisplay)
    {
        display.value = "0.";
        shouldResetDisplay = false;
        return
    }
    
    if(display.value.includes("."))
    {
        return;
    }

    display.value += ".";
}

document.addEventListener("keydown",function(event)
{
    if(event.key >= '0' && event.key <= '9')
    {
        handleNumber(event.key);
    }
    else if(event.key === '+' || event.key === '-' || event.key === '*' || event.key === 'x' || event.key === 'X' || event.key === '/' )
    {
        setOperator(event.key);
    }
    else if(event.key === '=' || event.key === 'Enter')
    {
        compute();
    }
    else if(event.key === 'C' || event.key === 'c' || event.key === 'Escape')
    {
        clearCalc();
    }
    else if(event.key === '.')
    {
        handleDecimal();
    }
});