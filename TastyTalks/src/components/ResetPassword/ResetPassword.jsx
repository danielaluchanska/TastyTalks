import { resetPassword } from '../../services/auth.services';
import { useNavigate } from 'react-router-dom';
import BackBtn from '../../components/BackBtn/BackBtn';

export default function ResetPassword() {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const userEmail = e.target.email.value;
        resetPassword(userEmail)
            .then((data) => {
                alert("Check your email")
                navigate('/')
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='forgot-password-panel'>
            <h1> Forgot Password?</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input name='email' placeholder='Write your email here...' >
                </input>
                <button className='reset-btn'> Reset</button>
            </form>
        </div>
    )
}