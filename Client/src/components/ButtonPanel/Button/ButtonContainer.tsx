import { FC } from "react";
import { ButtonPanelType } from "../../../models/AuthTypes";
import Button from "./Button";

type ButtonProps = {
    props: ButtonPanelType
}

const ButtonContainer:FC<ButtonProps> =({props}) => {
    let HoveredColor = 'rgb(104, 182, 88)'
    
    switch(props.typeMessage){
        case('Not'):{
            HoveredColor = '#d22626'
            break
        }
        case('Warning'):{
            HoveredColor = '#e28c3f'
            break
        }
        default:{
            HoveredColor = 'rgb(104, 182, 88)'
        }
    }
    return(
        <Button props={props} HoveredColor={HoveredColor}/>
    )
}

export default ButtonContainer

