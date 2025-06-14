import React, {useEffect,useState} from 'react';

// const orders = [
//   { id: '001', customer: 'Alice', product: 'Laptop', date: '2025-06-01', status: 'Completed', payment: 'Paid' },
//   { id: '002', customer: 'Bob', product: 'Smartphone', date: '2025-06-03', status: 'Active', payment: 'Pending' },
//   { id: '003', customer: 'Charlie', product: 'Headphones', date: '2025-06-04', status: 'Completed', payment: 'Paid' },
//   { id: '004', customer: 'Diana', product: 'Monitor', date: '2025-06-05', status: 'Cancelled', payment: 'Refunded' },
// ];


function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/allorders');
        const data = await response.json();
        console.log("API response:", data);
        setOrders(data.orders || []); 
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Order List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto w-2/3">
          <table className="min-w-full bg-[#D5ECE9] rounded-2xl shadow border-collapse">
            <thead>
              <tr className="text-black uppercase text-sm">
                <th className="py-3 px-6 text-left">OrderId</th>
                
                <th className="py-3 px-6 text-left">Customer</th>
                <th className="py-3 px-6 text-left">Healporter</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Payment</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Details</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-[#00A99D]">
                
                  <td className="py-3 px-6 text-left whitespace-nowrap">{order?.orderId || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{order.user_id?.name || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{order.deliveryboy_id?.name || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{order.date?.slice(0, 10) || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{order?.paymentMethod || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{order?.total_amount || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'on the way'
                          ? 'bg-green-200 text-green-800'
                          : order.status === 'delivered'
                          ? 'bg-[#00A99D] text-white'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  
                  <td className="py-3 px-6 text-center">
                    <button className="text-blue-600 hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrdersTable;
