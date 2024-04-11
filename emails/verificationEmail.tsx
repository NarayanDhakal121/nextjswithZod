import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <>
      <Html lang="en" dir="ltr">
        <Head>
          <title>Verification code</title>
        </Head>
        <h1>Welcome, {username}!</h1>

        <br />

        <div>
          <Text>
            Thankyou for registering. Please use the verification code for
            complete your registrations.
          </Text>

          <p>{otp}</p>
           {/* todo : more works on button  */}
        </div>
      </Html>
    </>
  );
}
