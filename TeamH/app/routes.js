const express = require('express')
const router = express.Router()
const dbConn = require('./dbConn')

// Add your routes here - above the module.exports line

router.get('/emps', async(req, res) => {
    res.render('emps', { emps: await dbConn.getEmps() })
})

router.get('/newemp', async(req, res) => {
    res.render('newemp')
})

router.get('/empdepartment', async(req, res) => {
    res.render('empdepartment', {
        salesemps: await dbConn.getSalesEmps(),
        techemps: await dbConn.getTechEmps(),
    })
})

router.post('/newemp', async(req, res) => {
    const emp = req.body
    console.log(emp)
    if (emp.nin.search(/^\s*[a-zA-Z]{2}(?:\s*\d\s*){6}[a-zA-Z]?\s*$/)) {
        res.locals.errormessage =
            'NIN must begin with 2 letters and be no longer than 9 characters'
        res.render('newemp', req.body)
        console.log('nin error')
    } else if (emp.ban.search(/^[0-9]{8}$/)) {
        res.locals.errormessage = 'BAN must be only numbers and 8 numbers long'
        res.render('newemp', req.body)
    } else if (emp.sortcode.search(/^[0-9]{6}$/)) {
        res.locals.errormessage = 'Sortcode must be only numbers and 6 numbers long'
        res.render('newemp', req.body)
    } else if (emp.salary.search(/^[0-9]\d{4,}$/)) {
        res.locals.errormessage =
            'Salary must be only numbers and atleast 5 numbers long'
        res.render('newemp', req.body)
    } else {
        let insertedKey = await dbConn.newEmp(emp)
        res.render('emps', { emps: await dbConn.getEmps() })
    }
})


router.post("/newsalesemp", async(req, res) => {
    const emp = req.body;
    console.log(emp);
    if (emp.commission_rate.search(/^\d*\.?\d*$/)) {
        res.render("newsalesemp", { emps: await dbConn.getEmps(), errormessage: "Commission rate must be numerical" });
    } else if (emp.total_sales_value.search(/^\d*\.?\d*$/)) {
        res.render("newsalesemp", { emps: await dbConn.getEmps(), errormessage: "Total sales must be numerical" });
    } else {
        let insertedKey = await dbConn.newSalesEmp(emp);
        res.render("newsalesemp", { emps: await dbConn.getEmps(), salesempadded: "Sales employee added" });
    }
});

router.get("/newsalesemp", async(req, res) => {
    const emp = req.body;
    console.log(emp);
    res.render("newsalesemp", { emps: await dbConn.getEmps() });
});

router.get('/grosspay', async(req, res) => {
    res.render('grosspay', {
        empsgrosspay: await dbConn.getEmpGrossPay()
    })
})

router.get('/highestsales', async(req, res) => {
    res.render('highestsales', {
        highestsalesemp: await dbConn.getEmpHighestSales()
    })
})

module.exports = router