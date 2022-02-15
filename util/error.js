exports.generateError=(errorMessage,statusCode)=>{
    const err=new Error(errorMessage)
    err.statusCode=statusCode
    return err
}