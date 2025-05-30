// import { redirect } from "react-router-dom";
// import type { ActionFunctionArgs } from "react-router-dom";
// import { z } from "zod";

// export async function loginAction({ request }: ActionFunctionArgs) {
//   const formData = await request.formData();
//   const email = formData.get("email");
//   const password = formData.get("password");
//   const ErrorSchema = z.object({
//     message: z.string(),
//   });

//   if (typeof email !== "string" || typeof password !== "string") {
//     return { message: "Invalid form data" };
//   }

//   try {
//     await loginUser({ email, password });
//     console.log("done");
//     return redirect("/host");
//   } catch (err: unknown) {
//     const parsed = ErrorSchema.safeParse(err);
//     if (parsed.success) {
//       return { message: parsed.data.message };
//     }
//     return { message: "Unknown Error" };
//   }
// }
