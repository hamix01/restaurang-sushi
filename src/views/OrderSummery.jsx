import {Typography} from '@mui/material';
import {Box, display} from '@mui/system';
import React, {useEffect, useState} from 'react'
import {Spinner} from 'react-bootstrap';
import {useParams} from 'react-router-dom'
import Container from '../components/Container';
import CheckoutItem from '../components/foodie/CheckoutItem';
import {fetchOrder, getEst} from '../helpers/ApiManager';

const ORDER_STATUS = {
	PENDING: "PENDING",
	CONFIRMED: "CONFIRMED",
	COOKING: "COOKING",
	ON_THE_WAY: "ON_THE_WAY",
	DELIVERED: "DELIVERED",
	CANCELLED: "CANCELLED",
	REFUNDED: "REFUNDED"
};

const ORDER_STATUS_TRANSLATION = {
	PENDING: "Väntas",
	CONFIRMED: "Bekräftad",
	COOKING: "Lagas",
	ON_THE_WAY: "På väg till er",
	DELIVERED: "Levererad",
	CANCELLED: "Avbruten",
	REFUNDED: "Återbetald"
};

function OrderSummery() {
  let {id} = useParams();
  const [order, setOrder] = useState(null);
  const [estDeliveryTime, setEstDeliveryTime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [choosedDeliveryTime, setChoosedDeliveryTime] = useState(null);
  const [showEstTime, setShowEstTime] = useState(true);

  const getOrder = async () => {
    setLoading(true);
    let res = await fetchOrder(id);
    let data = res.data;
    setChoosedDeliveryTime(data[0].chosen_delivery_date_time)

    if (data[0]?.order_status === ORDER_STATUS.PENDING || data[0]?.order_status === ORDER_STATUS.DELIVERED || data[0]?.order_status === ORDER_STATUS.REFUNDED || data[0]?.order_status === ORDER_STATUS.CANCELLED) { 
      setShowEstTime(false);
    }

    let orderTime = new Date(data[0].order_date);
    let est = await getEst(id);
    est = est.data;

    setEstDeliveryTime(est)
    let items = []
    data.forEach(item => { 
      items.push({
        name: item.item_name,
        price: item.item_price,
        quantity: item.item_quantity,
        id: item.id
      })
    })

    setItems(items);
    setOrder(data);
    setLoading(false);
  }

  useEffect(() => {
    document.title = `Lifli Sushi - Beställnings information`;
    getOrder();
    const interval = setInterval(async () => {
      let est = await getEst(id);
      est = est.data;
      setEstDeliveryTime(est)
    }, 60000);
  }, [])

  if (loading) {
    return <Spinner animation="grow" variant="primary" />
  }

  return (
    <Container>
      <Box sx={styles.container}>
        <Typography align='center' gutterBottom variant='h3'>Bestälnning #{order[0].order_id}</Typography>
        <Typography gutterBottom align='center' variant='h5'>Status: {ORDER_STATUS_TRANSLATION[order[0].order_status]}</Typography>
        {showEstTime && (
          <>
            <Typography variant='h5'>Beräknad levereras</Typography>
            {choosedDeliveryTime === 'ASAP' ? (
              <Typography variant='h5' gutterBottom>{estDeliveryTime[0] > 60 ? `Om ${Math.round(Number(estDeliveryTime[0]) / 60)}` : `Om ${estDeliveryTime[0]}`} till {estDeliveryTime[1] > 60 ? `${Math.round(Number(estDeliveryTime[1]) / 60)} Timmar` : `${estDeliveryTime[1]} Minuter`}</Typography>
            ) : (
                <Typography variant='h5' gutterBottom>{choosedDeliveryTime}</Typography>
            )}
          </>
        )}

        <Typography align='center' gutterBottom variant='h4'>Beställnings information</Typography>
        <Typography variant='subtitle1'>Leverans adress: {order[0].customer_address1} {order[0].customer_address2}, {order[0].customer_zip}, {order[0].customer_state} {order[0].customer_city}</Typography>
        <Typography variant='subtitle1'>Beställnings datum: {new Date(order[0].order_date).toISOString().split("T")[0]} vid {new Date(order[0].order_date).toISOString().split("T")[1].split(":")[0]}:{new Date(order[0].order_date).toISOString().split("T")[1].split(":")[1]}</Typography>
        <Typography variant='h6'>Beställda artiklar:</Typography>
        {items.map((item, index) => (
          <CheckoutItem key={index} item={item} />
        ))}
        <Typography variant='h6'>Summa: {order[0].total_price} Kr</Typography>
      </Box>
    </Container>
  )
}

const styles = {
  container: {
    marginTop: '5%',
    width: '80%',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width: 768px)': {
      marginTop: '20%'
    }
  },
  title: {
    
  }
}
export default OrderSummery