import { FC } from "react";
import style from './InputPanel.module.scss'
import { stateInputType } from "../../models/AuthTypes";
import InputContainer from "./Input/InputContainer";

type InputPanelProps = {
    props: stateInputType[]
}
const InputPanel:FC<InputPanelProps>=({props})=>{
    return (
        <form className={style.InputPanel}>
            {props.map((el, id)=>{
                return(
                    <InputContainer prop={el} key={id}/>
                )
            })
            }
        </form>
    )
}

export default InputPanel