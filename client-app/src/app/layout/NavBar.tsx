import {Container, Menu, Image, Dropdown} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import {useStore} from "../stores/store";
import {observer} from "mobx-react-lite";

const NavBar = () => {
    const {userStore: {user, logout}} = useStore();
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src={'/eye-glasses.png'} alt="logo" style={{marginRight: '10px'}}/>
                </Menu.Item>
                <Menu.Item as={NavLink} to={'/search'} name={'Search'} />
                <Menu.Item as={NavLink} to={'/eyeglasses'} name='Eye Glasses'/>
                <Menu.Item as={NavLink} to={'/document-upload'} name='Upload Doc'/>
                <Menu.Item position={'right'}>
                    <Image src={'/user.png'} avatar spaced={'right'}/>
                    <Dropdown pointing={'top left'} text={'Admin'}>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={logout} text={'Logout'} icon={'power'}/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
} 

export default observer(NavBar);