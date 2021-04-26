const {roles} = require('../mongo/schemas/user');

exports.clientMiddleware = (req, res, next) => {
    if (roles.includes(req.user.role)){
        throw new Error(`Invalid userRole ${req.user.role}`);
    }
    if (!req.user.role !== 'CLIENT') {
        throw new Error(`You are not an authorized role`);
    }
    next();
}
exports.providerMiddleware = (req, res, next) => {
    if (roles.includes(req.user.role)){
        throw new Error(`Invalid userRole ${req.user.role}`);
    }
    if (!req.user.role !== 'PROVIDER') {
        throw new Error(`You are not an authorized role`);
    }
    next();
}

// * req.hasPermission = true;