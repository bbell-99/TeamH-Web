const express = require('express')
const router = express.Router()
const dbConn = require('./dbConn')

// Add your routes here - above the module.exports line

router.get('/emps', async (req, res) => {
	res.render('emps', { emps: await dbConn.getEmps() })
})

module.exports = router
