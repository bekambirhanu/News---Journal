import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../components/api';
import '../../style/CreateArticle.css';

function CreateArticle() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    const categories = ['research', 'news', 'event', 'thematics', 'story'];

    // Get CSRF token when component mounts
    useEffect(() => {
        const getCsrfToken = async () => {
            try {
                const res = await api.get('/api/csrf/');
                if (res.status === 200) {
                    const csrf_token = res.data.CSRF_cookie;
                    localStorage.setItem('csrf_token', csrf_token);
                }
            } catch (err) {
                console.error('Error getting CSRF token:', err);
            }
        };
        getCsrfToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('api/author/create-articles/', { 'title': title, 'content': content, 'category': category, 'author': '___'});
            setNotification({
                show: true,
                message: 'Article created successfully!',
                type: 'success'
            });
            // Clear form
            setTitle('');
            setContent('');
            setCategory('');
            // Navigate after 2 seconds
            setTimeout(() => {
                navigate('/author/list-articles');
            }, 2000);
        } catch (error) {
            setNotification({
                show: true,
                message: 'Error creating article. Please try again.',
                type: 'error'
            });
            console.error('Error creating article:', error);
        }
    }

    return (
        <div className="create-article-container">
            <div className="paper-form">
                <h1 className="form-title">Create Article</h1>
                {notification.show && (
                    <div className={`notification ${notification.type}`}>
                        {notification.message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="article-form">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text" 
                            id="title"
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder='Enter article title' 
                            required 
                            className="form-input"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select 
                            id="category"
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)} 
                            required
                            className="form-select"
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea 
                            id="content"
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                            placeholder='Write your article content here...' 
                            required 
                            className="form-textarea"
                        />
                    </div>

                    <button type='submit' className="submit-button">Create Article</button>
                </form>
            </div>
        </div>
    );
}

export default CreateArticle;