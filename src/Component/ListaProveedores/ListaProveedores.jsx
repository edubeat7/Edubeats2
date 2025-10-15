import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import * as XLSX from 'xlsx';
import './ListaProveedores.css'; // Asegúrate de que este CSS exista
import Navbar from '../Navbar/Navbar';

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);

// Componente renombrado para mayor claridad
export default function ListaProveedores() {
  // Estado adaptado a la nueva estructura
  const [proveedores, setProveedores] = useState([]);
  const [filteredProveedores, setFilteredProveedores] = useState([]);
  const [rubros, setRubros] = useState([]);
  const [rubroFilter, setRubroFilter] = useState('');
  
  // Estados generales
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isExcelLoaded, setIsExcelLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchExcelFile();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Lógica de filtrado actualizada
  useEffect(() => {
    if (proveedores.length === 0) return;
    
    let filtered = [...proveedores];
    
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        (p.empresa && p.empresa.toLowerCase().includes(searchLower)) ||
        (p.rubro && p.rubro.toLowerCase().includes(searchLower))
      );
    }
    
    if (rubroFilter) {
      filtered = filtered.filter(p => p.rubro && p.rubro === rubroFilter);
    }
    
    setFilteredProveedores(filtered);
  }, [searchTerm, rubroFilter, proveedores]);

  const fetchExcelFile = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      
      const { data, error } = await supabase.storage
        .from('linkdeposito')
        .getPublicUrl('ListaDeProveedores.xlsx');

      if (error) throw new Error('No se pudo obtener la URL del archivo. Revisa que el archivo exista y que el bucket sea público.');

      // Añadimos un timestamp para evitar problemas de caché
      await loadExcelData(`${data.publicUrl}?t=${Date.now()}`);
      
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(`Error al cargar el archivo: ${error.message}`);
      setIsLoading(false);
    }
  };

  const loadExcelData = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      if (jsonData.length < 1) throw new Error('El archivo Excel está vacío.');
      
      const headers = jsonData[0].map(h => h.trim());
      // *** CAMBIO CLAVE: Nuevos encabezados esperados ***
      const expectedHeaders = ['Rubro', 'Empresa', 'Numero', 'Correo'];
      
      if (!expectedHeaders.every(h => headers.includes(h))) {
        throw new Error(`Estructura incorrecta. Encabezados requeridos: ${expectedHeaders.join(', ')}`);
      }
      
      // *** CAMBIO CLAVE: Mapeo a la nueva estructura de datos ***
      const normalizedData = jsonData.slice(1).map(row => {
        if (row.every(cell => cell === null || cell === '')) return null;
        return {
          rubro: row[headers.indexOf('Rubro')]?.toString() || '',
          empresa: row[headers.indexOf('Empresa')]?.toString() || '',
          numero: row[headers.indexOf('Numero')]?.toString() || '',
          correo: row[headers.indexOf('Correo')]?.toString() || ''
        };
      }).filter(Boolean);

      if (normalizedData.length === 0) {
        throw new Error('El archivo no contiene datos válidos.');
      }

      const uniqueRubros = [...new Set(normalizedData.map(p => p.rubro))]
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b));

      setProveedores(normalizedData);
      setFilteredProveedores(normalizedData);
      setRubros(uniqueRubros);
      setIsExcelLoaded(true);
      
    } catch (error) {
      console.error('Error al procesar el archivo:', error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleRubroChange = (e) => setRubroFilter(e.target.value);
  
  const handleClearFilters = () => {
    setSearchTerm('');
    setRubroFilter('');
  };

  const showScrollHint = isExcelLoaded && windowWidth < 1000;

  return (
    <div className="container">
      <header className="header"><Navbar /></header>

      <div className="proveedores-container">
        <div className="header-wrapper">
          <div className="header-content">
            <h1 className="main-title">📋 Lista de Proveedores</h1>
            <p className="welcome-message">Busca y filtra proveedores por rubro o nombre.</p>
          </div>
        </div>

        <div className="controls-section">
          <div className="search-filters">
            <input
              type="text"
              placeholder="Buscar por empresa o rubro..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <select 
              value={rubroFilter} 
              onChange={handleRubroChange}
              className="category-select"
            >
              <option value="">Todos los rubros</option>
              {rubros.map((rubro, index) => (
                <option key={index} value={rubro}>{rubro}</option>
              ))}
            </select>
            {(searchTerm || rubroFilter) && (
              <button className="upload-button clear-filter-button" onClick={handleClearFilters}>
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {showScrollHint && (
          <div className="scroll-hint">
            <small>← Desliza para ver todos los datos →</small>
          </div>
        )}

        {isExcelLoaded && filteredProveedores.length > 0 && (
          <div className="proveedores-table-wrapper">
            <div className="results-count">
              Mostrando {filteredProveedores.length} de {proveedores.length} proveedores
            </div>
            
            <div className="proveedores-table">
              <div className="table-header">
                <div className="header-cell">Rubro</div>
                <div className="header-cell">Empresa</div>
                <div className="header-cell">Número</div>
                <div className="header-cell">Correo</div>
              </div>
              
              <div className="table-body">
                {filteredProveedores.map((p, index) => (
                  <div key={index} className="table-row">
                    <div className="table-cell" data-label="Rubro">
                      <span className="category-badge">{p.rubro}</span>
                    </div>
                    <div className="table-cell empresa-cell" data-label="Empresa">
                      {p.empresa}
                    </div>
                    <div className="table-cell" data-label="Número">{p.numero}</div>
                    <div className="table-cell" data-label="Correo">
                      {p.correo ? (
                        <a href={`mailto:${p.correo}`} className="email-link">{p.correo}</a>
                      ) : (
                        '-'
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Cargando proveedores...</p>
          </div>
        )}

        {errorMessage && (
          <div className="error-container">
            <p>⚠️ {errorMessage}</p>
            <button className="retry-button upload-button" onClick={fetchExcelFile}>
              Intentar nuevamente
            </button>
          </div>
        )}
        
        {isExcelLoaded && filteredProveedores.length === 0 && !isLoading && (
          <div className="no-results">
            <p>No se encontraron proveedores que coincidan con tu búsqueda.</p>
            <button className="upload-button clear-filter-button" onClick={handleClearFilters}>
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}