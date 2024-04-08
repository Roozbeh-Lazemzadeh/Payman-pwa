import React, { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { router } from "./router/router";
import SplashScreen from "./components/splash/SplashScreen";
import "./App.css";

function App(): JSX.Element {
  const [isAppLoaded, setIsAppLoaded] = useState<boolean>(false);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Listen for the DOMContentLoaded event
    const handleDOMContentLoaded = () => {
      // Hide the splash screen after the DOM content has loaded
      setShowSplash(false);
    };

    document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded);
    };
  }, []);

  useEffect(() => {
    // Check if the key "hasSplashShown" exists in sessionStorage
    const hasSplashShownBefore = sessionStorage.getItem("hasSplashShown");

    // If the key doesn't exist, set it to true and render the splash screen
    if (!hasSplashShownBefore) {
      console.log("nist");
      sessionStorage.setItem("hasSplashShown", "true");
    } else {
      // If the key exists, mark the app as loaded
      setIsAppLoaded(true);
    }

    // Simulate app loading
    const loadedApp = setTimeout(() => {
      setIsAppLoaded(true);
    }, 3000);

    const loadingApp = setTimeout(() => {
      setIsAppLoading(false);
    }, 0);

    return () => {
      clearTimeout(loadedApp);
      clearTimeout(loadingApp);
    };
  }, [isAppLoaded]);

  return (
    <>
      {showSplash && (
        <div className="splash-screen">
          {/* Your splash screen content goes here */}
          <h1>Loading...</h1>
        </div>
      )}
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "IranYekan",
            colorText: "rgba(16, 24, 40, 1)",
          },
          components: {
            Button: {
              colorPrimary: "#0072ff",
              defaultBg: "rgba(0, 114, 255, 0.2)",
              defaultBorderColor: "#0072FF",
              defaultColor: "#0072FF",
              borderRadius: 10,
              lineHeight: 28,
              fontWeight: 600,
              colorBgContainerDisabled: "#ACACAC",
              colorTextDisabled: "rgba(255, 255, 255, 0.5)",
            },
            Input: {
              colorPrimary: "#0072ff",
              colorBorder: "#CDCDD0",
              borderRadius: 10,
              colorBgContainerDisabled: "rgba(172, 172, 172, 0.2)",
            },
            Segmented: {
              itemSelectedColor: "#fff",
              itemSelectedBg: "rgba(0, 114, 255, 1)",
              motionEaseInOut: "linear",
              motionDurationSlow: "250ms",
            },
          },
        }}
      >
        {isAppLoaded ? (
          <RouterProvider router={router} />
        ) : isAppLoading ? null : (
          <SplashScreen />
        )}
      </ConfigProvider>
    </>
  );
}

export default App;