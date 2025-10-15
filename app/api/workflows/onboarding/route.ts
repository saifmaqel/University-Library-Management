import { serve } from "@upstash/workflow/nextjs";
import emailjs from "@emailjs/browser";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

// Initialize EmailJS (add this at the top of your file or in a separate config)
emailjs.init("z2cnmRnB_V8SVLt00"); // Get from EmailJS dashboard

type InitialData = {
  email: string;
  fullName: string;
};

const ONE_DAY_IN_MS = 60 * 60 * 24 * 1000;
const THREE_DAY_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAY_IN_MS = 30 * ONE_DAY_IN_MS;

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // Wellcome Email
  await context.run("new-signup", async () => {
    await sendEmail(`Welcome to the platform - ${fullName}`, email, "welcome");
  });

  await context.sleep("wait-for-3-days", ONE_DAY_IN_MS);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail(
          `Email to non-active users - ${fullName}`,
          email,
          "non-active"
        );
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail(
          `Send newsletter to active users - ${fullName}`,
          email,
          "active"
        );
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});

export async function sendEmail(message: string, email: string, type: string) {
  try {
    const templateParams = {
      to_email: email,
      message: message,
      subject: getSubject(type)
    };

    const response = await emailjs.send(
      "service_vpfnza3", // Get from EmailJS dashboard
      "template_gy11roa", // Get from EmailJS dashboard
      templateParams
    );

    console.log(`Email sent successfully to ${email}:`, response.status);
    return response;
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
    throw error;
  }
}

function getSubject(type: string): string {
  switch (type) {
    case "welcome":
      return "Welcome to Our Platform!";
    case "non-active":
      return "We Miss You!";
    case "active":
      return "Monthly Newsletter";
    default:
      return "Update from Our Platform";
  }
}

type UserState = "non-active" | "active";

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) return "non-active";

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (timeDifference > THREE_DAY_IN_MS && timeDifference <= THIRTY_DAY_IN_MS) {
    return "non-active";
  }

  return "active";
};
