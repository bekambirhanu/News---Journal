import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Article from '../components/Article';
import api from '../components/api';
import MenuBar from '../components/MenuBar';
import styles from '../style/Home.module.css';
import { LOGGEDIN, ISAUTHOR } from '../components/constants';

function Home() {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const navigate = useNavigate();
    const [shiftKeyPressed, setShiftKeyPressed] = useState(null);
    const [keyword, setKeyword] = useState('');






    // const handlekeyWord = async (event) => {

        
    //     if(shiftKeyPressed === true && keyword === 'Author'){
    //         console.log('keyword is clicked');
    //     }
    // }

    useEffect(() => {
        const checkAuthor = async () => {
            // to check wheather the user is an author or not!!
        if (localStorage.getItem(LOGGEDIN) === 'true'){
        
        try{
            const resp = await api.get('/api/check-author/');
        
            if(resp.status===200 && resp.data['status'] === 'true'){

              localStorage.setItem(ISAUTHOR, 'true');
            }else{
              localStorage.setItem(ISAUTHOR, 'false');
            }
        }catch(err){console.log(err), localStorage.setItem(ISAUTHOR, 'false')}
        }
        else (localStorage.setItem(ISAUTHOR, 'false'))
   
        }


        // window.addEventListener('keydown', (event) => {
        //         setShiftKeyPressed(true);
        //         console.log(shiftKeyPressed);

            
        //     if(event.key === 'Shift' && shiftKeyPressed === true ){
        //         setKeyword('Author');
        //         console.log(keyword);
        // }})


        //window.addEventListener('keydown', handlekeyWord());

        api.get('/api/articles/').then((res) => res.data).then((data) => { 
                setArticles(data);
                setFilteredArticles(data);
            });
        checkAuthor();
    }, []);

    const handleCategorySelect = (category) => {
        if (category === 'home') {
            setFilteredArticles(articles);
        } else {
            const filtered = articles.filter(article => 
                article.category.toLowerCase() === category.toLowerCase()
            );
            setFilteredArticles(filtered);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className={styles.homeContainer}>
            <MenuBar onCategorySelect={handleCategorySelect} />
            {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                    <Article key={article.id} article={article} />
                ))
            ) : (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '2rem',
                    color: '#666',
                    fontSize: '1.1rem'
                }}>
                    No articles found in this category
                </div>
            )}
            <button 
                className={styles.authorButton}
                onClick={() => navigate('/author/list-articles')}
                title="Author Articles"
                style={{ marginBottom: '60px' }}
            >
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103.12 122.88"><title>note-book</title><path d="M36.09,34.45a3.15,3.15,0,0,1,0-6.28H76.37a3.15,3.15,0,0,1,0,6.28ZM16.43,90a5.79,5.79,0,1,1-4.86,8.94H8.82v13.36a1.91,1.91,0,0,0,1.9,1.9H91.1a1.91,1.91,0,0,0,1.34-.56,1.87,1.87,0,0,0,.56-1.34V7.12a1.9,1.9,0,0,0-.55-1.34,1.93,1.93,0,0,0-1.35-.56H10.72a1.89,1.89,0,0,0-1.9,1.9V20.48h2.75a5.8,5.8,0,1,1,0,6.29H8.82V44.53h2.75a5.8,5.8,0,1,1,0,6.29H8.82V68.58h2.75a5.79,5.79,0,1,1,0,6.29H8.82V92.63h2.75A5.79,5.79,0,0,1,16.43,90ZM3.14,98.92a3.15,3.15,0,0,1,0-6.29H3.6V74.87H3.14a3.15,3.15,0,0,1,0-6.29H3.6V50.82H3.14a3.15,3.15,0,0,1,0-6.29H3.6V26.77H3.14a3.15,3.15,0,0,1,0-6.29H3.6V7.12a7.09,7.09,0,0,1,2.09-5h0a7.07,7.07,0,0,1,5-2.09H91.1a7.07,7.07,0,0,1,5,2.09h0A7.1,7.1,0,0,1,98,5.44h.6a4.55,4.55,0,0,1,4.5,4.51V118.37a4.53,4.53,0,0,1-4.5,4.51H16.76a4.51,4.51,0,0,1-4.39-3.48H10.72a7.14,7.14,0,0,1-7.12-7.12V98.92Zm33-7.69a3.15,3.15,0,0,1,0-6.29H76.37a3.15,3.15,0,0,1,0,6.29Zm0-18.92a3.15,3.15,0,0,1,0-6.29H76.37a3.15,3.15,0,0,1,0,6.29Zm0-18.93a3.15,3.15,0,0,1,0-6.29H76.37a3.15,3.15,0,0,1,0,6.29Z"/></svg>            </button>
            <button 
                className={styles.logoutButton}
                onClick={handleLogout}
                title="Logout"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/> <polyline points="16 17 21 12 16 7"/> <line x1="21" y1="12" x2="9" y2="12"/> </svg>
            </button>
        </div>
    );
}

export default Home;