import { FC } from "react";
import { ButtonPanelType } from "../../models/AuthTypes";
import ButtonContainer from "./Button/ButtonContainer";
import style from './ButtonPanel.module.scss'

type ButtonPanelProps={
    props: ButtonPanelType[]
}
const ButtonPanel: FC<ButtonPanelProps> = ({props}) =>{
    return (
    <div className={style.ButtonPanel}>
        {props.map((date)=>{
            return(
                <ButtonContainer key={date.id} props={date}/>
            )
        })}
    </div>
    )
}

export default ButtonPanel