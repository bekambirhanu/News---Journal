import { useState, useEffect } from "react";
import { LOGGEDIN, ISAUTHOR } from "./constants";
import { Navigate, useLocation } from "react-router-dom";

function IsAuthor ({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const location = useLocation();


    useEffect(() => {
        const checkIfAuthor = async () =>{
            const isLogged = localStorage.getItem(LOGGEDIN);
            const isAuthor = localStorage.getItem(ISAUTHOR);
    
            if(isLogged ==='false') {
                setIsAuthorized(false);
            }
            else if(isLogged === 'true'&& isAuthor === 'true'){
                setIsAuthorized(true);
            }
            else if(isLogged === 'true'&& isAuthor === 'false'){
                setIsAuthorized(false);
            }
            else{
                setIsAuthorized(false);
            }
    
        }
        checkIfAuthor();
    }, [])


    return isAuthorized ===true ? children : <div> NOT AUTHORIZED!⚠️ </div>
    
}


export default IsAuthor;