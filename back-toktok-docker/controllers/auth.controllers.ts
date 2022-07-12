import { Response, Request } from "express";
import User from "../models/Usuario";
import bcrypt from "bcryptjs";
import { generateJWT } from "../helpers/jwt";

export const createUser = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  let rol = "";
  if (email == "xenialab@ingogroup.com") {
    rol = "admin";
  } else {
    rol = "user";
  }

  let payload = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    rol: rol,
  };

  try {
    const usuario = await User.findOne({ email: email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "The email already exists",
      });
    }

    const dbUser = new User(payload);

    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);

    const token = await generateJWT(dbUser.id, name, email, rol);

    await dbUser.save();
    return res.status(201).json({
      ok: true,
      uid: dbUser.id,
      name,
      email,
      token,
      rol,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Talk to the administrator",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const dbUser = await User.findOne({ email });
    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        msg: "The mail does not exist",
      });
    }

    const validPassword = bcrypt.compareSync(password, dbUser.password!);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "The password is not valid",
      });
    }
    const token = await generateJWT(
      dbUser.id,
      dbUser.name,
      dbUser.email,
      dbUser.rol
    );

    return res.json({
      ok: true,
      uid: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      msg: "Talk to the administrator",
    });
  }
};

export const revalidateToken = async (req: Request, res: Response) => {
  const uid = (req.body as { uid: string }).uid;
  const name = (req.body as { name: string }).name;
  const email = (req.body as { email: string }).email;
  const rol = (req.body as { rol: string }).rol;

  const token = await generateJWT(uid, name, email, rol);

  return res.json({
    ok: true,
    uid,
    name,
    email,
    token,
    rol,
  });
};

export default {
  createUser,
  loginUser,
  revalidateToken,
};
