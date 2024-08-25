const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());


const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');
    }
});


db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL
)`);


db.run(`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id)
)`);


app.get('/posts', (req, res) => {
    db.all('SELECT * FROM posts', [], (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({posts: rows});
    });
});


app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM posts WHERE id = ?', [id], (err, post) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        if (!post) {
            res.status(404).json({error: 'Post not found'});
            return;
        }

        db.all('SELECT * FROM comments WHERE post_id = ?', [id], (err, comments) => {
            if (err) {
                res.status(500).json({error: err.message});
                return;
            }
            res.json({post, comments});
        });
    });
});


app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400).json({error: 'Title and content are required'});
        return;
    }
    const excerpt = content.substring(0, 100) + '...';
    const sql = 'INSERT INTO posts (title, content, excerpt) VALUES (?, ?, ?)';
    db.run(sql, [title, content, excerpt], function(err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.status(201).json({post: {id: this.lastID, title, content, excerpt}});
    });
});


app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400).json({error: 'Title and content are required'});
        return;
    }
    const excerpt = content.substring(0, 100) + '...';
    const sql = 'UPDATE posts SET title = ?, content = ?, excerpt = ? WHERE id = ?';
    db.run(sql, [title, content, excerpt, id], function(err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({error: 'Post not found'});
            return;
        }
        res.json({post: {id, title, content, excerpt}});
    });
});

app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM posts WHERE id = ?', id, function(err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({error: 'Post not found'});
            return;
        }
        res.status(204).end();
    });
});


app.get('/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    db.all('SELECT * FROM comments WHERE post_id = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({comments: rows});
    });
});


app.post('/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) {
        res.status(400).json({error: 'Content is required'});
        return;
    }
    const sql = 'INSERT INTO comments (post_id, content) VALUES (?, ?)';
    db.run(sql, [id, content], function(err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.status(201).json({comment: {id: this.lastID, post_id: id, content}});
    });
});


app.put('/comments/:id', (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) {
        res.status(400).json({error: 'Content is required'});
        return;
    }
    const sql = 'UPDATE comments SET content = ? WHERE id = ?';
    db.run(sql, [content, id], function(err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({error: 'Comment not found'});
            return;
        }
        res.json({comment: {id, content}});
    });
});


app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM comments WHERE id = ?', id, function(err) {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({error: 'Comment not found'});
            return;
        }
        res.status(204).end();
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
