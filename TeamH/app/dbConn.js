const mysql = require('mysql')
const dbconfig = require('../../dbconfig.json')
const util = require('util')
const db = wrapDB(dbconfig)

function wrapDB(dbconfig) {
    const pool = mysql.createPool(dbconfig)
    return {
        query(sql, args) {
            console.log('in query in wrapper')
            return util.promisify(pool.query).call(pool, sql, args)
        },
        release() {
            return util.promisify(pool.releaseConnection).call(pool)
        },
    }
}

exports.getEmps = async() => {
    const data = await db.query(
        'SELECT emp_id AS `ID`, emp_name AS `Name` FROM Employee'
    )
    console.log(data)
    return data
}

exports.getSalesEmps = async() => {
    const data = await db.query(
        'SELECT s.emp_id AS `ID`, e.emp_name AS `Name`, e.address AS `Address`, e.nin as `NIN`, e.ban AS `BAN`, e.sortcode AS `Sortcode`, e.Salary AS `Salary`, s.commission_rate as `CommissionRate`, s.total_sales_value AS `TotalSalesValues` FROM Sales_Employee s JOIN Employee e WHERE s.emp_id = e.emp_id'
    )
    console.log(data)
    return data
}

exports.getTechEmps = async() => {
    const data = await db.query(
        'SELECT t.emp_id AS `ID`, e.emp_name AS `Name`, e.address AS `Address`, e.nin as `NIN`, e.ban AS `BAN`, e.sortcode AS `Sortcode`, e.Salary AS `Salary`, t.cv, t.photo FROM Technical_Employee t JOIN Employee e WHERE t.emp_id = e.emp_id'
    )
    console.log(data)
    return data
}

exports.newEmp = async(newEmp) => {
    let results = await db.query('INSERT INTO Employee SET ?', newEmp)
    return results.insertId
}

exports.newSalesEmp = async(newEmp) => {
    let results = await db.query('INSERT INTO Sales_Employee SET ?', newEmp)
    return results.insertId
}

exports.getEmpGrossPay = async() => {
    const data = await db.query(
        'SELECT emp_id AS `ID`, emp_name AS `Name`, gross_pay AS `GrossPay` FROM `Gross Pay` Order By emp_id;')
    console.log(data)
    return data
}

exports.getEmpHighestSales = async() => {
    const data = await db.query(
        'SELECT emp_name AS `Name`, total_sales_value AS `TotalSales` FROM `Highest Sales`;')
    console.log(data)
    return data
}

exports.getNonSalesEmps = async() => {
    const data = await db.query(
        'SELECT emp_id AS `ID`, emp_name AS `Name` FROM Employee WHERE emp_id NOT IN (SELECT emp_id FROM Sales_Employee)'
    )
    console.log(data)
    return data
}