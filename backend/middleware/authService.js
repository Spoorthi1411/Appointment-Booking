import jwt from 'jsonwebtoken'

// employee authentication middleware

const authService= async (req,res,next) => {
    try {
        const dtoken = req.headers['dtoken'];
        if(!dtoken){
            return res.json({success:false,message:'Not Authorized login again'})
        }
        const token_decode = jwt.verify(dtoken,process.env.JWT_SECRET)
        req.user = { id: token_decode.id };
        next()
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export default authService