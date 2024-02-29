import cl from "./App.module.css";
import Container from "./layout/Container/Container";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className={cl.app}>
      <Container>
        <Home />
      </Container>
    </div>
  );
}

export default App;
