import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import * as XLSX from 'xlsx';
import './ListaDeVideos.css';
import Navbar from '../Navbar/Navbar';

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);

export default function ListaDeVideos() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [temas, setTemas] = useState([]);
  const [temaFilter, setTemaFilter] = useState('');

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

  useEffect(() => {
    if (videos.length === 0) return;

    let filtered = [...videos];

    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(v =>
        (v.tema && v.tema.toLowerCase().includes(searchLower)) ||
        (v.contenido && v.contenido.toLowerCase().includes(searchLower))
      );
    }

    if (temaFilter) {
      filtered = filtered.filter(v => v.tema && v.tema === temaFilter);
    }

    setFilteredVideos(filtered);
  }, [searchTerm, temaFilter, videos]);

  const fetchExcelFile = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const { data, error } = await supabase.storage
        .from('MaterialAdicional')
        .getPublicUrl('ListaDeVideos.xlsx');

      if (error) throw new Error('No se pudo obtener la URL del archivo. Revisa que el archivo exista y que el bucket sea público.');

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
      const expectedHeaders = ['Tema', 'Contenido', 'Enlace'];

      if (!expectedHeaders.every(h => headers.includes(h))) {
        throw new Error(`Estructura incorrecta. Encabezados requeridos: ${expectedHeaders.join(', ')}`);
      }

      const normalizedData = jsonData.slice(1).map(row => {
        if (row.every(cell => cell === null || cell === '')) return null;
        return {
          tema: row[headers.indexOf('Tema')]?.toString() || '',
          contenido: row[headers.indexOf('Contenido')]?.toString() || '',
          enlace: row[headers.indexOf('Enlace')]?.toString() || ''
        };
      }).filter(Boolean);

      if (normalizedData.length === 0) {
        throw new Error('El archivo no contiene datos válidos.');
      }

      const uniqueTemas = [...new Set(normalizedData.map(v => v.tema))]
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b));

      setVideos(normalizedData);
      setFilteredVideos(normalizedData);
      setTemas(uniqueTemas);
      setIsExcelLoaded(true);

    } catch (error) {
      console.error('Error al procesar el archivo:', error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleTemaChange = (e) => setTemaFilter(e.target.value);

  const handleClearFilters = () => {
    setSearchTerm('');
    setTemaFilter('');
  };

  // Función para construir la URL del PDF desde Supabase
  const buildPdfUrl = (enlace) => {
    if (!enlace) return null;

    // Si ya es una URL completa, usarla directamente
    if (enlace.startsWith('http://') || enlace.startsWith('https://')) {
      return enlace;
    }

    // Construir URL pública de Supabase
    const { data } = supabase.storage
      .from('MaterialAdicional')
      .getPublicUrl(enlace.trim());

    return data.publicUrl;
  };

  const handleOpenLink = (enlace) => {
    const url = buildPdfUrl(enlace);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const showScrollHint = isExcelLoaded && windowWidth < 1000;

  return (
    <div className="container">
      <header className="header"><Navbar /></header>

      <div className="videos-container">
        <div className="header-wrapper">
          <div className="header-content">
            <h1 className="main-title">Material Adicional</h1>
            <p className="welcome-message">Busca y filtra material educativo por tema o contenido.</p>
          </div>
        </div>

        <div className="controls-section">
          <div className="search-filters">
            <input
              type="text"
              placeholder="Buscar por tema o contenido..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <select
              value={temaFilter}
              onChange={handleTemaChange}
              className="category-select"
            >
              <option value="">Todos los temas</option>
              {temas.map((tema, index) => (
                <option key={index} value={tema}>{tema}</option>
              ))}
            </select>
            {(searchTerm || temaFilter) && (
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

        {isExcelLoaded && filteredVideos.length > 0 && (
          <div className="videos-table-wrapper">
            <div className="results-count">
              Mostrando {filteredVideos.length} de {videos.length} materiales
            </div>

            <div className="videos-table">
              <div className="table-header">
                <div className="header-cell">Tema</div>
                <div className="header-cell">Contenido</div>
                <div className="header-cell">Enlace</div>
              </div>

              <div className="table-body">
                {filteredVideos.map((v, index) => (
                  <div key={index} className="table-row">
                    <div className="table-cell" data-label="Tema">
                      <span className="category-badge">{v.tema}</span>
                    </div>
                    <div className="table-cell contenido-cell" data-label="Contenido">
                      {v.contenido}
                    </div>
                    <div className="table-cell" data-label="Enlace">
                      {v.enlace && (
                        <button
                          className="link-button"
                          onClick={() => handleOpenLink(v.enlace)}
                        >
                          Ver Material
                        </button>
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
            <p>Cargando material educativo...</p>
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

        {isExcelLoaded && filteredVideos.length === 0 && !isLoading && (
          <div className="no-results">
            <p>No se encontró material que coincida con tu búsqueda.</p>
            <button className="upload-button clear-filter-button" onClick={handleClearFilters}>
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
