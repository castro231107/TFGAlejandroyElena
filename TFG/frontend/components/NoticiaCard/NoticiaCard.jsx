import React from 'react';
import './NoticiaCard.css';

function NoticiaCard({ article }) {
    if (!article) return null;

    return (
        //rel="noopener noreferrer" permite abrir el enlace en una nueva pestaña sin comprometer la seguridad
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="rest-article">
            <div className="rest-img-wrapper">
                <img src={article.urlToImage || 'https://via.placeholder.com/300x200?text=Mercados'} alt={article.title} />
            </div>
            <div className="rest-content">
                <span className="source-badge-small">{article.source.name}</span>
                <h4>{article.title}</h4>
                <span className="date-text-small">{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
        </a>
    );
}

export default NoticiaCard;
