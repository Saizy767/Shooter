import { FC } from "react";
import style from './InputPanel.module.scss'
import { InputPanelType } from "../../models/AuthTypes";
import InputContainer from "./Input/InputContainer";

type InputPanelProps = {
    props: InputPanelType[]
}
const InputPanel:FC<InputPanelProps>=({props})=>{
    return (
        <form className={style.InputPanel}>
            {props.map((el)=>{
                return(
                    <InputContainer prop={el} key={el.id}/>
                )
            })
            }
        </form>
    )
}

export default InputPanel