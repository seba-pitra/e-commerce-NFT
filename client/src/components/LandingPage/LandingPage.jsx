import { Link } from 'react-router-dom';
 
function LandingPage(){
    return (
        <>
        <Link
            to='/home'>
            <button>
                HOME
            </button>
        </Link>    
        </>
    );
}

export default LandingPage;