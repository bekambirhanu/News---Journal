import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import LongCart from '../components/LongCart';
import styles from '../style/LongArticle.module.css';
import api from '../components/api';

function LongArticle() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [article, setArticle] = useState(location.state?.article);
    const [loading, setLoading] = useState(!article);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            if (!article) {
                try {
                    setLoading(true);
                    const response = await api.get(`/api/articles/${id}/`);
                    setArticle(response.data);
                } catch (err) {
                    setError('Failed to load article');
                    console.error('Error fetching article:', err);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchArticle();
    }, [id, article]);

    if (loading) {
        return <div className={styles.loading}>Loading article...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    if (!article) {
        navigate('/');
        return null;
    }

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
                ← Back to Articles
            </button>
            <LongCart article={article} />
        </div>
    );
}

export default LongArticle;