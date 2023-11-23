const express = require('express');
const mysql = require('mysql');
const {v4: uuidv4} = require('uuid');
const Joi = require('joi');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'technicalexam',
});

db.connect((err) => {
	if (err) {
		console.log('MySQL connection error: ', err);
	} else {
		console.log('MySQL connected!');
	}
});

const app = express();
app.use(express.json());

// table_1

// Schema
const tableOneSchema = Joi.object().keys({
	idea_summary: Joi.string().label("Idea summary").required(),
	posted_by: Joi.string().label("UUID").required()
});

const tableOneSchemaNotRequired = Joi.object().keys({
	idea_summary: Joi.string().label("Idea summary"),
	posted_by: Joi.string().label("UUID")
});

// GET
app.get('/table_1', (req, res) => {
	try {
		const sql = 'SELECT table_1.id, idea_summary, user_first_name, user_last_name FROM table_1 INNER JOIN table_2 ON table_1.posted_by = table_2.id';

		db.query(sql, (err, result) => {
			if (err) {
				console.error(err);
				return res.status(500).send('Internal Server Error');
			} else {
				return res.status(200).json(result);
			}
		});
	} catch (err) {
		const er = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));

		return res.status(500).send(er);
	}
});

// POST
app.post('/table_1', (req, res) => {
	try {
		const params = tableOneSchema.validate(req.body);

		if (params.hasOwnProperty("error")) {
			return res.status(500).send('Validation Error');
		};

		const {
			idea_summary,
			posted_by
		} = req.body;
		const id = uuidv4();
		const sql = 'INSERT INTO table_1 (id, idea_summary, posted_by) VALUES (?, ?, ?)';

		db.query(sql, [id, idea_summary, posted_by], (err, result) => {
			if (err) {
				console.error(err);
				return res.status(500).send('Internal Server Error');
			} else {
				return res.status(200).json({
					id,
					idea_summary,
					posted_by
				});
			}
		});
	} catch (err) {
		const er = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));

		return res.status(500).send(er);
	}
});

// PUT
app.put('/table_1/:id', (req, res) => {
	try {
		const params = tableOneSchemaNotRequired.validate(req.body);

		if (params.hasOwnProperty("error")) {
			return res.status(500).send('Validation Error');
		};

		const {
			idea_summary,
			posted_by
		} = req.body;
		const id = req.params.id;
		const sql = 'UPDATE table_1 SET idea_summary = ?, posted_by = ? WHERE id = ?';
		db.query(sql, [idea_summary, posted_by, id], (err, result) => {
			if (err) {
				console.error(err);
				return res.status(500).send('Internal Server Error');
			} else {
				return res.status(200).json({
					id,
					idea_summary,
					posted_by
				});
			}
		});
	} catch (err) {
		const er = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));

		return res.status(500).send(er);
	}
});

// DELETE
app.delete('/table_1/:id', (req, res) => {
	try {
		const id = req.params.id;
		const sql = 'DELETE FROM table_1 WHERE id = ?';
		db.query(sql, [id], (err, result) => {
			if (err) {
				console.error(err);
				return res.status(500).send('Internal Server Error');
			} else {
				return res.status(200).send();
			}
		});
	} catch (err) {
		const er = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));

		return res.status(500).send(er);
	}
});

// table_2

// Schema
const tableTwoSchema = Joi.object().keys({
	user_first_name: Joi.string().label("User first name").required(),
	user_last_name: Joi.string().label("User last name").required()
});

const tableTwoSchemaNotRequired = Joi.object().keys({
	user_first_name: Joi.string().label("User first name"),
	user_last_name: Joi.string().label("User last name")
});

// GET
app.get('/table_2', (req, res) => {
	try {
		const sql = 'SELECT * FROM table_2';
		db.query(sql, (err, result) => {
			if (err) {
				console.error(err);
				return res.status(500).send('Internal Server Error');
			} else {
				return res.status(200).json(result);
			}
		});
	} catch (err) {
		const er = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));

		return res.status(500).send(er);
	}
});

// POST
app.post('/table_2', (req, res) => {
	try {
		const params = tableTwoSchema.validate(req.body);

		if (params.hasOwnProperty("error")) {
			return res.status(500).send('Validation Error');
		};

		const {
			user_first_name,
			user_last_name
		} = req.body;
		const id = uuidv4();
		const sql = 'INSERT INTO table_2 (id, user_first_name, user_last_name) VALUES (?, ?, ?)';
		db.query(sql, [id, user_first_name, user_last_name], (err, result) => {
			if (err) {
				console.error(err);
				return res.status(500).send('Internal Server Error');
			} else {
				return res.status(200).json({
					id,
					user_first_name,
					user_last_name
				});
			}
		});
	} catch {
		const er = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));

		return res.status(500).send(er);
	}
});

// PUT
app.put('/table_2/:id', (req, res) => {
	try {
		const params = tableTwoSchemaNotRequired.validate(req.body);

		if (params.hasOwnProperty("error")) {
			return res.status(500).send('Validation Error');
		};

		const {
			user_first_name,
			user_last_name
		} = req.body;
		const id = req.params.id;
		const sql = 'UPDATE table_2 SET user_first_name = ?, user_last_name = ? WHERE id = ?';
		db.query(sql, [user_first_name, user_last_name, id], (err, result) => {
			if (err) {
				console.error(err);
				return res.status(500).send('Internal Server Error');
			} else {
				return res.status(200).json({
					id,
					user_first_name,
					user_last_name
				});
			}
		});
	} catch (err) {
		const er = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));

		return res.status(500).send(er);
	}
});

// DELETE
app.delete('/table_2/:id', (req, res) => {
	try {
		const id = req.params.id;
		const sql = 'DELETE FROM table_2 WHERE id = ?';
		db.query(sql, [id], (err, result) => {
			if (err) {
				console.error(err);
				return res.status(500).send('Internal Server Error');
			} else {
				return res.status(200).send();
			}
		});
	} catch (err) {
		const er = JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));

		return res.status(500).send(er);
	}
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});