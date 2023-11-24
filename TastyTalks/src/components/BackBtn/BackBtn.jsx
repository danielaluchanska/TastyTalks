import './BackBtn.css';
import { useNavigate } from 'react-router-dom';

export default function BackBtn() {
    const navigate = useNavigate();
    return (<button className="back-btn" onClick={
        () => navigate(-1)
    }

    >Back</button>)
}