import { Link } from "react-router-dom";
import { Header, Segment, Icon, Button } from "semantic-ui-react";


const NotFound = () =>{
    return (
        <Segment>
            <Header icon>
                <Icon name='search'/>
                Oops - we've looked everywhere and could not find this.
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/search' primary>
                    Return to Main page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}

export default NotFound;