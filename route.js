var express = require('express');
var router = express.Router();
var user = require('./users');

router.post('/create', (req, res, next) => {
	const UNINUM = Math.floor(Math.random() * Math.floor(1234567890));
	let newuser = new user({
		userName: req.body.request.firstName + UNINUM,
		firstName: req.body.request.firstName,
		lastName: req.body.request.lastName,
		email: req.body.request.email,
		password: req.body.request.password,
	});
	user
		.find({ email: req.body.request.email })
		.then(doc => {
			if (doc.length > 0) {
				res.status(400).json({ errMsg: 'EmailId is already present' });
			} else next();
		})
		.catch(err => {
			res.status(err.status || 500);
			res.json({ errMsg: err.message });
		});
	newuser
		.save()
		.then(doc => {
			res.status(200);
			res.json({ user: doc, msg: 'User created successfully' });
		})
		.catch(err => {
			res.status(err.status || 500);
			res.json({ errMsg: err.message });
		});
});

router.patch('/update/:id', (req, res, next) => {
	const updateUser = {
		firstName: req.body.request.firstName,
		lastName: req.body.request.lastName,
		email: req.body.request.email,
		password: req.body.request.password,
	};

	user
		.findOneAndUpdate(
			{
				_id: req.params.id,
			},
			{
				$set: updateUser,
			}
		)
		.then(doc => {
			if (!!user) {
				res.status(404).json({ user: doc, errMsg: 'User Not Found' });
			}
			res.json({ user: doc, msg: 'User updated successfully' });
		})
		.catch(err => {
			res.status(err.status || 500);
			res.json({ errMsg: err.message });
		});
});

router.delete('/delete/:id', (req, res, next) => {
	user
		.deleteOne({ _id: req.params.id })
		.then(doc => {
			if (doc.deletedCount === 0) {
				res.status(404);
				res.json({ user: doc, errMsg: 'User is not present' });
			}
			res.json({ user: doc, msg: 'User deleted successfully' });
		})
		.catch(err => {
			res.status(err.status || 500);
			res.json({ errMsg: err.message });
		});
});

router.get('/userId/:id', (req, res, next) => {
	user
		.findById(req.params.id)
		.then(doc => {
			return res.status(200).json({ user: doc, msg: 'User found Successfully' });
		})
		.catch(err => {
			res.status(err.status || 500);
			res.json({errMsg: err.message });
		});
});
router.get('/username/:username', (req, res, next) => {
	console.log(req.params.username);
	user
		.find({ userName: req.params.username })
		.then(doc => {
			if (doc.length === 0) {
				res.status(404).json({ user: doc, errMsg: 'User Not Found' });
			} else {
				res.json({ user: doc, msg: `User Found with userId : ${req.params.username}` });
			}
		})
		.catch(err => {
			res.status(err.status || 500);
			res.json({ errMsg: err.message });
		});
});
router.get('/all', (req, res, next) => {
	user
		.find()
		.then(list => {
			if (list.length === 0) {
				res.status(404);
				res.json({ user: list, errMsg: 'Users are not present' });
			}
			res.status(200);
			res.json({ userList: list, msg: 'List Of Users' });
		})
		.catch(err => {
			res.status(err.status || 500);
			res.json({ errMsg: err.message });
		});
});
router.delete('/all', (req, res, next) => {
	console.log('deleteeeee');
	user
		.deleteMany({})
		.then(deletedList => {
			if (deletedList.deletedCount === 0) {
				res.status(404);
				res.json({ user: deletedList, errMsg: 'No Users to delete' });
			}
			res.json({ user: deletedList, msg: 'All Users deleted successfully' });
		})
		.catch(err => {
			res.status(err.status || 500);
			res.json({ errMsg: err.message });
        });
});
router.post('/signin', (req, res, next) => {
	user
		.findOne({userName: req.body.request.userName, password: req.body.request.password})
		.then(doc => {
			if (!!user) {
				res.status(404);
				res.json({user:doc, errMsg: 'No Users Found' });
			}
			res.json({ user: doc, msg: 'User Signed in successfully' });
		})
		.catch(err => {
			res.status(err.status || 500);
			res.json({ errMsg: err.message });
        });
});
module.exports = router;
