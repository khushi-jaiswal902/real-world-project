import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { newArrivalsList, mustTryList, lipstickList, liquidLipstickList, nailPaintList, lipLinearList, shampooList, soapList, brushToolsList, oilList, faceWashList, roomSprayList, necklaceList, accessoriesList, hairLookList } from '../assets/assets';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token, currency, products } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([])
  const allProducts = [
    ...products,
    ...newArrivalsList,
    ...mustTryList,
    ...lipstickList,
    ...liquidLipstickList,
    ...nailPaintList,
    ...lipLinearList,
    ...shampooList,
    ...soapList,
    ...brushToolsList,
    ...oilList,
    ...faceWashList,
    ...roomSprayList,
    ...necklaceList,
    ...accessoriesList,
    ...hairLookList,
  ];

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(backendUrl + '/api/order/userOrders', {}, { headers: { token } })
      console.log("Orders response:", response.data);
      if (response.data.success) {
        const orders = response.data.orders || [];
        const latestOrder = orders.reduce((latest, current) => {
          if (!latest) return current;
          return Number(current.date || 0) > Number(latest.date || 0) ? current : latest;
        }, null);

        const latestItems = [];
        if (latestOrder) {
          latestOrder.items.forEach((item) => {
            latestItems.push({
              ...item,
              status: latestOrder.status,
              payment: latestOrder.payment,
              paymentMethod: latestOrder.paymentMethod,
              date: latestOrder.date,
            });
          });
        }

        console.log("Processed latest order items:", latestItems);
        setOrderData(latestItems);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  }
  useEffect(() => {
    loadOrderData()
  }, [token])
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'YOUR'} text2={'ORDERS'} />
      </div>

      <div>
        {
          orderData.length === 0 ? (
              <p className="text-center text-gray-500 mt-4">No orders found.</p>
          ) : (
            orderData.map((item, index) => {
              const resolvedItem =
                allProducts.find((product) => product._id === item._id || product._id === item.id) || item;
              const displayImage = resolvedItem?.image?.[0];

              return (
              <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='flex items-start gap-6 text-sm'>
                  {displayImage ? (
                    <img src={displayImage} alt="" className="w-16 sm:w-20" />
                  ) : null}
                  <div>
                    <p className='sm:text-base font-medium'>{resolvedItem?.name || item.name}</p>
                    <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                      <p>{currency}{resolvedItem?.price ?? item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                    <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                  </div>
                </div>
                <div className='md:w-1/2 flex justify-between'>
                  <div className='flex items-center gap-2'>
                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='text-sm md:text-base'>{item.status}</p>
                  </div>
                  <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
                </div>
              </div>
            )})
          )
        }
      </div>
    </div>
  )
}

export default Orders
