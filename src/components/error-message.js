import React from 'react';

const ErrorMessage = ({message}) => {
  return (
    <div className="error-message">
      <h5>{message}</h5>
    </div>
  )
}
 
export default ErrorMessage;