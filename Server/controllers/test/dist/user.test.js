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
var pg_1 = require("pg");
var supertest_1 = require("supertest");
var index_1 = require("../../index");
describe('registration', function () {
    var testPool = new pg_1.Pool({
        user: process.env.POOL_NAME,
        host: process.env.HOST,
        port: Number(process.env.DATAPORT),
        database: process.env.TEST_DATANAME
    });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testPool.query("CREATE TABLE person (\n          id SERIAL PRIMARY KEY,\n          email VARCHAR (75) UNIQUE,\n          password VARCHAR(255),\n          name VARCHAR(255),\n          surname VARCHAR(255),\n          favorites JSON ARRAY,\n          homebar JSON ARRAY,\n          isActivated boolean,\n          tokenActivated boolean,\n          activatedCode VARCHAR(6));")];
                case 1:
                    _a.sent();
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
    it('should response Account created', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, newUser, response, repeat, responseGet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = { name: 'Mike', surname: 'Dark', email: 'qwerty@gmail.com', password: 'qwerty' };
                    newUser = { name: 'Mikes', surname: 'Ligth', email: 'qwerty@gmail.com', password: 'qwerty123' };
                    return [4 /*yield*/, supertest_1["default"](index_1.app).post("/api/user/registration").send(user).then(function (data) { return data.body; })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, supertest_1["default"](index_1.app)
                            .post("/api/user/registration")
                            .send(newUser)
                            .then(function (data) { return data.body; })];
                case 2:
                    repeat = _a.sent();
                    return [4 /*yield*/, supertest_1["default"](index_1.app).get('/api/user')];
                case 3:
                    responseGet = _a.sent();
                    expect(responseGet.body[0]).toMatchObject({
                        "email": newUser.email,
                        "name": newUser.name,
                        "tokenactivated": false,
                        "surname": newUser.surname,
                        "isactivated": false
                    });
                    expect(response.message).toBe('Account created');
                    expect(repeat.message).toBe('Account updated');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should response name empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = { name: '', surname: 'Dark', email: 'qwerty@gmail.com', password: 'qwerty' };
                    return [4 /*yield*/, supertest_1["default"](index_1.app).post("/api/user/registration").send(user)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toBe('Invalid value');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should response surname empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = { name: 'Mike', surname: '', email: 'qwerty@gmail.com', password: 'qwerty' };
                    return [4 /*yield*/, supertest_1["default"](index_1.app).post("/api/user/registration").send(user)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toBe('Invalid value');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should response email empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = { name: 'Mike', surname: 'Dark', email: '', password: 'qwerty' };
                    return [4 /*yield*/, supertest_1["default"](index_1.app).post("/api/user/registration").send(user)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toBe('Invalid value');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should response password empty', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = { name: 'Mike', surname: 'Dark', email: 'qwerty@gmail.com', password: '' };
                    return [4 /*yield*/, supertest_1["default"](index_1.app).post("/api/user/registration").send(user)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toBe('Invalid value');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('send Authorization Code', function () {
    var user;
    var res;
    var testPool = new pg_1.Pool({
        user: process.env.POOL_NAME,
        host: process.env.HOST,
        port: Number(process.env.DATAPORT),
        database: process.env.TEST_DATANAME
    });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testPool.query("CREATE TABLE person (\n      id SERIAL PRIMARY KEY,\n      email VARCHAR (75) UNIQUE,\n      password VARCHAR(255),\n      name VARCHAR(255),\n      surname VARCHAR(255),\n      favorites JSON ARRAY,\n      homebar JSON ARRAY,\n      isActivated boolean,\n      tokenActivated boolean,\n      activatedCode VARCHAR(6));")];
                case 1:
                    _a.sent();
                    user = { name: 'Mike', surname: 'Dark', email: 'qwerty@gmail.com', password: 'qwertyqwert' };
                    return [4 /*yield*/, supertest_1["default"](index_1.app).post('/api/user/registration').send(user)];
                case 2:
                    res = _a.sent();
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
    it('should return Authorization code updated', function () { return __awaiter(void 0, void 0, void 0, function () {
        var getUser, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1["default"](index_1.app).get('/api/user/1')];
                case 1:
                    getUser = _a.sent();
                    return [4 /*yield*/, supertest_1["default"](index_1.app)
                            .patch('/api/user/auth-code')
                            .send({ email: user.email, code: getUser.body[0].activatedcode })];
                case 2:
                    response = _a.sent();
                    expect(response.body).toBe('Authorization code updated');
                    return [2 /*return*/];
            }
        });
    }); }),
        it('should return two true of isActivated and tokenActivated', function () { return __awaiter(void 0, void 0, void 0, function () {
            var getUser, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1["default"](index_1.app).get('/api/user/1')];
                    case 1:
                        getUser = _a.sent();
                        return [4 /*yield*/, supertest_1["default"](index_1.app)
                                .patch('/api/user/auth-code')
                                .send({ email: user.email, code: getUser.body[0].activatedcode })
                                .then(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, supertest_1["default"](index_1.app).get('/api/user/1')];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); })
                                .then(function (data) { return data.body[0]; })];
                    case 2:
                        response = _a.sent();
                        expect(response.isactivated).toBeTruthy();
                        expect(response.tokenactivated).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); }),
        it('should return Authorization code error of invalid code', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1["default"](index_1.app)
                            .patch('/api/user/auth-code')
                            .send({ email: user.email, code: '123456' })];
                    case 1:
                        response = _a.sent();
                        expect(response.body).toBe('Authorization code error');
                        return [2 /*return*/];
                }
            });
        }); }),
        it('should return two false of isActivated and tokenActivated', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1["default"](index_1.app)
                            .patch('/api/user/auth-code')
                            .send({ email: user.email, code: '123456' })
                            .then(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, supertest_1["default"](index_1.app).get('/api/user/1')];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); })
                            .then(function (data) { return data.body[0]; })];
                    case 1:
                        response = _a.sent();
                        expect(response.isactivated).toBeFalsy();
                        expect(response.tokenactivated).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); }),
        it('should return Authorization code error of empty email', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1["default"](index_1.app)
                            .patch('/api/user/auth-code')
                            .send({ email: '', code: '123456' })];
                    case 1:
                        response = _a.sent();
                        expect(response.body).toBe('Invalid value');
                        return [2 /*return*/];
                }
            });
        }); }),
        it('should return Authorization code error of empty code', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, supertest_1["default"](index_1.app)
                            .patch('/api/user/auth-code')
                            .send({ email: user.email, code: '' })];
                    case 1:
                        response = _a.sent();
                        expect(response.body).toBe('Invalid value');
                        return [2 /*return*/];
                }
            });
        }); });
});
describe('send to email', function () {
    var user;
    var res;
    var testPool = new pg_1.Pool({
        user: process.env.POOL_NAME,
        host: process.env.HOST,
        port: Number(process.env.DATAPORT),
        database: process.env.TEST_DATANAME
    });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testPool.query("CREATE TABLE person (\n      id SERIAL PRIMARY KEY,\n      email VARCHAR (75) UNIQUE,\n      password VARCHAR(255),\n      name VARCHAR(255),\n      surname VARCHAR(255),\n      favorites JSON ARRAY,\n      homebar JSON ARRAY,\n      isActivated boolean,\n      tokenActivated boolean,\n      activatedCode VARCHAR(6));")];
                case 1:
                    _a.sent();
                    user = { name: 'Mike', surname: 'Dark', email: 'qwerty@gmail.com', password: 'qwertyqwert' };
                    return [4 /*yield*/, supertest_1["default"](index_1.app).post('/api/user/registration').send(user)];
                case 2:
                    res = _a.sent();
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
    it('should send code to email', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1["default"](index_1.app).post('/api/user/send-mail').send({ email: user.email })];
                case 1:
                    response = _a.sent();
                    expect(response.body).toBe("Send to " + user.email);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return error of invalid email', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest_1["default"](index_1.app).post('/api/user/send-mail').send({ email: '12' })];
                case 1:
                    response = _a.sent();
                    expect(response.body).toBe("Invalid value");
                    return [2 /*return*/];
            }
        });
    }); });
});