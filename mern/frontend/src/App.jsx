import Register from "./Register/Register";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Navigation from "./Navigation/Navigation";
import PageNotFound from "./PageNotFound/PageNotFound"
import {BrowserRouter, Routes, Route} from "react-router-dom";
function App(){
  return (
    <BrowserRouter>
    <Navigation/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </BrowserRouter>
  )
}
export default App;