import {BrowserRouter, Route, Routes} from "react-router";
import Layout from "./components/layout/Layout.jsx";
import Index from "./pages/Index.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Index/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
