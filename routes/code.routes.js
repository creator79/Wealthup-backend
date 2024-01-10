// routes/codeRoutes.js
import express from 'express';
import { generateNewCode } from '../controllers/codeController.js';
import Code from '../models/code.model.js';

const router = express.Router();

router.get('/api/v1/codes', async (req, res) => {
    try {
        const newCode = await generateNewCode();
        res.json({ code: newCode });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// router.post('/api/v1/codes/use', async (req, res) => {
//     const { code } = req.body;

//     try {
//         // Check if the code is valid (contains alphabets and numbers with a length between 5 and 6 characters)
//         const isValidCode = /^[a-zA-Z0-9]{5,6}$/.test(code);

//         if (!isValidCode) {
//             return res.status(400).json({ error: 'Enter a valid code' });
//         }

//         // Check if the code exists in the database
//         const codeExists = await CodeModel.findOne({ value: code });

//         if (codeExists) {
//             // Check if the code has already been used
//             if (codeExists.used) {
//                 return res.status(400).json({ error: 'This code has already been used' });
//             }


//             // Mark the code as used in the database
//             await CodeModel.findOneAndUpdate({ value: code }, { used: true });

//             // Continue with any other actions you want to perform after a successful code usage

//             res.json({ success: true });
//         } else {
//             return res.status(400).json({ error: 'Code will expire' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });




router.post('/api/v1/codes/use', async (req, res) => {
    try {
        const { code } = req.body;

        const existingCode = await Code.findOne({ value: code });
        // Check if the code is valid
        if (!/^[a-zA-Z0-9]{5,6}$/.test(code)) {
            return res.status(400).json({ error: 'Enter a valid code' });
        }



        if (!existingCode) {
            return res.status(400).json({ error: 'Incorrect code' });
        }


        if (!existingCode.expired) {

            const date = new Date(existingCode.date);
            const currentDate = new Date();
            const diff = currentDate - date;
            const seconds = Math.floor(diff / 1000);
            if (seconds > 60) {
                existingCode.expired = true;
            }


            await existingCode.save();
            console.log(seconds);
        }

        if (existingCode.expired) {
            return res.status(400).json({ error: 'Code has expired' });
        }

        if (existingCode.used) {
            return res.status(400).json({ error: 'This code has already been used' });
        }










        // Mark the code as used
        existingCode.used = true;
        // existingCode.expired = true;
        await existingCode.save();

        // Return success message
        return res.json({ message: 'Code is correct' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});






export default router;
