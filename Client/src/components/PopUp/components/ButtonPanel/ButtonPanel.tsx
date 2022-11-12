import { FC } from "react";
import { ButtonPanelModule } from "../../../../models/AuthModule";
import Button from "../Button/Button";
import style from './ButtonPanel.module.scss'

type ButtonPanelProps={
    props: ButtonPanelModule[]
}
const ButtonPanel: FC<ButtonPanelProps> = ({props}) =>{
    return (
    <div className={style.ButtonPanel}>
        {props.map((date)=>{
            return(
                <Button key={date.id} props={date}/>
            )
        })}
    </div>
    )
}

export default ButtonPanel