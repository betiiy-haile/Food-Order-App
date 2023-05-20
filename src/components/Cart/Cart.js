import { useContext, useState } from 'react'
import classes from './Cart.module.css' 
import Modal from '../UI/Modal'
 import CartContext from '../../store/cart-context'
 import CartItem from './CartItem'
 import CheckOut from './CheckOut'

const Cart = (props) => {

  const CartCtx = useContext(CartContext)
  const [isCheckOut, setIsCheckOut] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false);

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

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true)
    await fetch("https://food-order-app-f617e-default-rtdb.firebaseio.com/orders.json", {
      method : 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: CartCtx.items
      })
    });
    setIsSubmitting(false)
    setDidSubmit(true)
    CartCtx.clearCart()
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


  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span> {totalAmount}</span>
      </div>
      {isCheckOut && (
        <CheckOut onSubmit={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckOut && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending Order Data...</p>

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the Order.</p>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent }
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
}

export default Cart
