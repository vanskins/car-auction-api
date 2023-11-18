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

// GET all users
export const getUsers = () => User.find();
// GET user by id
export const getUserById = (_id: string) => User.findById(_id);
// GET user by email
export const getUserBySessionToken = (sessionToken: string) => User.findOne({
  'authentication.sessionToken': sessionToken
});
export const getUserByEmail = (email: string) => User.findOne({ email });
// Delete user by id
export const deleteUserById = (_id: string) => User.findByIdAndDelete(_id);
// Create new user
export const createNewUSer = (values: Record<string, any>) => new User(values).save().then((user: any) => user.toObject())
// Update user
export const updateUserById = (_id: string, values: Record<string, any>) => User.findByIdAndUpdate(_id, values);

export default User;