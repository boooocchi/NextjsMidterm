//router related
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate
} from "react-router-dom";

//pages
import { Home, Create, Edit, Article } from "@/pages";
import Header from "../components/Header";
import Footer from "../components/Footer";

//redux

function AppRoute() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/article/:id" element={<Article />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default AppRoute;
