import { Suspense } from "react";
import EventItem from "../components/EventItem";
import { redirect, useRouteLoaderData, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";

const EditDetail = () => {
  //  const data = useRouteLoaderData("event-detail");
  //   return <EventItem event={data.event} />
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadEvent) => <EventItem event={loadEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadEvents) => <EventsList events={loadEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EditDetail;





export async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "could not fetch details for selected event" }),
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
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

export async function action({ params, request }) {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });
  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "could not fetch details for selected event" }),
      { status: 500 }
    );
  } else {
    return redirect("/events");
  }
}

export async function loader({ params }) {
  const id = params.eventId;
  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}
