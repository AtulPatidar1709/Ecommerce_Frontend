import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useOrder } from "../hooks/orders.hook";
import Order_Loader from "@/components/skeletons/Order_Loader";
import type { OrderItem } from "../schemas/oders.schema";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { order, isLoading } = useOrder(id!);

  if (isLoading || !order) {
    return <Order_Loader />;
  }

  const shippingAddress = order.address
    ? `${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}`
    : "No shipping address";

  const paymentStatus = order.payment?.status || "Not Paid";

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Button
        variant="outline"
        className="mb-4"
        onClick={() => navigate("/orders")}
      >
        Back to Orders
      </Button>

      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      {/* Order Summary */}
      <Card className="p-6 space-y-3">
        <div>
          <p className="text-sm text-zinc-400">Order ID</p>
          <p className="font-medium">{order.id}</p>
        </div>
        <div>
          <p className="text-sm text-zinc-400">Order Date</p>
          <p>{new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-zinc-400">Total Amount</p>
          <p className="font-semibold">₹{order.totalAmount.toFixed(2)}</p>
        </div>
        {order.discountAmount > 0 && (
          <div>
            <p className="text-sm text-zinc-400">Discount</p>
            <p className="font-semibold text-green-600">
              -₹{order.discountAmount.toFixed(2)}
            </p>
          </div>
        )}
        <div>
          <p className="text-sm text-zinc-400">Shipping Address</p>
          <p className="font-medium">{shippingAddress}</p>
        </div>
        <div>
          <p className="text-sm text-zinc-400">Payment Status</p>
          <p
            className={`font-medium ${
              paymentStatus === "SUCCESS" ? "text-green-600" : "text-red-600"
            }`}
          >
            {paymentStatus}
          </p>
        </div>
        <div>
          <p className="text-sm text-zinc-400">Order Status</p>
          <p className="font-medium">{order.status}</p>
        </div>
      </Card>

      {/* Items */}
      <h2 className="text-xl font-semibold mb-2">Items</h2>
      <div className="space-y-4">
        {order.orderItems?.map((item: OrderItem) => (
          <Card
            key={item.id}
            className="p-4 flex flex-col sm:flex-row items-center sm:justify-between space-y-2 sm:space-y-0"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.product.images?.[0]?.imageUrl}
                alt={item.product.title}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <p className="font-medium">{item.product.title}</p>
                <p className="text-sm text-zinc-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-semibold text-lg">
              ₹
              {(
                (item.product.discountPrice ?? item.product.price!) *
                item.quantity
              ).toFixed(2)}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
