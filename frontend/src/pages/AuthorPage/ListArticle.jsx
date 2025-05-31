import React, { useEffect, useState } from 'react';
import api from '../../components/api';
import ArticleCart from './ArticleCart';
import { useNavigate } from 'react-router-dom';



function ListArticle() {
    const [articles, setArticles] = useState([]);

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
    
    </>
}

export default ListArticle;