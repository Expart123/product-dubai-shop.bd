// import React, { useEffect, useState } from 'react';
// import SummaryApi from '../common';
// import moment from 'moment';
// import displayINRCurrency from '../helpers/displayCurrency';

// const OrderPage = () => {
//   const [data, setData] = useState([]);

//   const FetchOrderDetails = async () => {
//     try {
//       const response = await fetch(SummaryApi.getOrder.url, {
//         method: SummaryApi.getOrder.method,
//         credentials: 'include',
//       });

//       const responseData = await response.json();
//       setData(responseData.data || []);
//       console.log('order list', responseData);
//     } catch (error) {
//       console.error('Error fetching order details:', error);
//     }
//   };

//   useEffect(() => {
//     FetchOrderDetails();
//   }, []);

//   return (
//     <div className='p-4 w-full'>
//       {!data.length && (
//         <p>No Order available</p>
//       )}
//       <div>
//         {data.map((item, index) => (
//           <div key={item.userId + index}>
//             <p className='font-medium text-lg'>{moment(item.createdAt).format('llll')}</p>
//            <div className='border rounded'>
//           <div className='flex flex-col lg:flex-row  justify-between'>
//                 <div className='grid gap-1'>
//                     {item.productDetails?.map((product, productIndex) => (
//                       <div key={product.productId + productIndex} className='flex gap-3 bg-slate-100'>
//                         <img src={product.image[0]}
//                           className='w-28 h-28 bg-white object-scale-down p-2' alt='' />
//                         <div className='font-medium text-lg text-ellipsis line-clamp-1'>
//                           <div className='flex items-center gap-3 mt-1'>{product.name}</div>
//                           <div className='text-lg text-red-500'>{displayINRCurrency(product.price)}</div>
//                           <p>Quantity: {product.quantity}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 <div className='flex flex-col  gap-4 p-2 min-w-[300]'>
//                 <div>
//                     <div className='text-lg font-medium'>Payment Details: </div>
//                     <p className=' ml-1'>Payment method: {item.paymentDetails?.payment_method_types?.[0]} </p>
//                     <p className=' ml-1'>Payment status: {item.paymentDetails?.payment_status} </p>
//                   </div>
//                   <div>
//                     <div className='text-lg font-medium'> Shipping Details: </div>
//                     {item.shipping_options?.map((shipping, shippingIndex) => (
//                       <div key={shipping.shipping_rate + shippingIndex} className=' ml-1'> 
//                         Shipping Amount: {shipping.shipping_amount}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//           </div>
//             <div className='font-semibold lg:text-lg ml-auto w-fit'>Total Amount: {item.totalAmount}
//             </div>
//            </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderPage;


import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import displayINRCurrency from '../helpers/displayCurrency';

const OrderPage = () => {
  const [data, setData] = useState([]);

  const FetchOrderDetails = async () => {
    try {
      const response = await fetch(SummaryApi.getOrder.url, {
        method: SummaryApi.getOrder.method,
        credentials: 'include',
      });

      const responseData = await response.json();
      setData(responseData.data || []);
      console.log('order list', responseData);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  useEffect(() => {
    FetchOrderDetails();
  }, []);

  return (
    <div className='p-4 w-full'>
      {!data.length && (
        <p>No Order available</p>
      )}
      <div>
        {data.map((item, index) => (
          <div key={item.userId + index}>
            <p className='font-medium text-lg'>{moment(item.createdAt).format('llll')}</p>
            <div className='border rounded'>
              <div className='flex flex-col lg:flex-row justify-between'>
                <div className='grid gap-1'>
                  {item.productDetails?.map((product, productIndex) => (
                    <div key={product.productId + productIndex} className='flex gap-3 bg-slate-100'>
                      <img src={product.image[0]}
                        className='w-28 h-28 bg-white object-scale-down p-2' alt='' />
                      <div className='font-medium text-lg text-ellipsis line-clamp-1'>
                        <div className='flex items-center gap-3 mt-1'>{product.name}</div>
                        <div className='text-lg text-red-500'>{displayINRCurrency(product.price)}</div>
                        <p>Quantity: {product.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='flex flex-col gap-4 p-2 min-w-[300]'>
                  <div>
                    <div className='text-lg font-medium'>Payment Details: </div>
                    <p className='ml-1'>Payment method: {item.paymentDetails?.payment_method_types?.[0]} </p> {/* Correct field name */}
                    <p className='ml-1'>Payment status: {item.paymentDetails?.payment_status} </p>
                  </div>
                  <div>
                    <div className='text-lg font-medium'>Shipping Details: </div>
                    {item.shipping_options?.map((shipping, shippingIndex) => (
                      <div key={shipping.shipping_rate + shippingIndex} className='ml-1'> 
                        Shipping Amount: {shipping.shipping_amount}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='font-semibold lg:text-lg ml-auto w-fit'>Total Amount: {item.totalAmount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
