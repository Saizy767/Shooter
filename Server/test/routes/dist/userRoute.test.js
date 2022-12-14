"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var supertest_1 = require("supertest");
var dotenv = require("dotenv");
var pg_1 = require("pg");
var index_1 = require("../../../index");
var user_schema_1 = require("../../../src/models/user-schema");
dotenv.config();
var testPool = new pg_1.Pool({
    user: process.env.POOL_NAME,
    host: process.env.HOST,
    port: Number(process.env.DATAPORT),
    database: process.env.TEST_DATANAME
});
describe('user routes', function () {
    var user;
    var req;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testPool.query(user_schema_1.DataQuery)];
                case 1:
                    _a.sent();
                    user = { name: 'Mike', surname: 'Dark', email: 'qwerty@gmail.com', password: 'qwertyqwert' };
                    return [4 /*yield*/, supertest_1["default"](index_1.app).post('/api/user/registration').send(user)];
                case 2:
                    req = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.clearAllMocks();
                    return [4 /*yield*/, testPool.query('DROP TABLE person;')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('POST /registration', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(req.status).toBe(201);
            return [2 /*return*/];
        });
    }); }),
        test('UPDATED /registration', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1["default"](index_1.app).post('/api/user/registration').send(user)];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); }),
        test('PATCH /auth-code', function () { return __awaiter(void 0, void 0, void 0, function () {
            var person, usercode, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1["default"](index_1.app).get('/api/user')];
                    case 1:
                        person = _a.sent();
                        usercode = { email: 'qwerty@gmail.com', code: person.body[0].activatedcode };
                        return [4 /*yield*/, supertest_1["default"](index_1.app).patch('/api/user/auth-code').send(usercode)];
                    case 2:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); }),
        test('GET /user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1["default"](index_1.app).get('/api/user')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); }),
        test('DELETE /user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var deleteUser, deleteErrorUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1["default"](index_1.app)["delete"]('/api/user/1')];
                    case 1:
                        deleteUser = _a.sent();
                        return [4 /*yield*/, supertest_1["default"](index_1.app)["delete"]('/api/user/2')];
                    case 2:
                        deleteErrorUser = _a.sent();
                        expect(deleteUser.status).toBe(200);
                        expect(deleteErrorUser.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); }),
        test('GET /user/email/:email', function () { return __awaiter(void 0, void 0, void 0, function () {
            var existingResponse, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1["default"](index_1.app).get("/api/user/email/" + user.email)];
                    case 1:
                        existingResponse = _a.sent();
                        return [4 /*yield*/, supertest_1["default"](index_1.app).get("/api/user/email/" + (user.email + 'a'))];
                    case 2:
                        response = _a.sent();
                        expect(existingResponse.status).toBe(400);
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); }),
        test('GET /user/:id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, responseError;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1["default"](index_1.app).get('/api/user/1')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, supertest_1["default"](index_1.app).get('/api/user/2')];
                    case 2:
                        responseError = _a.sent();
                        expect(response.status).toBe(200);
                        expect(responseError.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); }),
        test('PUT /user/:id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var newUser, update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newUser = { name: 'Lucka', surname: 'Host' };
                        return [4 /*yield*/, supertest_1["default"](index_1.app).put('/api/user/1').send(newUser)];
                    case 1:
                        update = _a.sent();
                        expect(update.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); }),
        test('PUT /user/homebar/:id', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1["default"](index_1.app).patch('/api/user/homebar/1').send({ homebar: { coctail: 'Pinokolada' } })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [2 /*return*/];
                }
            });
        }); });
    test('PUT /user/favorites/:id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1["default"](index_1.app).patch('/api/user/favorites/1').send({ favorites: { coctail: 'Pinokolada' } })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
