import { FC } from "react";
import style from './InputPanel.module.scss'
import { InputPanelModule } from "../../../../models/AuthModule";

type InputPanelProps = {
    props: InputPanelModule[]
}
const InputPanel:FC<InputPanelProps>=({props})=>{
    return (
        <form className={style.InputPanel}>
            {props.map((el)=>{
                return(
                    <input alt={el?.alt} placeholder={el?.placeholder} 
                           className={style.InputRegistration} key={el?.id} type={el?.type}></input>
                )
            })
            }
        </form>
    )
}

export default InputPanel