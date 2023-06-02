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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = (user) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

function AppRoute() {
  const customToastStyle = {
    backgroundColor: "#000",
    color: "#fff"
    // Add any other custom styles you want to override here
  };
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={customToastStyle}
        />
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
          <Route
            element={<PrivateRoute user={localStorage.getItem("userName")} />}
          >
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default AppRoute;
