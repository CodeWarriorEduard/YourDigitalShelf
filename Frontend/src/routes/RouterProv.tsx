import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Collection from "../pages/Collection/Collection";
import Landing from "../pages/Landing/Landing.jsx";
import SignUp from "../pages/SignUp/SignUp.js";
import Protected from "./Protected.js";
import App from "../App.js";
import BookInfo from "../pages/BookInfo/BookInfo.js";
import Search from "../pages/Search/Search.js";


function RouterProv() {

    const routes = createBrowserRouter([
      {
        path:"/",
        element: <App/>,
        children:[
          {
            path:"", element:<Landing/>
          },
          {
            path: "home",
            element: (<Protected><Home/></Protected>)
          },
          {
            path: "login",
            element: <Login/>
          },  
          {
            path: "register",
            element: <SignUp/>
          },
          {
            path: "info/:id",
            element:(<Protected><BookInfo/></Protected>)
          },
          {
            path: "collection",
            element: (<Protected><Collection/></Protected>)
          },
          {
            path: "search",
            element: (<Protected><Search/></Protected>)
          }
        ]
      },
    ])

  return (
    <RouterProvider router={routes}/>
  )
}

export default RouterProv