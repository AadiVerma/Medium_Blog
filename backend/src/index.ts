import { Hono } from "hono";
import { useRouter } from "./user";
import { blogRouter } from "./blog";
import {cors} from 'hono/cors';
const app= new Hono();
app.use('/api/*',cors());
app.route('/api/v1/user',useRouter);
app.route('api/v1/blog',blogRouter);

export default app;
