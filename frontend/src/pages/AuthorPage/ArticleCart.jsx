import React from 'react';
import '../../style/ArticleCart.css';

export default function ArticleCart({ article, handleDelete }) {
    return (
        <div className='article-cart'>
            <div className='article-header'>
                <h2 className='article-title'>{article.title}</h2>
                <span className='article-category'>{article.category}</span>
            </div>
            <div className='article-content'>
                <p>{article.content}</p>
            </div>
            <div className='article-footer'>
                <button className='delete-btn' onClick={() => handleDelete(article.id)}>Delete</button>
            </div>
        </div>
    )
}
