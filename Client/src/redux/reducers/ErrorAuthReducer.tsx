import { createSlice, PayloadAction} from '@reduxjs/toolkit'

type ErrorType = {
    ErrorName:any,
    ErrorSurname:any,
    ErrorEmail:any,
    ErrorPassword:any,
    ErrorRepPassword:any,
    ErrorCode:any
}

const initialState:ErrorType = {
    ErrorName:{},
    ErrorSurname:{},
    ErrorEmail:{},
    ErrorPassword:{},
    ErrorRepPassword:{},
    ErrorCode:{}
}

export const errorRegSlice = createSlice({
    name: 'errorRegSlice',
    initialState,
    reducers:
    {
        setErrorName:(state,action:PayloadAction)=>{
            state.ErrorName = action.payload
        },
        setErrorSurName:(state,action:PayloadAction)=>{
            state.ErrorSurname = action.payload
        },
        setErrorEmail:(state,action:PayloadAction)=>{
            state.ErrorEmail = action.payload
        },
        setErrorPassword:(state,action:PayloadAction)=>{
            state.ErrorPassword = action.payload
        },
        setErrorRepPassword:(state,action:PayloadAction)=>{
            state.ErrorRepPassword = action.payload
        },
        setErrorCode:(state,action:PayloadAction)=>{
            state.ErrorCode = action.payload
        }
        
    }
}
)



export default errorRegSlice

