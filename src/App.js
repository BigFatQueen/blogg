/** @format */

import React from "react";
import { NavBar, ImageGrid } from "./components";
import {
  Home,
  Footer,
  Login,
  Register,
  Edit,
  PhoneSignUp,
  PhoneLogin,
  UserHome,
  CreatorHome,
  CreatorProfile,
  PostCreate,
  PostDetail,
  StepOne,
  StepTwo,
  EditProfile,
  UserProfile,
  PostEdit,
} from "./pages/";

import RSManager from "./pages/creator/RSManager";
import EarningsOverview from "./pages/creator/EarningsOverview";
import EarningsOverviewDetail from "./pages/creator/EarningsOverviewDetail";
import CheckOutModel from "./components/CheckoutModel";
import PrivateRoute from "./routes/PrivateRoute";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

import { RouterRounded } from "@mui/icons-material";

function App() {
  return (
    <>
      <NavBar />
      {/*<Footer /> */}
      <Switch>
        <Route exact={true} path="/" component={Home} />

        <Route exact={true} path="/login" component={Login} />

        <Route exact={true} path="/register" component={Register} />
        <Route path="/register/phone" component={PhoneSignUp} />
        <Route path="/login/phone" component={PhoneLogin} />

        <Route path="/edit" component={Edit} />
        <Route path="/rsmanager" component={RSManager} />
        <Route path="/earnings-overview" component={EarningsOverview} />
        <Route
          path="/earnings-overview-detail"
          component={EarningsOverviewDetail}
        />

        <Route path="/home">
          <UserHome />
        </Route>

        <Route path="/user-profile">
          <UserProfile />
        </Route>

        <Route path="/creator-home">
          <CreatorHome />
        </Route>

        <Route path="/creator-profile/:username">
          <CreatorProfile />
        </Route>

        <Route path="/join/:username">
          <CheckOutModel />
        </Route>

        {/* <Route path='/creator-profile'>
          <CreatorProfile />
        </Route> */}

        <Route path="/creator-edit/">
          <EditProfile />
        </Route>

        {/* <Route path='/gi'>
          <ImageGrid />
        </Route> */}

        <Route exact={true} path="/post-create" component={PostCreate} />

        <Route path="/post-detail/:id">
          <PostDetail />
        </Route>

        <Route path="/post-edit/:id">
          <PostEdit />
        </Route>

        <Route extact={true} path="/step/1">
          <StepOne />
        </Route>
        <Route path="/step/2">
          <StepTwo />
        </Route>

        <Route path="*" component={Error} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
