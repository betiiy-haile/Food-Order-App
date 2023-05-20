import { useContext, useState } from 'react'
import classes from './Cart.module.css' 
import Modal from '../UI/Modal'
 import CartContext from '../../store/cart-context'
 import CartItem from './CartItem'
 import CheckOut from './CheckOut'

const Cart = (props) => {

  const CartCtx = useContext(CartContext)
  const [isCheckOut, setIsCheckOut] = useState(false)

  const totalAmount = `$${CartCtx.totalAmount.toFixed(2)}`
  const hasItems = CartCtx.items.length > 0
  
  const CartItemRemoveHandler = id => {
    CartCtx.removeItem(id)
  } 
  const CartItemAddHandler = item => {
    CartCtx.addItem({ ...item, amount: 1 });
  }
  const orderHandler = () => {
    setIsCheckOut(true)
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {CartCtx.items.map((item) => (
        <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={CartItemRemoveHandler.bind(null, item.id)} onAdd={CartItemAddHandler.bind(null, item)} />
      ))}
    </ul>
  )

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span> {totalAmount}</span>
      </div>
      {isCheckOut && <CheckOut onCancel={props.onClose} />}
      {!isCheckOut && modalActions}
    </Modal>
  );
}

export default Cart
