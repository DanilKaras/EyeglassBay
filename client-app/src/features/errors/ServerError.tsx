import { Container, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import {observer} from "mobx-react-lite";

const ServerError = () => {
    const {commonStore} = useStore();
    return (
        <Container>
            <Header as='h1' content='Server Error' />
            <Header sub as='h5' color='red' content={commonStore.error?.response!.statusText} />
            {commonStore.error?.response!.data &&
            <Segment>
                <Header as='h4' content='Stack trace' color='teal'/>
                <code style={{marginTop: '10px'}}>{commonStore.error.response!.data}</code>
            </Segment>}
        </Container>
    )
}

export default observer(ServerError);