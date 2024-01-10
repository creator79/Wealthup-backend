// models/CodeModel.js
import mongoose from 'mongoose';

// const codeSchema = new mongoose.Schema({
//     value: String,
//     createdAt: { type: Date, expires: 60, default: Date.now },
//     used: { type: Boolean, default: false },
// });

// const CodeModel = mongoose.model('Code', codeSchema);

const codeSchema = new mongoose.Schema({

        value: {
          type: String,
          unique: true,
        },
    
        used: {
          type: Boolean,
          default: false,
        },
        expired: {
          type: Boolean,
          default: false,
        },
        date: {
          type: Date,
          default: Date.now,
        },
       
      }
      ,{ expires: 100 });


const CodeModel = mongoose.model('Code', codeSchema);





export default CodeModel;
