import { useEffect, useState } from "react"
import { getAllPosts } from "../../services/posts.services"
import { getAllUserData } from "../../services/users.services";
import { Text, Highlight, Box } from '@chakra-ui/react'


const DisplayUsersAndPosts = () => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllPosts()
            .then((res) => setPosts(res))
            .catch((err) => console.error(`Problem fetching all posts`, err))
    }, [])

    useEffect(() => {
        getAllUserData()
            .then((res) => setUsers(res))
            .catch((err) => console.error(`Problem fetching all posts`, err))
    }, [])
    const dynamicText = `At Tasty Talks, we take pride in our vibrant community of ${users.length} members and counting! It's a diverse gathering of culinary enthusiasts, from home cooks to professional chefs, all passionate about the art of cooking.`;

    const dynamicTextPosts = `With ${posts.length} posts and counting, our forum is a treasure trove of culinary wisdom, mouthwatering recipes, and lively discussions. Dive into the various categories, share your kitchen adventures, seek advice, and explore the endless possibilities the world of cooking has to offer.`
    return (
        <Box mb={15}>
            <Text as='b'>🌟 Welcome to Tasty Talks - Where Culinary Enthusiasts Unite! 🌮🍲🍰</Text>
            <br />
            <Text as='em' >Hello Foodies and Cooking Aficionados!

                We're thrilled to welcome you to Tasty Talks, your go-to destination for all things delicious and delightful. Whether you're a seasoned chef or a kitchen newbie, here, you'll find a warm community ready to share, learn, and savor the incredible world of cooking.</Text>
            <br />
            <br />
            <Text as='b'>👩‍🍳 Join Our Growing Community:</Text>
            <br />
            <Text as='em'>
                <Highlight query={users.length.toString()} styles={{ px: '2', py: '1', rounded: 'full', bg: 'yellow.300' }}>
                    {dynamicText}
                </Highlight>
            </Text>
            <br />
            <br />
            <Text as='b'>📚 Discover a Feast of Knowledge:</Text>
            <br />
            <Text as='em'>
                <Highlight query={posts.length.toString()} styles={{ px: '2', py: '1', rounded: 'full', bg: 'yellow.300' }}>
                    {dynamicTextPosts}
                </Highlight>
            </Text>
            <br />
            <br />
            <Text as='b'>👨‍🍳 Connect, Share, and Learn:</Text>
            <br />
            <Text as='em'>Feel free to introduce yourself, share your favorite recipes, or ask for tips and tricks. Tasty Talks is more than just a forum; it's a place to connect with like-minded individuals, exchange ideas, and embark on a gastronomic journey together.</Text>
            <br />
            <br />
            <Text as='b'>🎉 Join the Conversation:</Text>
            <br />
            <Text as='em'>Ready to join the fun? Start by exploring the latest discussions, or jump right in and share your own culinary stories. We can't wait to hear about your kitchen triumphs and discover the flavors that inspire you.
                <br />
                Here's to the joy of cooking and the joy of sharing it with others! 🍽️✨
                <br />
                <br />
                Bon appétit,
                <br />
                The Tasty Talks Team 🌮🎉</Text>
        </Box>
    )
}

export default DisplayUsersAndPosts;