import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { useLoaderData, defer, Await } from "react-router-dom";

function EventsPage() {
  // useloader data brings the data
  // I am destructuring here {events - key }
  const { events } = useLoaderData();
  //return <EventsList events={events} />;
  // Await is waiting for data

  // defer and await jobs is to show somethign else
  // till real data aarives - using fallback
  // fallback options job is to so something till
  // actuall data arrive
  // in this case Loading

  // suspense and fallback together
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadEvents) => <EventsList events={loadEvents} />}
      </Await>
    </Suspense>
  );
}

export async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });

    //  return json({ message: 'Could not fetch events'}, {status: 500 })
  } else {
    const resData = await response.json();
    return resData.events;
    // we can just return  (return response) we don't
    // need to anything else
  }
}

export default EventsPage;

export async function loader() {
  return defer({
    events: loadEvents(),
  });
}
