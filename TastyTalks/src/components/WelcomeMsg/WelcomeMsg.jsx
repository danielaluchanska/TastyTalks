import DisplayUsersAndPosts from '../DisplayUsersAndPosts/DisplayUsersAndPosts';
import './WelcomeMsg.css';

export default function WelcomeMsg() {
    return (
        <>
            <div className='welcome-msg'>
                <p>Welcome to the Animals heaven</p>
                <p> Here you can ....</p>

                <DisplayUsersAndPosts />
            </div>
        </>
    )
}