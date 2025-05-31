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