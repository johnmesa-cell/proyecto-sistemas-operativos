import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    const fetchItems = async (retryCount = 0) => {
      try {
        setRetrying(retryCount > 0);
        const res = await fetch("http://localhost:8000/api/crud/");
        
        if (!res.ok) {
          throw new Error(`Backend respondió con estado ${res.status}`);
        }
        
        const data = await res.json();
        setItems(data);
        setError(null);
        setRetrying(false);
      } catch (err) {
        console.log(`Intento ${retryCount + 1}: Esperando backend...`, err.message);
        
        // Reintentar hasta 5 veces con intervalos de 2 segundos
        if (retryCount < 5) {
          setTimeout(() => fetchItems(retryCount + 1), 2000);
        } else {
          setError("No se pudo conectar con el backend. Verifica que esté corriendo.");
          setRetrying(false);
        }
      }
    };
    
    fetchItems();
  }, []);

  const addItem = async () => {
    if (!name.trim()) {
      alert("Por favor escribe algo para aprender");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch("http://localhost:8000/api/crud/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      
      if (!res.ok) {
        throw new Error(`Error al crear item: ${res.status}`);
      }
      
      setName("");
      
      // Recargar items
      const getRes = await fetch("http://localhost:8000/api/crud/");
      const data = await getRes.json();
      setItems(data);
    } catch (err) {
      console.error(err);
      setError("Error al guardar. Intenta de nuevo.");
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
      
      {retrying && (
        <div style={{
          padding: '10px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          ⏳ Conectando con el backend, espera un momento...
        </div>
      )}
      
      {error && (
        <div style={{
          padding: '10px',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          marginBottom: '20px',
          color: '#721c24'
        }}>
          ⚠️ {error}
        </div>
      )}
      
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
            marginRight: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
          disabled={loading}
        />
        <button
          onClick={addItem}
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            borderRadius: '4px'
          }}
        >
          {loading ? '⏳ Generando...' : '🚀 Generar Roadmap'}
        </button>
      </div>

      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        minHeight: '200px'
      }}>
        <h2>📚 Roadmaps Generados:</h2>
        {retrying ? (
          <p style={{ color: '#666' }}>⏳ Cargando datos...</p>
        ) : items.length === 0 ? (
          <p style={{ color: '#666' }}>No hay roadmaps generados aún. ¡Crea uno!</p>
        ) : (
          <div>
            {items.map((item, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}>
                <strong>#{item.id}</strong> - {item.name}
                {item.description && <p style={{ margin: '5px 0 0 0', color: '#666' }}>{item.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


