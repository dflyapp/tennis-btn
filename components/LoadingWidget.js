import { useState, useEffect } from "react";
import Router from "next/router";
import Loading from "./Loading";

const LoadingWidget = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleRouteChangeStart = () => setLoading(true);
        const handleRouteChangeComplete = () => setLoading(false);

        Router.events.on("routeChangeStart", handleRouteChangeStart);
        Router.events.on("routeChangeComplete", handleRouteChangeComplete);

        return () => {
            Router.events.off("routeChangeStart", handleRouteChangeStart);
            Router.events.off("routeChangeComplete", handleRouteChangeComplete);
        };
    }, []);

    return loading ? <div className="fixed top-0 left-0 bg-gray-50 w-screen h-screen z-10"><Loading /></div> : null;
};

export default LoadingWidget;