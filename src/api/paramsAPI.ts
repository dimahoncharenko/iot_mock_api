import { Router } from "express";

import { MockService } from "../services/MockService";

const router = Router();
const mock = MockService.prototype.instance();

router.post("/temperature/adjust", (req, res) => {
    const { temp } = req.body;

    console.log("Current temp:", temp)

    mock.adjustTemperature(temp);

    return true;
});

export default router;