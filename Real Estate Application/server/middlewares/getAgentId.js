const User = require('../models/user');
const Agent = require('../models/agent');

const getAgentIdMiddleware = async (req, res, next) => {
    const userEmail = req.body.userEmail;

    try {
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.type !== 'agent') {
            return res.status(400).json({ error: 'User is not an agent' });
        }

        const agent = await Agent.findOne({ user: user._id });

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
