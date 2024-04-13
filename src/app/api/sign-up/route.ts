import connectDb from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await connectDb();

  try {
    const { username, email, password } = await request.json();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          suscess: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() + 900000).toString();

    // check by the algorithm scenario
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          { suscess: false, message: "User already exists with this email" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      // user exists but sets the fresh password , forgot verifycode and ....
      existingUserByEmail.password = hashedPassword;
      existingUserByEmail.verifiedCode = verifyCode;
      existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 36000000);
      await existingUserByEmail.save();
    } else {
      const hasedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hasedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();
    }
    // send verification email

    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    // if  email send not successful
    if (!emailResponse.suscess) {
      return Response.json(
        {
          suscess: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    // if email send suscessful

    return Response.json(
      {
        suscess: true,
        message: "User registered successfully, Please verify your email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user");
    return Response.json(
      {
        suscess: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
