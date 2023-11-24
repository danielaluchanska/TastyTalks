import { NavLink } from 'react-router-dom'

export default function Error() {

    return (
        <div>
            <h1> Uppppss.. </h1>
            <h3> Looks like something wrong with this page </h3>
            <br></br>
            <br></br>
            <p> You can go back to our <NavLink to='/home' className='navigation-link'>Home page</NavLink> </p>
        </div>
    )
}