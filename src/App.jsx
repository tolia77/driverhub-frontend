import {BrowserRouter, Route, Routes} from "react-router";
import Layout from "./components/layout/Layout.jsx";
import Index from "./pages/Index.jsx";
import OnlyDispatchers from "./components/OnlyDispatchers.jsx";
import DeliveriesIndex from "./pages/dispatcher/deliveries/DeliveriesIndex.jsx";
import DriversIndex from "./pages/dispatcher/drivers/DriversIndex.jsx";
import VehiclesIndex from "./pages/dispatcher/vehicles/VehiclesIndex.jsx";
import LogBreaksIndex from "./pages/dispatcher/log-breaks/LogBreaksIndex.jsx";
import ChatDispatcher from "./pages/dispatcher/chat/ChatDispatcher.jsx";
import OnlyDrivers from "./components/OnlyDrivers.jsx";
import DeliveriesIndexDriver from "./pages/drivers/delieveries/DeliveriesIndexDriver.jsx";
import LogBreaksIndexDriver from "./pages/drivers/log-breaks/LogBreaksIndexDriver.jsx";
import ChatDriver from "./pages/drivers/chat/ChatDriver.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Index/>}/>
                    <Route path="dispatcher/" element={<OnlyDispatchers/>}>
                        <Route path="deliveries/" element={<DeliveriesIndex/>}/>
                        <Route path="drivers/" element={<DriversIndex/>}/>
                        <Route path="vehicles/" element={<VehiclesIndex/>}/>
                        <Route path="log-breaks/" element={<LogBreaksIndex/>}/>
                        <Route path="chat/" element={<ChatDispatcher/>}/>
                    </Route>
                    <Route path="driver/" element={<OnlyDrivers/>}>
                        <Route path="deliveries/" element={<DeliveriesIndexDriver/>}/>
                        <Route path="log-breaks/" element={<LogBreaksIndexDriver/>}/>
                        <Route path="chat/" element={<ChatDriver/>}/>
                    </Route>
                    <Route path="login/" element={<Login/>}/>
                    <Route path="signup/" element={<Signup/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
