import React, { useState, useRef } from 'react';

function Calculator() {
  // state to storage the values given by the user when filling the input fields
  const ref = useRef(null)
  const [userValues, setUserValues] = useState({
    amount: '',
    interest: '',
    years: '',
  });

  // state to storage the results of the calculation
  const [results, setResults] = useState({
    monthlyPayment: '',
    totalPayment: '',
    totalInterest: '',
    isResult: false,
  });

  // state to storage error message
  const [error, setError] = useState('');

  // event handler to update state when the user enters values

  const handleInputChange = (event) =>
    setUserValues({ ...userValues, [event.target.name]: event.target.value });

  // Manage validations and error messages
  const isValid = () => {
    const { amount, interest, years } = userValues;
    let actualError = '';
    // Validate if there are values
    if (!amount || !interest || !years) {
      actualError = 'All the values are required';
    }
    // Validade if the values are numbers
    if (isNaN(amount) || isNaN(interest) || isNaN(years)) {
      actualError = 'All the values must be a valid number';
    }
    // Validade if the values are positive numbers
    if (Number(amount) <= 0 || Number(interest) <= 0 || Number(years) <= 0) {
      actualError = 'All the values must be a positive number';
    }
    if (actualError) {
      setError(actualError);
      return false;
    }
    return true;
  };

  // Handle the data submited - validate inputs and send it as a parameter to the function that calculates the loan
  const handleSubmitValues = (e) => {
    e.preventDefault();
    if (isValid()) {
      setError('');
      calculateResults(userValues);
    }
  };

  // Calculation
  const calculateResults = ({ amount, interest, years }) => {
    const userAmount = Number(amount);
    const interestRate = (interest.replace(/%$/, ""))
    const calculatedInterest = Number(interestRate) / 100 / 12;
    const calculatedPayments = Number(years) * 12;
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (userAmount * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      const monthlyPaymentCalculated = monthly.toFixed(2);
      const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
      const totalInterestCalculated = (
        monthly * calculatedPayments -
        userAmount
      ).toFixed(2);

      // Set up results to the state to be displayed to the user
      setResults({
        monthlyPayment: monthlyPaymentCalculated,
        totalPayment: totalPaymentCalculated,
        totalInterest: totalInterestCalculated,
        isResult: true,
      });
    }
    return;
  };

  // Clear input fields
  const clearFields = () => {
    setUserValues({
      amount: '',
      interest: '',
      years: '',
    });

    setResults({
      monthlyPayment: '',
      totalPayment: '',
      totalInterest: '',
      isResult: false,
    });
  };

  return (
    <div ref={ref} className="w-768 bg-gray-300 rounded-10 flex flex-col shadow-2xl font-proxima-nova mx-auto mt-64">
                <div className="mx-80 py-48">
                    <div className="flex flex-row justify-between items-baseline">
                        <h1 className="text-3xl text-gray-600 font-extrabold">Mortgage Calculator</h1>
                    </div>
        <h2> Buying a home can improve your credit, improve your investment portfolio, as well as decreasing your annual tax load and long-term bills. If you eventually pay off your home, it is yours, and typically that investment only gains in value. This calculator will help you figure out if you can afford to buy a home right now.</h2>
        {/* Display the error when it exists */}
        <br>
              </br>
              <p className='error'>{error}</p>
        <form onSubmit={handleSubmitValues}>
          {/* ternary operator manages when the calculator and results will be displayed to the user */}
          {!results.isResult ? (
            //   Form to collect data from the user
            <div className='form-items'>
              <div>
                <label id='label'>Amount: </label>
                <input
                  type='text'
                  name='amount'
                  placeholder='Sale price minus down payment'
                  value={userValues.amount}
                  // onChange method sets the values given by the user as input to the userValues state
                  onChange={handleInputChange}
                  className="rounded-5 mb-16 h-40 w-256 p-12 text-sm placeholder-gray-400 text-gray-800 bg-gray-50 font-semibold tracking-wide"
                />
              </div>
              <span>Click <a href ="https://www.valuepenguin.com/mortgages/average-mortgage-rates#avg" target="_blank" rel="noreferrer"><span className="underline">here</span></a> to check the current national mortgage rate.</span>
              
              <br>
              </br>
              
                <label id='label'> Interest rate: </label>
                <input
                  type='text'
                  name='interest'
                  placeholder='Typically 3.125 - 5.25'
                  value={userValues.interest}
                  onChange={handleInputChange}
                  className="rounded-5 mb-16 h-40 w-256 p-12 text-sm placeholder-gray-400 text-gray-800 bg-gray-50 font-semibold tracking-wide"
                />
              
              <div>
                <label id='label'>Loan duration:</label>
                <input
                  type='text'
                  name='years'
                  placeholder='Typically 30, 20, or 15'
                  value={userValues.years}
                  onChange={handleInputChange}
                  className="rounded-5 mb-16 h-40 w-256 p-12 text-sm placeholder-gray-400 text-gray-800 bg-gray-50 font-semibold tracking-wide"
                />
              </div>
              <button type="submit" className="bg-green-500 rounded-5 h-40 w-256 text-gray-50">Submit </button>
            </div>
          ) : (
            //   Form to display the results to the user
            <div className='form-items'>
              <h4>
                Loan amount: ${userValues.amount} <br /> Interest:{' '}
                {userValues.interest}% <br /> Years to repay: {userValues.years}
              </h4>
              <div>
                <h4 >Monthly Payment: ${results.monthlyPayment}</h4>
               
              </div>
              <div>
                <h4>Total Payment: ${results.totalPayment}</h4>
                
              </div>
              <div>
                <h4>Total Interest paid if min payment made for the entire loan: ${results.totalInterest}</h4>
                
              </div>
              {/* Button to clear fields */}
              <input
                className="mb-16 rounded-5 h-40 w-95 pl-12 cursor-pointer text-sm bg-gray-50 font-semibold tracking-wide" 
                value='Calculate again'
                type='recalculating'
                onClick={clearFields}
              />
               
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Calculator;
