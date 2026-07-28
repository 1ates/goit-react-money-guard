import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { clearAuthHeader, setAuthHeader } from "./services/api.js";
import { store, persistor } from "./store/index.js";
import App from "./components/App/App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

let previousToken = store.getState().auth?.token ?? null;

if (previousToken) {
  setAuthHeader(previousToken);
}

store.subscribe(() => {
  const nextToken = store.getState().auth?.token ?? null;

  if (nextToken === previousToken) {
    return;
  }

  previousToken = nextToken;

  if (nextToken) {
    setAuthHeader(nextToken);
    return;
  }

  clearAuthHeader();
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <App />
          <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            theme='dark'
          />
        </HashRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
