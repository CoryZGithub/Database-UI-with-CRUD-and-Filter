import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateUser from "./routes/UpdateUser";
import UserInfo from "./routes/UserInfo";
import Home from "./routes/Home";
import { GymContextProvider } from "./context/GymContext";
import Location from "./routes/Location";
import PrivateRoutes from "./routes/PrivateRoutes";
import Login from "./routes/Login";
import { AdminContextProvider } from "./context/AdminContext";
import Front from "./routes/Front";
import UpdateEquip from "./routes/UpdateEquip";
import Employees from "./routes/Employees";

const App = () => {
  return (
    <AdminContextProvider>
      <GymContextProvider>
        <div className='container'>
          <Router>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/allemployees' element={<Employees/>}></Route>
                <Route
                  exact
                  path='/users/:id/update'
                  element={<UpdateUser />}
                />
                <Route
                  exact
                  path='/equipment/:id/:two/:three'
                  element={<UpdateEquip />}
                ></Route>
                <Route exact path='/location' element={<Location />}></Route>
                <Route exact path='/user/:id' element={<UserInfo />}></Route>
              </Route>

              <Route element={<Login />} path='/login' />
              <Route element={<Front />} path='/front'></Route>

              {/* <Route exact path='/location/filter/:id/:filter' element={<FilteredLocation/>}></Route> */}
              {/* <Route exact path='/location/:id' element={<Location />}></Route> */}
            </Routes>
          </Router>
        </div>
      </GymContextProvider>
    </AdminContextProvider>
  );
};

export default App;
