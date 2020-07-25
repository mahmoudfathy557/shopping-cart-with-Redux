import { INCREASE, DECREASE, CLEAR_CART, REMOVE, GET_TOTALS } from './actions'

const reducer = (state, action) => {
  console.log(state.cartAmount, 'state from reducer')
  switch (action.type) {
    case DECREASE:
      let tempoCart = []
      if (action.payload.amount === 1) {
        tempoCart = state.cart.filter((item) => item.id !== action.payload.id)
      } else {
        tempoCart = state.cart.map((cartItem) => {
          if (cartItem.id === action.payload.id) {
            cartItem = {
              ...cartItem,
              amount: cartItem.amount - 1,
            }
          }
          return cartItem
        })
      }
      return {
        ...state,
        cart: tempoCart,
      }

    case INCREASE:
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          cartItem = {
            ...cartItem,
            amount: cartItem.amount + 1,
          }
        }
        return cartItem
      })

      return {
        ...state,
        cart: tempCart,
      }

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      }
    case REMOVE:
      console.log('item is removed', action.payload.id)
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      }
    case GET_TOTALS:
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem
          const itemTotal = price * amount

          cartTotal.total += itemTotal
          cartTotal.amount += amount

          return cartTotal
        },
        // initial values passed to the function
        { total: 0, amount: 0 }
      )
      total = parseFloat(total.toFixed(2))
      return { ...state, total, amount }

    default:
      return state
  }
}

export default reducer
