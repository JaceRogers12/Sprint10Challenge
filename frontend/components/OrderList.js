import React from 'react'
import { useGetPizzaQuery } from '../state/pizzaApi';
import {useSelector, useDispatch} from "react-redux";
import { setSizeFilter } from '../state/pizzaSlice';

export default function OrderList() {
  const {data: orders} = useGetPizzaQuery();
  const sizeFilter = useSelector(store => store.pizzaState.sizeFilter);
  const dispatch = useDispatch();

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders && orders.filter(order => {
            if (sizeFilter == "All") return true;
            return order.size == sizeFilter;
          })
            .map(order => {
            return (
              <li key={order.id}>
                <div>
                  {`${order.customer} ordered a size ${order.size} with ${order.toppings? `${order.toppings.length} topping${order.toppings.length == 1? "":"s"}` : "no toppings"}`}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === sizeFilter ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={()=> dispatch(setSizeFilter(size))}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
