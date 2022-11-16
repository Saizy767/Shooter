import { FC } from "react";
import style from './InputPanel.module.scss'
import { InputPanelModule } from "../../../../models/AuthModule";
import InputContainer from "../Input/InputContainer";

type InputPanelProps = {
    props: InputPanelModule[]
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