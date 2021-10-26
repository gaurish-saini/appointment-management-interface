import { useState, useEffect, useCallback } from "react";
import Search from "./components/Search";
import AddAppoitnment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";

function App() {
  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  const filteredAppointments = appointmentList
    .filter((item) => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        setAppointmentList(data);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mx-auto md:px-16 pt-8 mt-3 font-thin">
      <h1 className="text-5xl mb-8">Your Appointments</h1>
      <AddAppoitnment
        onSendAppoinment={(myAppointment) =>
          setAppointmentList([...appointmentList, myAppointment])
        }
        lastId={appointmentList.reduce(
          (max, item) => (Number(item.id) > max ? Number(item.id) : max),
          0
        )}
      />
      <Search
        query={query}
        onQueryChange={(myQuery) => setQuery(myQuery)}
        orderBy={orderBy}
        onOrderByChange={(mySort) => setOrderBy(mySort)}
        sortBy={sortBy}
        onSortByChange={(mySort) => setSortBy(mySort)}
      />
      <ul className="divide-y divide-gray-200 mb-8">
        {filteredAppointments.map((appointment) => (
          <AppointmentInfo
            key={appointment.id}
            onDeleteAppoinment={(appoinmentId) =>
              setAppointmentList(
                appointmentList.filter(
                  (appointment) => appointment.id !== appoinmentId
                )
              )
            }
            appointment={appointment}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
