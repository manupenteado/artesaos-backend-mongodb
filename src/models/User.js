import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true
    
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['artesan', 'visitante'],
    default: 'visitante'
  }
});

export default mongoose.model('User', userSchema);
