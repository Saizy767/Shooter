"use strict";
exports.__esModule = true;
var UserDTO = /** @class */ (function () {
    function UserDTO(model) {
        this.id = model.id,
            this.email = model.email,
            this.isActivated = model.isActivated;
    }
    return UserDTO;
}());
exports["default"] = UserDTO;
