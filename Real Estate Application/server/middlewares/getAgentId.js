const Agent = require('../models/agent');

const getAgentIdMiddleware = async (req, res, next) => {
    const userId = req.user._id; 

    try {
        const agent = await Agent.findOne({ user: userId });

        if (!agent) {
            return res.status(404).json({ error: 'Agent not found' });
        }

        req.agentId = agent._id;
        next();
    } catch (error) {
        return res.status(500).send("Server Error");
    }
};

module.exports = getAgentIdMiddleware;
