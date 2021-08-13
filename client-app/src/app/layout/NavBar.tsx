import {Container, Menu} from "semantic-ui-react";

const NavBar = () => {
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src={'/eye-glasses.png'} alt="logo" style={{marginRight: '10px'}}/>
                </Menu.Item>
                <Menu.Item name='Eye Glasses'/>
                <Menu.Item name='Upload Doc'/>
            </Container>
        </Menu>
    )
} 

export default (NavBar);