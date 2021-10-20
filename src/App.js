import Search from "./components/Search";
import AddAppoitnment from "./components/AddAppointment"

function App() {
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">Your Appointments</h1>
      <AddAppoitnment />
      <Search />
    </div>
  );
}

export default App;
