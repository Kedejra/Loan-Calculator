//Listen for submit
//why not put it on the submit button itself, why no parameters passed to the function ? maybe cuz they are in the HTML and not a product of the jscript and would be retrieved otherwise 

document.getElementById('loan-form').addEventListener('submit', function(e)
{
    //hide results 
    document.getElementById('results').style.display='none';

    //show loader
    document.getElementById('loader').style.display='block';

    setTimeout(calculateResults,2000);
    
    e.preventDefault();
});

//function calculate Results

function calculateResults()
{
    //UI Variables
    const UIamount = document.getElementById('amount');
    const UIinterest = document.getElementById('interest');
    const UIyears = document.getElementById('years');
    
    const UImonthlyPay = document.getElementById('monthly-payment');
    const UItotalInterest = document.getElementById('total-interest');
    const UItotalPay = document.getElementById('total-payment');

    //formulas
// we want this to be a decimal hence the parse float to convert 
    const principal= parseFloat(UIamount.value);
    const calculatedInterest = parseFloat(UIinterest.value)/ 100/ 12;
    const calculatedPayment= parseFloat(UIyears.value)*12;

    //Monthly payment formula

    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const mnthPay =(principal*x*calculatedInterest)/(x-1);

    //Assigning and calculating values to results
    if(isFinite(mnthPay))
    {
        UImonthlyPay.value= mnthPay.toFixed(2);
        UItotalPay.value=(mnthPay*calculatedPayment).toFixed(2);
        UItotalInterest.value=((mnthPay* calculatedPayment)- principal).toFixed(2);
        //show results
        document.getElementById('results').style.display='block';
        //hide loader if results are showing
        document.getElementById('loader').style.display='none';
    }

    else
    {
        
        showError('Please check your numbers..');
        //please check your numbers
        

    }

    
}

//building out error alert to be inserted into DOM
function showError(error)
{
     //hide results
     document.getElementById('results').style.display='none';
     //hide loader
     document.getElementById('loader').style.display='none';

    //creating a div
    const errorDiv = document.createElement('div');

    //get elements needed that are already in the DOM
    const card= document.querySelector('.card');
    const instructions = document.querySelector('.small');

    // add classes
    errorDiv.className = 'alert alert-danger';

    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //insert error above heading
    card.insertBefore(errorDiv,instructions);

    //clear error message after 2.5 seconds
    //setTimeout accepts a function and time frame in ms
    setTimeout(clearError,2500);
}

//clear error from screen
function clearError()
{
    document.querySelector('.alert').remove();
}