import Jwt from "jsonwebtoken"
export const isLoggedIn = (req, res, next) => { 

    try {

        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: "Please Login"
            })
        }

        const decode = Jwt.decode(req.headers.authorization, process.env.JWTSECRET);

        req.user = decode;

        next();

    } catch (error) { 
        return res.status(401).json({
            success: false,
            message: "Auth Failed"
        })

    }


}