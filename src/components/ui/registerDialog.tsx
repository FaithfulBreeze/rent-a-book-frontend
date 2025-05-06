import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { formSchema } from "./registerForm";
import * as z from "zod";

export default function RegisterDialog({
  setState,
  onChange,
}: {
  setState: Function;
  onChange: Function;
}) {
  return (
    <Dialog
      open={true}
      onOpenChange={() =>
        setState(
          (prev: {
            dialogVisibility: boolean;
            registerBody: z.infer<typeof formSchema> | null;
          }) => ({ ...prev, dialogVisibility: false })
        )
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Almost there!</DialogTitle>
          <DialogDescription>
            We have sent you a confirmation email. Please check your email inbox
            and paste the code on the field below.
          </DialogDescription>
          <div className="mt-4 flex justify-center">
            <InputOTP
              onChange={(value) => value.length == 6 && onChange(value)}
              maxLength={6}
            >
              <InputOTPGroup>
                <InputOTPSlot className="border-1 border-primary" index={0} />
                <InputOTPSlot className="border-1 border-primary" index={1} />
                <InputOTPSlot className="border-1 border-primary" index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot className="border-1 border-primary" index={3} />
                <InputOTPSlot className="border-1 border-primary" index={4} />
                <InputOTPSlot className="border-1 border-primary" index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
