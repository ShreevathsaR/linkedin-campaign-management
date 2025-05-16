import express from 'express'
import { generateMessage } from '../controllers/MessageGeneration'
const router = express.Router()

router.post('/', generateMessage)

export default router