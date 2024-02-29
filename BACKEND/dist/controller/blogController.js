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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.patchBlogById = exports.fetchBlogByUserIdAndBlogId = exports.fetchBlogById = exports.fetchBlog = exports.createBlog = void 0;
const blogModel_1 = __importDefault(require("../models/blogModel"));
//create blog
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blogModel_1.default.create(req.body);
        res.status(200).json(blogs);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.createBlog = createBlog;
//fetch all blog
const fetchBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blogModel_1.default.find({});
        res.status(200).json(blogs);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.fetchBlog = fetchBlog;
//fetch blog by id
const fetchBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield blogModel_1.default.findById(id);
        res.status(200).json(blog);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.fetchBlogById = fetchBlogById;
//fetch blog by user id and blog id
const fetchBlogByUserIdAndBlogId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { u_id } = req.params;
        const { b_id } = req.params;
        const blog = yield blogModel_1.default.findOne({ u_id: u_id, _id: b_id }, req.body);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found for the specified userID and blogID' });
        }
        res.status(200).json(blog);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.fetchBlogByUserIdAndBlogId = fetchBlogByUserIdAndBlogId;
//patch blog by id
const patchBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield blogModel_1.default.updateOne({ _id: id }, req.body);
        if (!blog) {
            return res.status(404).json({ message: `Cannot find any user with ID${id}` });
        }
        res.status(200).json(blog);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.patchBlogById = patchBlogById;
//Delete blog by id
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blog = yield blogModel_1.default.deleteOne({ _id: id });
        if (blog.deletedCount === 0) {
            return res.status(404).json({ message: `cannot find any category with ID ${id}` });
        }
        res.status(200).json(blog);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteBlog = deleteBlog;
