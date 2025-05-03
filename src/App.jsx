import {BrowserRouter, Route, Routes} from "react-router";
import Layout from "src/components/layout/Layout.jsx";
import Index from "src/pages/Index.jsx";
import OnlyDispatchers from "src/components/OnlyDispatchers.jsx";
import DeliveriesIndex from "src/pages/dispatcher/deliveries/DeliveriesIndex.jsx";
import VehiclesIndex from "src/pages/dispatcher/vehicles/VehiclesIndex.jsx";
import LogBreaksIndex from "src/pages/dispatcher/log-breaks/LogBreaksIndex.jsx";
import ChatDispatcher from "src/pages/dispatcher/chat/ChatDispatcher.jsx";
import OnlyDrivers from "src/components/OnlyDrivers.jsx";
import DeliveriesIndexDriver from "src/pages/driver/deliveries/DeliveriesIndexDriver.jsx";
import LogBreaksIndexDriver from "src/pages/driver/log-breaks/LogBreaksIndexDriver.jsx";
import ChatDriver from "src/pages/driver/chat/ChatDriver.jsx";
import Login from "src/pages/Login.jsx";
import Signup from "src/pages/Signup.jsx";
import Account from "src/pages/Account.jsx";
import OnlyClients from "src/components/layout/OnlyClients.jsx";
import DeliveriesIndexClient from "src/pages/client/DeliveriesIndexClient.jsx";
import OnlyAdmins from "src/components/OnlyAdmins.jsx";
import DeliveriesIndexAdmin from "src/pages/admin/deliveries/DeliveriesIndexAdmin.jsx";
import DriversIndexDispatcher from "src/pages/dispatcher/drivers/DriversIndexDispatcher.jsx";
import DriversIndexAdmin from "src/pages/admin/drivers/DriversIndexAdmin.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Index/>}/>
                    <Route path="dispatcher/" element={<OnlyDispatchers/>}>
                        <Route path="deliveries/" element={<DeliveriesIndex/>}/>
                        <Route path="drivers/" element={<DriversIndexDispatcher/>}/>
                        <Route path="vehicles/" element={<VehiclesIndex/>}/>
                        <Route path="log-breaks/" element={<LogBreaksIndex/>}/>
                        <Route path="chat/" element={<ChatDispatcher/>}/>
                    </Route>
                    <Route path="driver/" element={<OnlyDrivers/>}>
                        <Route path="deliveries/" element={<DeliveriesIndexDriver/>}/>
                        <Route path="log-breaks/" element={<LogBreaksIndexDriver/>}/>
                        <Route path="chat/" element={<ChatDriver/>}/>
                    </Route>
                    <Route path="admin/" element={<OnlyAdmins/>}>
                        <Route path="deliveries/" element={<DeliveriesIndexAdmin/>}/>
                        <Route path="drivers/" element={<DriversIndexAdmin/>}/>
                    </Route>
                    <Route path="client/" element={<OnlyClients/>}>
                        <Route path="deliveries/" element={<DeliveriesIndexClient/>}/>
                    </Route>
                    <Route path="login/" element={<Login/>}/>
                    <Route path="signup/" element={<Signup/>}/>
                    <Route path="/account" element={<Account/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
