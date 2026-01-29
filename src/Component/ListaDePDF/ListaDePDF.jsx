import { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import './ListaDePdf.css';
import Navbar from '../Navbar/Navbar';

const supabase = createClient(
    import.meta.env.VITE_APP_SUPABASE_URL,
    import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);

export default function ListaDePDF() {
    const [pdfFiles, setPdfFiles] = useState([]);
    const [filteredPdfFiles, setFilteredPdfFiles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetchPdfFiles();
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // Lógica de filtrado
    useEffect(() => {
        if (pdfFiles.length === 0) return;

        let filtered = [...pdfFiles];

        if (searchTerm.trim() !== '') {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(pdf =>
                pdf.displayName.toLowerCase().includes(searchLower) ||
                (pdf.category && pdf.category.toLowerCase().includes(searchLower))
            );
        }

        if (categoryFilter) {
            filtered = filtered.filter(pdf => pdf.category === categoryFilter);
        }

        setFilteredPdfFiles(filtered);
    }, [searchTerm, categoryFilter, pdfFiles]);

    const fetchPdfFiles = async () => {
        try {
            setIsLoading(true);
            setErrorMessage('');

            // Listar todos los archivos en la carpeta MaterialAdicional
            const { data, error } = await supabase.storage
                .from('MaterialAdicional')
                .list('', {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: 'name', order: 'asc' }
                });

            if (error) {
                throw new Error('No se pudo obtener la lista de archivos: ' + error.message);
            }

            if (!data || data.length === 0) {
                throw new Error('No se encontraron archivos en MaterialAdicional.');
            }

            // Filtrar solo archivos PDF y procesar nombres
            const pdfList = data
                .filter(file => file.name.toLowerCase().endsWith('.pdf'))
                .map(file => {
                    // Extraer categoría del nombre del archivo (formato: "Categoria - NombreArchivo.pdf" o similar)
                    const nameParts = file.name.replace('.pdf', '').split(' - ');
                    const category = nameParts.length > 1 ? nameParts[0].trim() : 'General';
                    const displayName = nameParts.length > 1 ? nameParts.slice(1).join(' - ').trim() : nameParts[0].trim();

                    return {
                        id: file.id || file.name,
                        name: file.name,
                        displayName: displayName,
                        category: category,
                        size: file.metadata?.size || 0,
                        createdAt: file.created_at
                    };
                });

            if (pdfList.length === 0) {
                throw new Error('No se encontraron archivos PDF en la carpeta MaterialAdicional.');
            }

            // Obtener categorías únicas
            const uniqueCategories = [...new Set(pdfList.map(pdf => pdf.category))]
                .filter(Boolean)
                .sort((a, b) => a.localeCompare(b));

            setPdfFiles(pdfList);
            setFilteredPdfFiles(pdfList);
            setCategories(uniqueCategories);

        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewPdf = async (fileName) => {
        try {
            const { data, error } = await supabase.storage
                .from('MaterialAdicional')
                .getPublicUrl(`/${fileName}`);

            if (error) {
                console.error('Error al obtener URL del PDF:', error);
                return;
            }

            // Abrir PDF en nueva pestaña
            window.open(data.publicUrl, '_blank');
        } catch (error) {
            console.error('Error al abrir PDF:', error);
        }
    };

    const handleSearch = (e) => setSearchTerm(e.target.value);
    const handleCategoryChange = (e) => setCategoryFilter(e.target.value);

    const handleClearFilters = () => {
        setSearchTerm('');
        setCategoryFilter('');
    };

    const formatFileSize = (bytes) => {
        if (!bytes || bytes === 0) return '-';
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
    };

    const showScrollHint = pdfFiles.length > 0 && windowWidth < 1000;

    return (
        <div className="container">
            <header className="header"><Navbar /></header>

            <div className="pdf-container">
                <div className="header-wrapper">
                    <div className="header-content">
                        <h1 className="main-title">Material PDF</h1>
                        <p className="welcome-message">Busca y visualiza documentos PDF disponibles.</p>
                    </div>
                </div>

                <div className="controls-section">
                    <div className="search-filters">
                        <input
                            type="text"
                            placeholder="Buscar por nombre..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="search-input"
                        />
                        <select
                            value={categoryFilter}
                            onChange={handleCategoryChange}
                            className="category-select"
                        >
                            <option value="">Todas las categorías</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                        {(searchTerm || categoryFilter) && (
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

                {!isLoading && !errorMessage && filteredPdfFiles.length > 0 && (
                    <div className="pdf-table-wrapper">
                        <div className="results-count">
                            Mostrando {filteredPdfFiles.length} de {pdfFiles.length} documentos
                        </div>

                        <div className="pdf-table">
                            <div className="table-header">
                                <div className="header-cell">Categoría</div>
                                <div className="header-cell">Nombre del Documento</div>
                                <div className="header-cell">Acción</div>
                            </div>

                            <div className="table-body">
                                {filteredPdfFiles.map((pdf, index) => (
                                    <div key={pdf.id || index} className="table-row">
                                        <div className="table-cell" data-label="Categoría">
                                            <span className="category-badge">{pdf.category}</span>
                                        </div>
                                        <div className="table-cell pdf-name-cell" data-label="Nombre">
                                            {pdf.displayName}
                                        </div>
                                        <div className="table-cell" data-label="Acción">
                                            <button
                                                className="view-pdf-button"
                                                onClick={() => handleViewPdf(pdf.name)}
                                            >
                                                <i className="fas fa-eye"></i> Ver PDF
                                            </button>
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
                        <p>Cargando documentos...</p>
                    </div>
                )}

                {errorMessage && (
                    <div className="error-container">
                        <p>⚠️ {errorMessage}</p>
                        <button className="retry-button upload-button" onClick={fetchPdfFiles}>
                            Intentar nuevamente
                        </button>
                    </div>
                )}

                {!isLoading && !errorMessage && filteredPdfFiles.length === 0 && (
                    <div className="no-results">
                        <p>No se encontraron documentos que coincidan con tu búsqueda.</p>
                        <button className="upload-button clear-filter-button" onClick={handleClearFilters}>
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
