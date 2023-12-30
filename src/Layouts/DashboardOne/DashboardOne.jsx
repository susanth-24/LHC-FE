import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import routesone from "../../routesone";
import Footer from "../../components/Footer/Footer";
import SidebarOne from "../../components/Sidebar/SidebarOne";
const DashboardOne = (props) => {
    const { ...rest } = props;
    const location = useLocation();
    const [open, setOpen] = React.useState(true);
    const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");
  
    React.useEffect(() => {
      window.addEventListener("resize", () =>
        window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
      );
    }, []);
    React.useEffect(() => {
      getActiveRoute(routesone);
    }, [location.pathname]);
  
    const getActiveRoute = (routes) => {
      let activeRoute = "Main Dashboard";
      for (let i = 0; i < routes.length; i++) {
        if (
          window.location.href.indexOf(
            routes[i].layout + "/" + routes[i].path
          ) !== -1
        ) {
          setCurrentRoute(routes[i].name);
        }
      }
      return activeRoute;
    };
    const getActiveNavbar = (routes) => {
      let activeNavbar = false;
      for (let i = 0; i < routes.length; i++) {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].secondary;
        }
      }
      return activeNavbar;
    };
    const getRoutes = (routes) => {
      return routes.map((prop, key) => {
        if (prop.layout === "/adminOne") {
          return (
            <Route path={`/${prop.path}`} element={prop.component} key={key} />
          );
        } else {
          return null;
        }
      });
    };
  
    return (
      <div className="flex h-full  w-full">
        <SidebarOne open={open} onClose={() => setOpen(false)} />
        {/* Navbar & Main Content */}
        <div className="h-full w-full bg-lightPrimary ">
          {/* Main Content */}
          <main
            className={`mx-[2px] min-h-screen h-full flex-none transition-all md:pr-2 xl:ml-[250px]`}
          >
            {/* Routes */}
            <div className="h-full">
              <Navbar
                onOpenSidenav={() => setOpen(true)}
                logoText={"Horizon UI Tailwind React"}
                brandText={currentRoute}
                secondary={getActiveNavbar(routesone)}
                {...rest}
              />
              <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                <Routes>
                  {getRoutes(routesone)}
  
                  <Route
                    path="/"
                    element={<Navigate to="/admin/scheduler" replace />}
                  />
                </Routes>
              </div>
              <div className="p-2">
              <Footer />
            </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
  

export default DashboardOne
