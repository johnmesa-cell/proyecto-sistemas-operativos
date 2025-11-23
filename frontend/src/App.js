import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/crud/")
      .then(res => res.json())
      .then(setItems)
      .catch(console.error);
  }, []);

  const addItem = async () => {
    if (!name.trim()) return;
    
    setLoading(true);
    try {
      await fetch("http://localhost:8000/api/crud/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      setName("");
      
      // Recargar items
      const res = await fetch("http://localhost:8000/api/crud/");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '50px auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>🗺️ Curador de Roadmaps Tech</h1>
      <p>Escribe qué quieres aprender y obtén un roadmap personalizado</p>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ejemplo: Quiero aprender React"
          style={{
            width: '70%',
            padding: '10px',
            fontSize: '16px',
            marginRight: '10px'
          }}
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
        />
        <button
          onClick={addItem}
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
        >
          {loading ? 'Generando...' : 'Generar Roadmap'}
        </button>
      </div>

      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        minHeight: '200px'
      }}>
        <h2>Roadmaps Generados:</h2>
        {items.length === 0 ? (
          <p style={{ color: '#666' }}>No hay roadmaps generados aún. ¡Crea uno!</p>
        ) : (
          <pre style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}>
            {JSON.stringify(items, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

export default App;

