//라우터 정의

const express = require('express');
const router = express.Router();
const taskApi = require('./task.api');

router.use('/tasks',taskApi); // tasks 요청이 오면 taskApi로 넘어감

module.exports = router; // 라우터를 쓰게 해줌.