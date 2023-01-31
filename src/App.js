import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Order from "./views/Order";
import Checkout from "./views/Checkout";
import OrderSummery from "./views/OrderSummery";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Box } from "@mui/system";
import About from "./views/About";
import Loading from "./components/Loading";

function App() {
	const [loading, setLoading] = React.useState(true);

	useEffect(() => {
		window.addEventListener("load", (e) => {
			setLoading(false);
		});
	});

	if (loading) {
		return <Loading />;
	}

	return (
		<BrowserRouter>
			<Navbar />
			<Box sx={{ width: "100%", overflowX: "hidden" }}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/order' element={<Order />} />
					<Route path='/checkout' element={<Checkout />} />
					<Route path='/order/:id' element={<OrderSummery />} />
					<Route path='/about' element={<About />} />
				</Routes>
			</Box>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
