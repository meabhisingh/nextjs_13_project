import { checkAuth, connectDB } from "../../utils/features";
import { Task } from "../../models/task";
import { asyncError, errorHandler } from "../../middlewares/error";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "Only GET Method is allowed");
  await connectDB();

  const user = await checkAuth(req);

  if (!user) return errorHandler(res, 401, "Login First");

  const tasks = await Task.find({ user: user._id });

  res.json({
    success: true,
    tasks,
  });
});

export default handler;
