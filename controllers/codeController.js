// controllers/codeController.js
import CodeModel from '../models/code.model.js';
import generateCode from '../utils/GenrateCode.js';  
import { ApiError } from '../utils/ApiError.js';

const generateNewCode = async () => {
    try {
        const newCode = new CodeModel({ value: generateCode() });
        await newCode.save();
        return newCode.value;
    } catch (error) {
        console.error('Error generating code:', error);
        throw new ApiError(401, "Invalid user credentials");
    }
};

const useCode = async (code) => {
    try {
        // Your existing code for using a code
    } catch (error) {
        console.error('Error using code:', error);
        throw new ApiError(401, "Invalid user credentials");
    }
};

export { generateNewCode, useCode };
