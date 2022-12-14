import { TypeUserDTO } from "../models/user-modules"

class UserDTO {
    id;
    email;
    isActivated;
    constructor(model:TypeUserDTO){
        this.id = model.id,
        this.email= model.email,
        this.isActivated = model.isActivated
    }
}

export default UserDTO