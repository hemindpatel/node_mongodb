// middleware for authentication
var authenticate = async function authorize(req, res, next) {
    const apiToken = req.headers['x-api-token'];

    // set user on-success
    req.user = await req.db.users.findByApiKey(apiToken);

    // always continue to next middleware
    next();
}

module.exports={authenticate};