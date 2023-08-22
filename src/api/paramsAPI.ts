import { Router } from "express";

import { MockService } from "../services/MockService";

const router = Router();
const mock = MockService.prototype.instance();

router.post("/temperature/adjust", (req, res) => {
    const { temp } = req.body;
    console.log("DD");
    mock.adjustTemperature(temp);

    return true;
});

router.get("/", (_, res) => {
    res.json({ ...mock.getAllParams() })
});

export default router;