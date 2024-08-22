import { Router } from 'express'
import { validateClassInput, validateIdParam } from '../middleware/validationMiddleware.js'

const router = Router()

import {getAllClasses, getSingleClass, editClass, addClass, deleteClass, showStats} from '../controllers/classControler.js'

router.route('/').get(getAllClasses).post(validateClassInput, addClass)
router.route('/stats').get(showStats)
router.route('/:id').get(validateIdParam, getSingleClass).patch(validateClassInput, validateIdParam, editClass).delete(validateIdParam, deleteClass)

export default router 