import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already existed!'],
    required: [true, 'Email is required!'],
  },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, required: true, select: false },
    sessionToken: { type: String, select: false }
  },
  firstName: {
    type: String,
    required: [true, 'First name is required!']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required!']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required!']
  },
  roles: {
    type: [],
    default: ['user']
  }
}, { timestamps: true })

const User = models.User || model("User", UserSchema)

export default User;