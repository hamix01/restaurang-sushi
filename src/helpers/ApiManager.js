import {FOODIE_API_URL} from "./urls";
import axios from "axios";

async function sendGetRequest(url) {
    const response = await axios.get(url);
    return response.data;
}

async function sendPostRequest(url, data) {
    const response = await axios.post(url, data);
    return response.data;
}

async function sendDeleteRequest(url, data) {
    const response = await axios.delete(url, data);
    return response.data;
}

export async function fetchItems() {
	const url = `${FOODIE_API_URL}/items?restaurant_id=${1}`;
	return await sendGetRequest(url);
}

export async function fetchCategories() {
	const url = `${FOODIE_API_URL}/categories?restaurant_id=${1}`;
	return await sendGetRequest(url);
}

export async function fetchRestaurantOptions() {
	const url = `${FOODIE_API_URL}/restaurantOptions?restaurant_id=${1}`;
	return await sendGetRequest(url);
}

export async function sendPayment(payment_id, cart) {
	const url = `${FOODIE_API_URL}/pay`;
	return await sendPostRequest(url, { payment_id, cart, restaurant_id: 1 });
}

export async function sendCreateOrderRequest(
	name,
	email,
	phone,
	address1,
	address2,
	city,
	state,
	zip,
	choosenDeliveryTime,
	deliveryOption,
	cart,
	payment_id
) {
	const url = `${FOODIE_API_URL}/order?restaurant_id=${1}`;
	const data = {
		customer_name: name,
		customer_email: email,
		customer_phone: phone,
		customer_address1: address1,
		customer_address2: address2,
		customer_city: city,
		customer_state: state,
		customer_zip: zip,
		chosen_delivery_date_time: choosenDeliveryTime,
		delivery_option: deliveryOption,
		cart,
		payment_id
	};
	return await sendPostRequest(url, data);
}

export async function fetchOrder(orderId) {
	const url = `${FOODIE_API_URL}/order?order_id=${orderId}&restaurant_id=${1}`;
	return await sendGetRequest(url);
}

export async function getEst(orderId) {
	const url = `${FOODIE_API_URL}/order/est?order_id=${orderId}&restaurant_id=${1}`;
	return await sendGetRequest(url);
}