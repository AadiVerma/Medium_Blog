import { Hono } from "hono";
import { useRouter } from "./user";
import { blogRouter } from "./blog";
const app= new Hono();
app.route('/api/v1/user',useRouter);
app.route('api/v1/blog',blogRouter);

export default app;
