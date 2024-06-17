import { body, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
    const errors = validationResult(req);

    const errorMessages = errors.array().map((error) => error.msg).join(", ");


    if (errors.isEmpty()) return next();
    else next(new ErrorHandler(errorMessages, 400));
};

const registerValidator = () => [
    body("name", "Please Enter Name").notEmpty(),
    body("username", "Please Enter Username").notEmpty(),
    body("bio", "Please Enter Bio").notEmpty(),
    body("password", "Please Enter Password").notEmpty(),
];

const loginValidator = () => [
    body("username", "Please Enter Username").notEmpty(),
    body("password", "Please Enter Password").notEmpty(),
];

const newGroupValidator = () => [
    body("name", "Please Enter Name").notEmpty(),
    body("members")
        .notEmpty()
        .withMessage("Please Enter Members")
        .isArray({ min: 2, max: 100 })
        .withMessage("Members must be between 2 and 100"),
];

const addMemberValidator = () => [
    body("chatId", "Please Enter Chat ID").notEmpty(),
    body("members")
        .notEmpty()
        .withMessage("Please Enter Members")
        .isArray({ min: 1, max: 97 })
        .withMessage("Members must be between 1 and 97"),
];

const removeMemberValidator = () => [
    body("chatId", "Please Enter Chat ID").notEmpty(),
    body("chatId", "Please Enter User ID").notEmpty(),
];

const sendAttachmentsValidator = () => [
    body("chatId", "Please Enter Chat ID").notEmpty(),
];

const chatIdValidator = () => [
    param("id", "Please Enter Chat ID").notEmpty(),
];

const renameValidator = () => [
    param("id", "Please Enter Chat ID").notEmpty(),
    body("name", "Please Enter New Name").notEmpty(),
];

const sendRequestValidator = () => [
    body("userId", "Please Enter UserId").notEmpty(),
];

const acceptRequestValidator = () => [
    body("requestId", "Please Enter Request Id").notEmpty(),
    body("accept", "Please Add Accept")
        .notEmpty()
        .withMessage("Please Add Accept")
        .isBoolean()
        .withMessage("Accept must be a boolean"),
];

const adminLoginValidator = () => [
    body("secretKey", "Please Enter Secret Key").notEmpty(),
];


export {
    acceptRequestValidator,
    addMemberValidator,
    adminLoginValidator,
    chatIdValidator,
    loginValidator,
    newGroupValidator,
    registerValidator,
    removeMemberValidator,
    renameValidator,
    sendAttachmentsValidator,
    sendRequestValidator,
    validateHandler
};
