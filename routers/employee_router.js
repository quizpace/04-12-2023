const express = require('express')
const router = express.Router()
const dal = require('../dals/dal')

// '/api/employee'
// GET 
router.get('/', async (request, response) => {
    const employees = await dal.get_all()
    response.json(employees)
})
// GET by ID
router.get('/:id', async (request, response) => {
    const user_id = parseInt(request.params.id)
    const user = await dal.get_by_id(user_id)
    if (user) {
        response.json(user)
    }
    else {
        response.status(404).json({ "error": `cannot find user with id ${user_id}` })
    }
})
// POST
router.post('/', async (request, response) => {
    const new_user = request.body
    const result = await dal.new_employee(new_user)
    response.status(201).json(result)
})
// PUT
router.put('/:id', async (request, response) => {
    const user_id = parseInt(request.params.id)
    const user = await dal.get_by_id(user_id)
    if (user) {
        // user exists ==> perform update
        const updated_user_req = request.body
        const result = await dal.update_emplyee(user_id, updated_user_req)
        response.json(updated_user_req)
    }
    else {
        // user does NOT exist ==> perform insert
        const new_user = request.body
        const result = await dal.new_employee(new_user)
        response.status(201).json(result)
    }
})
// PATCH
router.patch('/:id', async (request, response) => {
    const updated_user_req = request.body
    const user_id = parseInt(request.params.id)
    const user = await dal.get_by_id(user_id)
    // override only existing fields in the user from the db
    const result = await dal.update_emplyee(user_id, { ...user, ...updated_user_req })
    response.json({ result })

})

// DELETE
router.delete('/:id', async (request, response) => {
    const user_id = parseInt(request.params.id)
    const result = await dal.delete_employee(user_id)
    response.status(204).json({ result })

})

module.exports = router

