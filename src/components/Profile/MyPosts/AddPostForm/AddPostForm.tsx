import { Field, InjectedFormProps, reduxForm } from "redux-form"
import { GetStringKeys, Input, Textarea, createField } from "../../../Common/FormsControls/FormControls"
import React from "react"
import { required } from "../../../../utils/validator/validators"

type PropsType = {}

export type AddPostFormValuesType = {
    newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
                <div>
                { createField<AddPostFormValuesTypeKeys>("Your post", 'newPostText', [required], Textarea) }
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </form>
    )

}
export default reduxForm<AddPostFormValuesType, PropsType>({form: "ProfileAddNewPostForm"})(AddPostForm)