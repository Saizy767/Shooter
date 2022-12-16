"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./src/routes/user.route"));
const coctail_route_1 = __importDefault(require("./src/routes/coctail.route"));
const auth_route_1 = __importDefault(require("./src/routes/auth.route"));
const PORT = process.env.PORT || 4000;
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
exports.app = express_1.default();
exports.app.use(express_1.default.json());
exports.app.use(cors_1.default());
exports.app.use('/api/', user_route_1.default, cors_1.default(corsOptions));
exports.app.use('/api/', coctail_route_1.default);
exports.app.use('/api/', auth_route_1.default);
if (process.env.NODE_ENV !== 'test') {
    exports.app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}
