import './About.css';
import { useNavigate } from "react-router-dom";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormLabel, Input, Textarea, FormControl, Button, } from '@chakra-ui/react';
import AppContext from '../../context/AuthContext';
import { useContext } from 'react';
export default function About() {
    const navigate = useNavigate();
    const { userData } = useContext(AppContext);
    const { isOpen, onOpen, onClose } = useDisclosure();


    const handleSubmit = (e) => {
        console.log('ok')
        onClose();
    };

    return (
        <div>
            <div>
                Hello food enthusiasts and flavor adventurers!
                <br />
                🍽️🌍 Whether you're a seasoned chef, a kitchen newbie, or someone who simply loves savoring delicious dishes, you've just stepped into the Foodie Haven – the ultimate forum for all things gastronomic!
                <br />
                This is the place to share your favorite recipes, seek cooking advice, and embark on a culinary journey with fellow foodies from around the globe. From mouthwatering appetizers to decadent desserts, every dish has a story, and we want to hear yours!
                <br />
                <br />
                Feel free to:
                <br />
                👩‍🍳 Share your tried-and-true recipes that never fail to impress. <br />
                🤔 Ask for tips on perfecting that tricky technique. <br />
                🌶️ Discuss the latest food trends and innovations. <br />
                🌐 Explore and exchange international flavors and cuisines. <br />
                📸 Showcase your culinary masterpieces with food pics that make our taste buds tingle. <br /> <br />

                Remember, this forum is a judgment-free zone – whether you're a Michelin-star chef or a microwave maestro, all food lovers are welcome!
                <br /> <br />
                So, pull up a chair, grab a virtual fork, and let's embark on a delectable journey together. What's on your plate today? Share the love for food, one delicious post at a time! 🥂🍓 #FoodieHaven #CulinaryCommunity
                <br /> <br /> <br /> <br></br><br></br>
            </div>
            <div className="about-view">
                <h3>About us</h3>
                <br></br>
                <p>Hello, lovely people! 👋 We’re a trio of tech-savvy foodies 🍲💻 who’ve cooked up this forum to share and explore delicious recipes from around the world 🌍.

                    We invite you to join us in this culinary adventure. Whether you’re a pro chef or a kitchen newbie, there’s something for everyone here. Let’s cook, share, and savor together. Happy cooking! 🥘😊</p>
                <br></br>
                <br></br>
                <div className="developer-grid">
                    <div className="developer">
                        <h4>Daniela</h4>
                        <img className="developer-image" src="assets\Chef-cuate.png" alt="Developer 1" />
                        <br></br>
                        <p>Developer 1 is a full-stack developer with a love for experimenting with new recipes in their spare time.</p>
                    </div>
                    <div className="developer">
                        <h4>Ivan</h4>
                        <img className="developer-image" src="assets\Chef-pana.png" alt="Developer 2" />
                        <br></br>
                        <p>Developer 2 is a front-end specialist who enjoys baking and trying out different cuisines.</p>
                    </div>
                    <div className="developer">
                        <h4>Samuil</h4>
                        <img className="developer-image" src="assets\Chef-bro.png" alt="Developer 3" />
                        <br></br>
                        <p>Developer 3 is a back-end expert who loves to grill and has a knack for creating delicious BBQ recipes.</p>

                    </div>

                </div>


                <>

                    <div className='send-msg'>
                        <br></br><br></br>
                        <h3 > Contact us:</h3>

                        <div className='form'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' name='email' id='email' />
                            <label htmlFor='text'>Message</label>
                            <textarea type='text' name='text' id='text' rows={10} cols={15} />
                            <button className='msg-btn' onClick={handleSubmit} >Send Message</button>
                        </div>

                    </div>

                </>
            </div>
        </div>
    )
}


// <div className='comment-button'>
// <button onClick={onOpen}> Contact us:</button>
// <Modal isOpen={isOpen} onClose={onClose}>
//     <ModalOverlay />
//     <ModalContent>
//         <ModalHeader>Contact us:</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//             <form className="comment-container" onSubmit={handleSubmit}>
//                 <FormLabel>Email:</FormLabel>
//                 <Textarea
//                     type="email"
//                     placeholder="Write your email here ..."

//                     rows={1}
//                     cols={15}
//                 />
//                 <Textarea
//                     type="text"
//                     placeholder="Write your question here ..."

//                     rows={15}
//                     cols={15}
//                 />
//                 <button type="submit" >
//                     Submit
//                 </button>
//             </form>
//         </ModalBody>
//     </ModalContent>
// </Modal>
// </div>

// </>
// </div>
// </div>
