import {useStore} from "../../app/stores/store";
import {useEffect} from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {EyeGlass} from "../../app/models/eyeGlass";
import {List} from "semantic-ui-react";
import {observer} from "mobx-react-lite";

const EyeglassList = () => {

    const {eyeglassStore} = useStore();

    useEffect(() => {
        const loadEyeglasses = async () => {
            await eyeglassStore.loadEyeglasses();
        }
        loadEyeglasses();
    }, [eyeglassStore])

    if (eyeglassStore.loadingInitial) return <LoadingComponent content='Loading app' />
        
    return (
        <>
            <List>
                {eyeglassStore.eyeGlasses.map((eyeGlass: EyeGlass) => (
                        <List.Item key={eyeGlass.id}>
                            {eyeGlass.productName}
                        </List.Item>
                    ))}
            </List>
        </>
    );
}

export default observer(EyeglassList);