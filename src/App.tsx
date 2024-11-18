import PhoneBookList from "./components/PhoneBookList/PhoneBookList";
import { Route, Routes } from "react-router-dom";
import PhoneBookForm from "./components/PhoneBookForm/PhoneBookForm.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";

const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<PhoneBookList />} />
        <Route path="/add" element={<PhoneBookForm />} />
        <Route path="/edit/:id" element={<PhoneBookForm />} />
      </Routes>
    </>
  );
};

export default App;
