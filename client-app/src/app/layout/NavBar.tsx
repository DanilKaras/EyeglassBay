import {Container, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src={'/eye-glasses.png'} alt="logo" style={{marginRight: '10px'}}/>
                </Menu.Item>
                <Menu.Item as={NavLink} to={'/search'} name={'Search'} />
                <Menu.Item as={NavLink} to={'/eyeglasses'} name='Eye Glasses'/>
                <Menu.Item as={NavLink} to={'/document-upload'} name='Upload Doc'/>
            </Container>
        </Menu>
    )
} 

export default NavBar;