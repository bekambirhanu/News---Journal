import React, { useEffect, useState } from 'react';
import api from '../../components/api';
import ArticleCart from './ArticleCart';
import { useNavigate } from 'react-router-dom';

function ListArticle() {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    const getArticles = async () => {
        try {
            const res = await api.get('/api/author/create-articles/');
            if (res.status === 200) {
                setArticles(res.data);
            }
        }catch(err) {
            console.log(err);
    }
    }

    useEffect(() => {
        getArticles();
    },[])

    console.log(articles)

    const handleDelete = async (id) => {
        try{
            await api.post(`/api/author/delete-article`, {id});
        }catch(err) {
            console.log(err);
        }finally{
            getArticles();
        }
    }

    return <>
    <h1>Your Articles</h1>
    {articles && articles.map((article) => (
        <ArticleCart key={article.id}article={article} handleDelete={handleDelete} id={article.id} />
    ))}
    <button 
        className='create-article-button'
        onClick={() => navigate('/author/create-article')}
        title="Create Article"
        style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#007bff',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
        </svg>
    </button>
    </>
}

export default ListArticle;