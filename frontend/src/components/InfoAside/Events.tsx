import Event from "./Event";

const events = [
  {
    id: "1",
    date: "2023-10-26T03:24:00",
    title: "Zlot w Krakowie",
    city: "Kraków",
  },
  {
    id: "2",
    date: "2023-11-04T03:24:00",
    title: "51. Rajd Świdnicki",
    city: "Świdnica",
  },
  {
    id: "3",
    date: "2023-12-15T03:24:00",
    title: "Zlot BMW",
    city: "Warszawa",
  },
];

const Events = () => {
  return (
    <div className="border-b border-blue-600 dark:border-blue-100 px-4 py-4">
      <h2 className="font-bold ml-4">Nadchodzące wydarzenia</h2>
      <div className="flex flex-col gap-4 py-4">
        {events.map((event) => (
          <Event
            key={event.id}
            id={event.id}
            date={event.date}
            title={event.title}
            city={event.city}
          />
        ))}
      </div>
    </div>
  );
};

export default Events;
