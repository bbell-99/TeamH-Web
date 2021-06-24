const express = require('express')
const router = express.Router()
const dbConn = require('./dbConn')

// Add your routes here - above the module.exports line

router.get('/emps', async (req, res) => {
	res.render('emps', { emps: await dbConn.getEmps() })
})

router.get('/newemp', async (req, res) => {
	res.render('newemp')
})

router.post('/newemp', async (req, res) => {
	const emp = req.body
	console.log(emp)
	if (!emp) {
		console.log('emp empty')
	} else {
		let insertedKey = await dbConn.newEmp(emp)
		res.render('emps', { emps: await dbConn.getEmps() })
	}
})

module.exports = router
