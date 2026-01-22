import { Link } from 'react-router-dom';
import './Home.css';
import logoA from '../Login/Audifonoslogo.png';

function Landing() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-logo">
            <img src={logoA} className="App-logo" alt="Edubeats logo" />
          </div>
          
          <h1 className="hero-title">
            Bienvenido a <span className="gradient-text">Edubeats</span>
          </h1>
          
          <p className="hero-subtitle">
            Descubre un nuevo mundo de aprendizaje a través de nuestra plataforma educativa con contenido multimedia innovador.
          </p>
          
          <a href="/Login" className="hero-cta">
            Comenzar Ahora
            <span className="cta-arrow">→</span>
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">¿Qué ofrecemos?</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎵</div>
              <h3>Audio Educativo</h3>
              <p>Contenido diseñado para ti con experiencias de aprendizaje únicas</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Pruebas Interactivas</h3>
              <p>Ejercicios con corrección automática y retroalimentación inmediata</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Material de Estudio</h3>
              <p>Acceso a enlaces y recursos educativos de calidad</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎧</div>
              <h3>Contenido Premium</h3>
              <p>Lecciones especializadas y material multimedia exclusivo</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Multiplataforma</h3>
              <p>Disponible en cualquier dispositivo, cuando lo necesites</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Fácil de Usar</h3>
              <p>Interfaz intuitiva diseñada para una experiencia fluida</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>¿Listo para comenzar?</h2>
          <p>Únete a nuestra comunidad de aprendizaje hoy mismo</p>
          <a href="/Login" className="cta-button">
            Acceder a la Plataforma
          </a>
        </div>
      </section>
    </div>
  );
}

export default Landing;