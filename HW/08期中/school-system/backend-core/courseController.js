const db = require('./db');

// 新增課程邏輯
exports.createCourse = async (req, res) => {
    const { course_name, capacity } = req.body;
    
    // 從剛才中間件傳過來的 req.user 拿到開課者的 ID (此處假設是管理員或教授)
    const teacher_id = req.user.id; 

    try {
        const result = await db.query(
            'INSERT INTO Courses (course_name, teacher_id, capacity) VALUES ($1, $2, $3) RETURNING *',
            [course_name, teacher_id, capacity]
        );

        res.status(201).json({
            message: '🎉 課程建立成功！',
            course: result.rows[0]
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '建立課程時伺服器出錯' });
    }
};