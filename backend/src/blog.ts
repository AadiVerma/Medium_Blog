import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify} from 'hono/jwt';
import { Hono } from "hono";
import {createBlogInput,updateBlogInput} from "@aadiverma/medium-common";
 export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
        JWT_SECRET:string,
	},
  Variables : {
    userId: string
	}
}>();
blogRouter.use('/*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(403);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload= await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(403);
		return c.json({ error: "unauthorized" });
	}
	c.set("userId", payload.id as string);
	await next()
})
blogRouter.get("/bulk", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs=await prisma.post.findMany(
      {
        select:{
          id:true,
          title: true,
          content:true,
          publishedTime:true,
          author:{
            select:{
              name:true
            }
          }
        }
      }
    );
    console.log(blogs);
    return c.json({blogs});  
  });
blogRouter.get("/:id", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const id = c.req.param("id");
    console.log(id);
   try{
    const blog=await prisma.post.findFirst({
        where:{
            id:id,
        },
        select:{
          id:true,
          title: true,
          content:true,
          publishedTime:true,
          author:{
            select:{
              name:true
            }
          }
        }
    })
  return c.json({blog});
   }catch(err){
    c.status(411);
    return c.json({ error: "error while fetching" });
   }
});
blogRouter.post("/", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const {success}=createBlogInput.safeParse(body);
    if(!success){
      c.status(403);
        return c.json({ error: "invalid blog input" });
    }
    const blog=await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: c.get('userId') as string,
        }
    })
  return c.json({
    id:blog.id
  });
});

blogRouter.put("/", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const {success}=updateBlogInput.safeParse(body);
    if(!success){
      c.status(403);
        return c.json({ error: "invalid blog input" });
    }
    const blog=await prisma.post.update({
        where:{
            id: body.id,
        },
        data:{
            title: body.title,
            content: body.content,
        }
    })
  return c.json({
    id:blog.id
  });
});

