import { InjectedFormProps, reduxForm } from "redux-form"
import { maxLengthCreator, required } from "../../../utils/validator/validators"
import { Textarea, createField } from "../../Common/FormsControls/FormControls"
import { NewMessageFormValuesType } from "../Dialogs"

const maxLength50 = maxLengthCreator(50)
type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} style={{ marginTop: "10px" }}>
            <div>
                {createField<NewMessageFormValuesKeysType>("Enter your message", 'newMessageBody', [required, maxLength50], Textarea)}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
export default reduxForm<NewMessageFormValuesType>({ form: 'dialogAddMessageForm' })(AddMessageForm);