import { VercelRequest, VercelResponse } from "@vercel/node";
import { clearCookie } from "../_utils/cookie";

export default async (request: VercelRequest, response: VercelResponse) => {
  try {
    response.setHeader("Set-Cookie", clearCookie());

    response.status(200).json("You have been signed out.");
  } catch (error) {
    console.log(error);
  }
};
