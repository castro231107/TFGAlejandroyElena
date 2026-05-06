import React, { useState, useEffect } from 'react';
import './Noticias.css';
import NoticiaCard from '../../components/NoticiaCard/NoticiaCard';

function Noticias() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Usa tu propia API KEY de NewsAPI (https://newsapi.org/)
    // Puedes ponerla en un archivo .env en la raíz de tu proyecto frontend como VITE_NEWS_API_KEY
    const API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'd764d30ba18d4cda8bec3399fce1d184';

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // Buscamos noticias sobre economía, finanzas o mercados, en español
                const url = `https://newsapi.org/v2/everything?q=economia+OR+finanzas+OR+mercados&language=es&sortBy=publishedAt&apiKey=${API_KEY}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Error al obtener las noticias (¿Está configurada tu API Key?)');
                }

                const data = await response.json();
                // Filtramos las que tengan título y no sean removidas
                const validArticles = data.articles.filter(article => article.title && article.title !== '[Removed]');
                setArticles(validArticles.slice(0, 15));
                //.slice sirve para limitar el número de artículos a mostrar
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchNews();
    }, [API_KEY]); // API_KEY hace que se ejecute una vez al cargar la página.

    const noticiaDestacada = articles.length > 0 ? articles[0] : null;
    const noticiasSecundarias = articles.length > 2 ? articles.slice(1, 3) : [];
    const restoNoticias = articles.length > 3 ? articles.slice(3) : articles.slice(1);

    return (
        <div className="contenedor-noticias">
            <header className="cabecera-noticias">
                <h1>Panorama Financiero</h1>
                <p>Las últimas tendencias y movimientos del mercado global.</p>
            </header>

            {loading && (
                <div className="cargando-noticias">
                    <div className="rueda-carga"></div>
                    <p>Cargando información en tiempo real...</p>
                </div>
            )}

            {error && (
                <div className="error-noticias">
                    <p>Error: {error}</p>
                    <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
                        Asegúrate de que la API Key es válida y tiene permisos.
                    </p>
                </div>
            )}

            {!loading && !error && articles.length > 0 && (
                <div className="estructura-noticias">
                    <div className="seccion-superior">
                        {/* Sección Principal (Destacada) */}
                        {noticiaDestacada && (
                            <a href={noticiaDestacada.url} target="_blank" rel="noopener noreferrer" className="noticia-destacada">
                                <div className="contenedor-img-destacada">
                                    <img src={noticiaDestacada.urlToImage || 'https://via.placeholder.com/800x500?text=Finanzas'} alt={noticiaDestacada.title} />
                                </div>
                                <div className="capa-destacada">
                                    <span className="etiqueta-fuente">{noticiaDestacada.source.name}</span>
                                    <h2>{noticiaDestacada.title}</h2>
                                    <p>{noticiaDestacada.description}</p>
                                    <span className="texto-fecha-destacada">{new Date(noticiaDestacada.publishedAt).toLocaleDateString()}</span>
                                </div>
                            </a>
                        )}

                        {/* Sección Secundaria */}
                        <div className="noticias-secundarias">
                            {/* el .map recorre el array de noticias secundarias y crea un elemento por cada una, y cada
                            elemento tendrá una foto, un título, una descripción, la fecha de publicación y la fuente de la noticia
                           ya que lo tiene todo desde la API */}
                            {/* articulo es el nombre que le damos a cada noticia */}
                            {/* el indice es para que no se repitan las noticias */}
                            {noticiasSecundarias.map((articulo, indice) => (
                                <a key={indice} href={articulo.url} target="_blank" rel="noopener noreferrer" className="noticia-secundaria">
                                    <div className="contenedor-img-secundaria">
                                        <img src={articulo.urlToImage || 'https://via.placeholder.com/400x300?text=Economía'} alt={articulo.title} />
                                    </div>
                                    <div className="contenido-secundario">
                                        <span className="etiqueta-fuente">{articulo.source.name}</span>
                                        <h3>{articulo.title}</h3>
                                        <span className="texto-fecha">{new Date(articulo.publishedAt).toLocaleDateString()}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Sección de Cuadrícula para el resto de noticias */}
                    <div className="cuadricula-noticias-resto">
                        {restoNoticias.map((articulo, indice) => (
                            <NoticiaCard key={indice} article={articulo} />
                            //el articulo es el elemento que le pasamos al componente NoticiaCard para que NoticiaCard lo muestre 
                            //el indice es para que no se repitan las noticias
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Noticias;
