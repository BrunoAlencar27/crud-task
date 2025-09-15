import express from 'express';
const route = express.Router();

route.get('/user',userController.home);