import { useEffect, useState } from "react";
import { useAuth } from '../context/AuthProvider';
import { getRoadmaps, createRoadmap, deleteRoadmap } from '../services/roadmapService';

function Dashboard() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchItems = async (retryCount = 0) => {
      try {
        setRetrying(retryCount > 0);
        const data = await getRoadmaps();
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
      await createRoadmap(name);
      setName("");
      
      // Recargar items
      const data = await getRoadmaps();
      setItems(data);
    } catch (err) {
      console.error(err);
      setError("Error al guardar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este roadmap?')) {
      return;
    }

    try {
      await deleteRoadmap(id);
      const data = await getRoadmaps();
      setItems(data);
    } catch (err) {
      console.error('Error al eliminar:', err);
      alert('Error al eliminar el roadmap');
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 50px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        color: 'white'
      }}>
        <h2 style={{ margin: 0, fontSize: '24px' }}>🗺️ Curador de Roadmaps</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontWeight: 600 }}>👤 {user?.username}</span>
          <button onClick={handleLogout} style={{
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '2px solid white',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600
          }}>
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div style={{
        maxWidth: '800px',
        margin: '50px auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: 'white'
      }}>
        <h1>🗺️ Curador de Roadmaps Tech</h1>
        <p>Escribe qué quieres aprender y obtén un roadmap personalizado</p>
        
        {retrying && (
          <div style={{
            padding: '10px',
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '4px',
            marginBottom: '20px',
            color: '#000'
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
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '20px',
          borderRadius: '8px',
          minHeight: '200px'
        }}>
          <h2>📚 Roadmaps Generados:</h2>
          {retrying ? (
            <p style={{ color: '#fff' }}>⏳ Cargando datos...</p>
          ) : items.length === 0 ? (
            <p style={{ color: '#fff' }}>No hay roadmaps generados aún. ¡Crea uno!</p>
          ) : (
            <div>
              {items.map((item, index) => (
                <div key={index} style={{
                  backgroundColor: 'white',
                  padding: '15px',
                  marginBottom: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  color: '#333',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <strong>#{item.id}</strong> - {item.name}
                    {item.description && <p style={{ margin: '5px 0 0 0', color: '#666' }}>{item.description}</p>}
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '18px',
                      cursor: 'pointer',
                      padding: '5px'
                    }}
                    title="Eliminar roadmap"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
