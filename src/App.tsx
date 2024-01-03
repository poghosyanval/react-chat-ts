import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Musics from "./components/Musics/Musics";
import Settings from "./components/Navsettings/Settings";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
  BrowserRouter,
  HashRouter,
  Navigate,
} from "react-router-dom";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
import { UsersPage } from "./components/Users/UsersContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import React, { Suspense } from "react";
import { Provider, connect } from "react-redux";
import { compose } from "redux";
import Preloader from "./components/Common/Preloader/Preloader";
import store, { AppStateType } from "./redux/reduxStore";
import { initializeApp } from "./redux/appReducer";
import { LoginPage } from "./components/Login/Login";

const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert("Some error occured");
    //console.error(promiseRejectionEvent);
  };
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }
  render() {
    // if(!this.props.intialized){
    //   return <Preloader />
    // }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Suspense
            fallback={
              <div>
                <Preloader />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Navigate to={"/profile"} />} />
              <Route
                path="/profile/:userId?"
                element={<ProfileContainer />}
              ></Route>
              <Route path="/profile/*" element={<ProfileContainer />}></Route>
              <Route path="/dialogs" element={<DialogsContainer />}></Route>
              <Route path="/users" element={<UsersPage pageTitle = {"Samurai"}/>}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/news" element={<News />}></Route>
              <Route path="/musics" element={<Musics />}></Route>
              <Route path="/settings" element={<Settings />}></Route>
              <Route path="*" element={<div>404 NOT FOUND</div>}></Route>
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
}
function withRouter(Component: any) {
  function ComponentWithRouterProp(props: any) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

const mapStateToProps = (state: AppStateType) => ({
  intialized: state.app.initialized,
});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const SamuraiJSApp: React.FC = () => {
  return (
    <BrowserRouter basename="/">
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default SamuraiJSApp;
