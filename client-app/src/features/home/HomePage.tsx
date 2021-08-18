import {Button, Container, Header, Segment, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useStore} from "../../app/stores/store";
import LoginForm from "../users/LoginForm";

const HomePage = () => {
    const {userStore, modalStore} = useStore();
    return (
        <Segment inverted textAlign={'center'} vertical className={'masthead'}>
            <Container text>
                
                <Header as={'h1'} inverted>
                    <Image size='massive' src={'/eye-glasses.png'} alt={'logo'} style={{marginBottom: '0.2em'}} />
                    Eyeglass Bay
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to Reactivities' />
                        <Button as={Link} to="/search" size='huge' inverted>
                            Go to Search!
                        </Button>
                    </>

                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                            Login!
                        </Button>
                    </>
                )}
            </Container>
        </Segment> 
    )
}

export default HomePage;