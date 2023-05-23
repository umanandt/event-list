import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root.Layout";
import Home from "./pages/Home";
import EventsPage from "./pages/Events";
import EventDetails, {
  loader as eventDetailsLoader,
  action as deleteEventLoader,
} from "./pages/EventDetails";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import EventsRootLayout from "./pages/EventsRoot";
import { loader as eventLoader } from "./pages/Events";
import Error from "./pages/Error";

import { action as eventManipulator }  from './components/EventForm'
import NewsletterPage, { action as newsletterAction} from "./pages/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventLoader,
          },

          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailsLoader,
            children: [
              {
                index: true,
                element: <EventDetails />,
                action: deleteEventLoader,
              },
              { path: "edit", element: <EditEventPage/>,  action: eventManipulator },
            ],
          },

          { path: "new", element: <NewEventPage />, action: eventManipulator },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
