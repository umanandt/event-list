import PageContent from "../components/PageContent";
//import { useRouterError } from "react-router-dom";
import MainNavigation from '../components/MainNavigation'

function ErrorPage() {
//  const error = useRouterError();

 {/* let title = "An error occured!";
  let message = "Something went wrong";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = "Not found";
    message = "Could not find resources or page";
  }*/}

  return (
    <>
      <MainNavigation />
      <PageContent title="An error occured">
        <p> Something went wrong</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
