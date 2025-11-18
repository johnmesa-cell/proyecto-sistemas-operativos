import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/crud/")
      .then(res => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  const addItem = async () => {
    await fetch("http://localhost:8000/api/crud/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    setName("");
    window.location.reload();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Frontend conectado ✅</h1>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nuevo item" />
      <button onClick={addItem}>Agregar</button>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
export default App;
