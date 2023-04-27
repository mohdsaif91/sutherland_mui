import React, { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Login } from "@microsoft/mgt-react";
import { Providers, ProviderState } from "@microsoft/mgt-element";

function useIsSignedIn() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    const updateState = () => {
      const provider = Providers.globalProvider;
      setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
    };

    Providers.onProviderUpdated(updateState);
    updateState();

    return () => {
      Providers.removeProviderUpdatedListener(updateState);
    };
  }, []);

  return [isSignedIn];
}

function Header() {
  const [isSignedIn] = useIsSignedIn();
  console.log(isSignedIn);
  isSignedIn && localStorage.setItem("loggedIn", true);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          <Login />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
