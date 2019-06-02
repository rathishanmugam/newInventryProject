const Purchase = require('../../models/purchase')
const mongoose = require('mongoose')

// Get all purchase from database
module.exports = function (router) {
    router.get('/purchase', function (req, res) {
        Purchase.find().exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding purchase',
                    error: err
                }))
    })

    // get specific purchase from database
    router.get('/purchase/:purchaseNo', function (req, res) {
        Purchase.findById(req.params.purchaseNo).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding purchase',
                    error: err
                }))
    })

    // get specific date  purchase from database
    router.get('/purchase/:year/:month/:day', function (req, res) {
        // const userId = req.get('purchaseNo')
        const month = req.params.month - 1 // JS months are zero-based
        const year = req.params.year
        const day1 = req.params.day

        const startDt = new Date(Date.UTC(year, month, day1, 0, 0, 0))
        const endDt = new Date(Date.UTC(year, month + 1, day1, 0, 0, 0))
        console.log('the requested body is', req.body)

        const qry = {
            // purchaseNo: userId,
            purchaseDate: {
                $gte: startDt,
                $lte: endDt
            }
        }
console.log('the query is' ,qry)
        Purchase.find(qry)
            .sort({ 'customerName': 1 })
            .exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'Error finding purchase for the date',
                    error: err
                }))
    })


    // Create new purchase document...
    router.post('/purchase', function (req, res) {
        let transaction = new Purchase(req.body)
        transaction.save(function (err, transaction) {
            if (err) return console.log(err)
            res.status(200).json(transaction)
            console.log('the saving record is :' , res)

        })
    })
    // Update purchase document...
    router.put('/purchase/:purchaseNo', function (req, res) {
        console.log(req.body)
        let qry = { purchaseNo: req.params.purchaseNo }
        let doc = {
            productId: req.body.productId,
            customerName: req.body.customerName,
            purchaseItem: req.body.purchaseItem,
            purchaseNo: req.body.purchaseNo,
            quantity: req.body.quantity,
            rate: req.body.rate,
            offer: req.body.offer,
            // paymentType: req.body.paymentType,
            paid: req.body.paid,
            purchaseDate: req.body.purchaseDate
        }
        console.log('the updating record is :' , doc)
        Purchase.updateOne(qry, doc, function (err, respRaw) {
            if (err) return console.log(err)
            res.status(200).json(respRaw)
        })
    })

    // delete purchase from database
    router.delete('/purchase/:purchaseNo', function (req, res) {
        console.log(req.body)
        let qry = { purchaseNo: req.params.purchaseNo }
        Purchase.remove(qry,  function (err, respRaw) {
            if (err) return console.log(err)
            res.status(200).json(respRaw)
        })
    })
}
