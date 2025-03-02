import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt';
import { Hono } from "hono";
import { signupInput ,signinInput} from '@aadiverma/medium-common';
 export const useRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string,
    userId:string
	},
  Variables : {
		userId: string
	}
}>();
useRouter.post("signup", async(c) => {
    const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());
      const body = await c.req.json();
      const {success}=signupInput.safeParse(body);
      if(!success) {
        c.status(403);
        return c.json({ error: "invalid signup input" });
      }
      try {
          const user = await prisma.user.create({
              data: {
                  email: body.email,
                  password: body.password,
                  name:body.name
              }
          });
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
          return c.json({ jwt });
      } catch(e) {
          c.status(403);
          return c.json({ error: "error while signing up" });
      }
  });
  useRouter.post("signin", async(c) => {
    const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());
    const body = await c.req.json();
    const {success}=signinInput.safeParse(body);
      if(!success) {
        c.status(403);
        return c.json({ error: "invalid signin input" });
      }
    try {
      const user =await prisma.user.findUnique({
       where:{
         email: body.email,
         password: body.password
       }
      });
      if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
      }
      const name=user.name || "";
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
          return c.json({ jwt,name});
    } catch (error) {
      c.status(403);
          return c.json({ error: "error while signing In" });
    }
  });