import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Recipelist from "./recipelist";
import "./commonstyle.css";

export default function BlueFlameLogin() {
  const [auth, setAuth] = useState({
    email: "dev+webskitters@blueflame.ai",
    password: "12345678",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [recipeList, setRecipeList] = useState([]);
  const [authToken, setAuthToken] = useState(null);
  const [isstepCompleted, setIsStepCompleted] = useState(false);
  const [viewMode, setViewMode] = useState("card");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuth((prevAuth) => ({
      ...prevAuth,
      [name]: value,
    }));
  };

  const login = async () => {
    try {
      if (!isstepCompleted) {
        await axios.post("https://api.blueflame.ai/dev/login/method", {
          user: auth.email,
          step: 1,
        });
        setIsStepCompleted(true);
      } else {
        const response = await axios.post(
          "https://api.blueflame.ai/dev/login",
          {
            user: auth.email,
            password: auth.password,
            step: 2,
          }
        );

        console.log("Login response", response);
        const { jwt } = response.data;
        if (jwt) {
          localStorage.setItem("authToken", jwt);
          setAuthToken(jwt);
          setIsLoggedIn(true);
          fetchRecipe(jwt);
        } else {
          setError("Token not received");
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchRecipe = async (jwt) => {
    try {
      const response = await axios.get(
        "https://api.blueflame.ai/dev/v1/Recipe/list",
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("List of recipe", response);
      setRecipeList(response.data);
    } catch (err) {
      setError("Error Message", err.message);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setIsLoggedIn(false);
    setIsStepCompleted(false);
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "card" ? "table" : "card"));
  };
  useEffect(() => {
    let jwt = localStorage.getItem("authToken");
    if (jwt) {
      setAuthToken(jwt);
      setIsLoggedIn(true);
      fetchRecipe(jwt);
    }
  }, []);
  return (
    <>
    <section className="signin-block">
    <Grid container spacing={2} >
        {!isLoggedIn ? (
          <>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                type="email"
                label="Email"
                value={auth.email}
                onChange={handleChange}
              />
            </Grid>

            {isstepCompleted && (
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  type="password"
                  label="Password"
                  value={auth.password}
                  onChange={handleChange}
                />
              </Grid>
            )}

            <Button onClick={login} className="login-btn">
              {isstepCompleted ? "Submit" : "Verify Email"}
            </Button>
            {error && <span style={{ color: "red" }}>{error}</span>}
          </>
        ) : (
          <>
            {/* {recipeList?.map((item) => {
            return (
              <>
                <div id={item.id}>
                  <h2>{item.name}</h2>
                </div>
              </>
            );
          })} */}
            <Button onClick={toggleViewMode} className="cmn-btn">
              Toggle To {viewMode === "card" ? "Table" : "Card"} View
            </Button>
            <Recipelist recipes={recipeList} viewMode={viewMode} />
            <Button onClick={handleLogout} className="cmn-btn">
              Logout
            </Button>
          </>
        )}
      </Grid>
    </section>
    
    </>
  );
}
