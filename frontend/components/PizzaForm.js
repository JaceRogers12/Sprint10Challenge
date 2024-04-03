import React from 'react'
import { usePlaceOrderMutation } from '../state/pizzaApi';
import {useSelector, useDispatch} from "react-redux";
import {setName, setSize, setToppings, resetForm} from "../state/pizzaSlice.js";

const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

export default function PizzaForm() {
  const [placeOrder, {error: orderError, isLoading: orderLoading}] = usePlaceOrderMutation();
  const dispatch = useDispatch();
  const orderName = useSelector(store => store.pizzaState.fullName);
  const orderSize = useSelector(store => store.pizzaState.size);
  const orderToppings = useSelector(store => store.pizzaState.toppings)
  function onSubmit(event) {
    event.preventDefault();
    const finalToppings = [];
    if (orderToppings.one) finalToppings.push("1");
    if (orderToppings.two) finalToppings.push("2");
    if (orderToppings.three) finalToppings.push("3");
    if (orderToppings.four) finalToppings.push("4");
    if (orderToppings.five) finalToppings.push("5");
    placeOrder({fullName: orderName, size: orderSize, toppings: finalToppings});
    dispatch(resetForm());
  }
  
  return (
    <form onSubmit={event => onSubmit(event)}>
      <h2>Pizza Form</h2>
      {orderLoading && <div className='pending'>Order in progress...</div>}
      {orderError && <div className='failure'>Order failed: {orderError.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={orderName}
            onChange={event => dispatch(setName(event.target.value))}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" value={orderSize}
            onChange={(event)=> dispatch(setSize(event.target.value))}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox"
            checked={orderToppings.one} onChange={() => dispatch(setToppings("one"))}
          />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox"
            checked={orderToppings.two} onChange={() => dispatch(setToppings("two"))}
          />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox"
            checked={orderToppings.three} onChange={() => dispatch(setToppings("three"))}
          />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox"
            checked={orderToppings.four} onChange={() => dispatch(setToppings("four"))}
          />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox"
            checked={orderToppings.five} onChange={() => dispatch(setToppings("five"))}
          />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
