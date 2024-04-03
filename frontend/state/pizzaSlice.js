import {createSlice} from "@reduxjs/toolkit";

export const pizzaSlice = createSlice({
    name: "pizzaSlice",
    initialState: {
        sizeFilter: "All",
        fullName: '',
        size: '',
        toppings: { 
            one: false,
            two: false,
            three: false,
            four: false,
            five: false
        }
    },
    reducers: {
        setSizeFilter(state, action){
            state.sizeFilter = action.payload
        },
        setName(state, action){
            state.fullName = action.payload
        },
        setSize(state, action){
            state.size = action.payload
        },
        setToppings(state, action){
            state["toppings"][action.payload]= !state["toppings"][action.payload]
        },
        resetForm(state){
            state.fullName = "",
            state.size = "",
            state.toppings= { 
                one: false,
                two: false,
                three: false,
                four: false,
                five: false
            }
        }
    }
})

export default pizzaSlice.reducer
export const {setSizeFilter, setName, setSize, setToppings, resetForm } = pizzaSlice.actions