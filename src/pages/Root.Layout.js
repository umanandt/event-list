import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";
const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
       {/*{Navigate.state === "loading" && <p>Loading...</p>}*/}
        <Outlet />
      </main>
    </>
  );
};
export default RootLayout;
