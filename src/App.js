
import React from "react";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { BrowserRouter , Routes , Route} from "react-router-dom";
import Watch from "./pages/Watch";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element= {<Home/>} />
    <Route path="/search" element= {<Search/>} />
    <Route path="/watch" element= {<Watch/>} />
    </Routes>
    </BrowserRouter>
  )
}

