import prisma from "../../db";
import { createJWT, hashPassword, passwordCompare } from "../modules/auth";

export const createUser = async (req , res) => {

     const user = await prisma.user.create({
         data: {
             username : req.body.username,
             password: await hashPassword(req.body.password)
         }
     })
   const token = createJWT(user)
    res.json({token})

 }

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username
    }
  })

  const isValid = await passwordCompare(req.body.password, user.password)

  if (!isValid) {
    res.status(401)
    res.json({message: 'nope'})
    return
  }

  const token = createJWT(user)
  res.json({ token })
}

// export const signin = async (req , res) => {
//     const user = await prisma.user.findUnique({
//         where: req.body.username
//     })

//     const validPassword = await passwordCompare(req.body.password , user.password)

//     if (!validPassword){
//         res.status(401)
//         res.send('invalid username or password')
//         return
//     }

//     const token = createJWT(user)
//     res.json({token})

// }