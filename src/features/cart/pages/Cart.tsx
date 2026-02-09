import { CartItem } from "../components/cart-item";
import { OrderSummary } from "../components/order-summary";
import { useCartDetails, useUpdateCartItems } from "../hooks/cart.hook";

const CartPage = () => {
  const { allCartItems, cartIsLoading, cartError } = useCartDetails();
  const { updateCartItemQuantity, removeItemFromCart, isUpdating } =
    useUpdateCartItems();

  if (cartIsLoading) {
    return <div>Loading cart...</div>;
  }

  if (cartError) {
    return <div>Error loading cart Data</div>;
  }

  if (!allCartItems || allCartItems.cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">Your Cart is Empty</h1>
        <p className="text-zinc-500">
          Looks like you haven't added anything to your cart yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 ">
      <h1 className="mb-6 text-2xl font-bold">
        Shopping Cart
        <span className="ml-2 text-sm font-normal text-zinc-400">
          {allCartItems?.summary.totalItems || 0} items in your cart
        </span>
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Cart Items */}
        <div className="space-y-4">
          {allCartItems?.cartItems.map((item: any) => (
            <CartItem
              key={item.id}
              item={item}
              isLoading={isUpdating}
              onIncrease={() =>
                updateCartItemQuantity(item.productId, item.quantity + 1)
              }
              onDecrease={() =>
                updateCartItemQuantity(item.productId, item.quantity - 1)
              }
              onRemove={() => removeItemFromCart(item.productId)}
            />
          ))}
        </div>

        {/* Order Summary */}
        <OrderSummary subtotal={allCartItems?.summary.subtotal || 0} />
      </div>
    </div>
  );
};

export default CartPage;
