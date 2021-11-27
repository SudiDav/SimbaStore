import Catalog from "../../features/Catalog/Catalog";
import Header from "./Header";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useState } from "react";
import { Route, Switch } from "react-router";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";
import ProductDetails from "../../features/Catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const pallteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: pallteType,
      background: {
        default: pallteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar />
      <CssBaseline />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/catalog" component={Catalog} />
          <Route path="/catalog/:id" component={ProductDetails} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/server-error" component={ServerError} />
          <Route component={NotFound} /> 
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
