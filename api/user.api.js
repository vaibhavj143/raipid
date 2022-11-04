import User from "../model/user.model.js";

export const createUser = async (req, res) => {
    try {
      console.log(req);
      let reqUser = req.body;
      if (reqUser.password.length > 18 || reqUser.password.length < 4) {
        res.status(200).send("password length 6min 18max");
        return;
      }
  
      // console.log(req.body);
  
      const { email } = reqUser;
  
      let oldUser = await User.findOne( {email} );
      // console.log(email);
      console.log(oldUser);
  
      if (oldUser) {
        res
          .status(200)
          .send("Account is already exits with this email ");
      } else {
        if (email && reqUser.fName && reqUser.password) {
          let user = await User.create(reqUser);
  
          console.log("token");
          const token = await user.generateToken();
  
          console.log("tokenEnd");
  
          const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
          };
  
          res.status(200).cookie("token", token, options).send({
            success: true,
            user: user,
            token: token,
          });
          
        } else {
          res.status(200).send("please if all Credentials");
          return;
        }
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  
    return;
  };
  

  export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(400).send({
          success: false,
          message: "user dose not exist",
        });
      }
      const isMatch = await user.matchPassword(password);
  
      if (!isMatch) {
        return res.status(400).send({
          success: false,
          message: "Invalid mail or password",
        });
      }
      // console.log("token");
      const token = await user.generateToken();
      // console.log("tokenEnd");
      const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
  
      res.status(200).cookie("token", token, options).send({
        success: true,
        user: user,
        token: token,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  };


  export  const logoutUser= async(req,res)=>{

    try {

      const options = {
        expires: new Date(Date.now()),
        httpOnly: true,
      };

      res.status(200).cookie("token",null,options).send({
        success:true,
        message:"Logged out"
      })
      
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  } 

