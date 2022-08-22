const validateRegex =(rule,value,callback)=>{
    const regex = /^(?=.*\d)(?=.*[A-Z]).[^\s]*$/;
    //pharse with at least one number and one uppercase letter
    console.log("value: ", regex.test(value));
    if(!regex.test(value)){
        return callback(new Error(rule.message));
    }else return true;
}

export default validateRegex;