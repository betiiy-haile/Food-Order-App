import { useRef, useState } from 'react';
import classes from './CheckOut.module.css';

const Checkout = (props) => {
    const nameInputRef =  useRef(null)
    const streetInputRef =  useRef(null)
    const postalCodeInputRef =  useRef(null)
    const cityInputRef =  useRef(null)

    const [ formValidity , setFormValidty] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    }) 

  const confirmHandler = (event) => {
    event.preventDefault();    

    // getting entered values using ref
    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredPostalCode = postalCodeInputRef.current.value
    const enteredCity = cityInputRef.current.value

    const isNameValid = enteredName && enteredName.trim() !== ''
    const isStreetValid = enteredStreet && enteredStreet.trim() !== ''
    const isPostalValid = enteredPostalCode && enteredPostalCode.trim().length === 5
    const isCityValid = enteredCity && enteredCity.trim() !== ''

    setFormValidty({
        name: isNameValid,
        street: isStreetValid,
        postalCode: isPostalValid,
        city: isCityValid
    })

    const formIsValid = isNameValid && isCityValid && isPostalValid && isStreetValid
    if (!formIsValid){
        return
    }
    // Submit the data
    props.onSubmit({
        name: enteredName,
        street: enteredStreet,
        postalCode: enteredPostalCode,
        city: enteredCity
    })
  };
  
  const nameControl = `${classes.control} ${formValidity.name ? '' : classes.invalid}`
  const streetControl = `${classes.control} ${formValidity.street ? '' : classes.invalid}`
  const postalCodeControl = `${classes.control} ${formValidity.postalCode ? '' : classes.invalid}`
  const cityControl = `${classes.control} ${formValidity.city ? '' : classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControl}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formValidity.name && <p>Please Enter a valid name</p>}
      </div>
      <div className={streetControl}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formValidity.street && <p>please enter a valid street number</p>}
      </div>
      <div className={postalCodeControl}>
        <label htmlFor='postal'>Postal Code</label>
        {!formValidity.postalCode && <p>please enter a valid postal code (5 characters)</p>}
        <input type='text' id='postal' ref={postalCodeInputRef} />
      </div>
      <div className={cityControl}>
        <label htmlFor='city'>City</label>
        {!formValidity.city && <p>please enter a valid city name</p>}
        <input type='text' id='city' ref={cityInputRef} />
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;