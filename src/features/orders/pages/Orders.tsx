import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "react-router-dom";
import { useOrders } from "../hooks/orders.hook";

export default function OrdersPage() {
  const { getAllOrders, isLoading } = useOrders();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!getAllOrders || getAllOrders?.length === 0) {
    return (
      <div className="p-6 text-center text-zinc-500">No orders found.</div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {getAllOrders?.map((order) => (
          <Card
            key={order.id}
            className="p-4 flex flex-col justify-between hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            <div>
              <p className="text-sm text-zinc-400">Order ID</p>
              <p className="font-medium truncate">{order.id}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-zinc-400">Total Amount</p>
              <p className="font-semibold">₹{order.totalAmount}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-zinc-400">Items</p>
              <p className="truncate">{order.orderItems.length} item(s)</p>
            </div>
            <div className="mt-2 text-sm text-zinc-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
            <Link
              to={`/orders/${order.id}`}
              className="mt-4 w-full text-center inline-block bg-zinc-800 text-white py-2 px-4 rounded-md hover:bg-zinc-700 transition-colors"
            >
              View Details
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
