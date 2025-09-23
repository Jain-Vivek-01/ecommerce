// pages/_app.js
import { Provider } from "react-redux";
import { store } from "../store/store.js"; 
import "@radix-ui/themes/styles.css";
import "../styles/globals.css";
import { Theme } from "@radix-ui/themes";


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Theme>
      <Component {...pageProps} />
      </Theme>
    </Provider>
  );
}

export default MyApp;
