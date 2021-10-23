import { useState, useEffect, useCallback } from "react";
import Search from "./components/Search";
import AddAppoitnment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";

function App() {
  let [appointmentList, setAppointmentlist] = useState([]);
  let [query, setQuery] = useState("");

  const filteredAppointments = appointmentList.filter((item) => {
    return (
      item.petName.toLowerCase().includes(query.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
      item.aptNotes.toLowerCase().includes(query.toLowerCase())
    );
  });

  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        setAppointmentlist(data);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">Your Appointments</h1>
      <AddAppoitnment />
      <Search query={query} onQueryChange={(myQuery) => setQuery(myQuery)} />
      <ul className="divide-y divide-gray-200">
        {filteredAppointments.map((appointment) => (
          <AppointmentInfo
            key={appointment.id}
            onDeleteAppoinment={(appoinmentId) =>
              setAppointmentlist(
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
