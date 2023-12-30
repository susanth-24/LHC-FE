import React,{useState,useEffect} from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import routestwo from "../../routestwo";
import Footer from "../../components/Footer/Footer";
import SidebarTwo from "../../components/Sidebar/SidebarTwo";

const DashboardTwo = (props) => {
    const { ...rest } = props;
    const location = useLocation();
    const [open, setOpen] = React.useState(true);
    const [currentRoute, setCurrentRoute] = useState("Main Dashboard");

    useEffect(() => {
      window.addEventListener("resize", () =>
        window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
      );
    }, []);
    
    useEffect(() => {
      getActiveRoute(routestwo);
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
        if (prop.layout === "/adminTwo") {
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
        <SidebarTwo open={open} onClose={() => setOpen(false)} />
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
                secondary={getActiveNavbar(routestwo)}
                {...rest}
              />
              <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                <Routes>
                  {getRoutes(routestwo)}
  
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
  

export default DashboardTwo
