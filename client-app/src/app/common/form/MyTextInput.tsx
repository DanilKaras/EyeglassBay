import { useField } from "formik";
import {Form, Label, SemanticWIDTHS} from "semantic-ui-react";

interface Props{
    placeholder: string;
    name: string;
    type?: string;
    label?: string;
    width?: SemanticWIDTHS | undefined;
    step?: number | undefined;
}
const MyTextInput = (props: Props) => {
    const [field, meta] = useField(props.name);

    return (
        <Form.Field fluid width={props.width} error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props}/>
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}

export default MyTextInput;