import app from "../server.js";
import cors from "cors";
app.use(cors({
    credentials: true, 
    origin: true, // Reflect the requests's origin
}));
export default app;

