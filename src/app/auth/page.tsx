"use client";
import Container from "@/components/ui/container";
import LoginForm, {
  formSchema as loginFormSchema,
} from "@/components/ui/loginForm";
import RegisterDialog from "@/components/ui/registerDialog";
import RegisterForm, {
  formSchema as registerFormSchema,
} from "@/components/ui/registerForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APIFetch } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import * as z from "zod";

export interface AuthPageStateProps {
  dialogVisibility: boolean;
  toaster?: {
    visible: boolean;
    message: string;
  };
  registerBody: z.infer<typeof registerFormSchema> | null;
  isLoading?: boolean;
}

export default function Auth() {
  const [state, setState] = useState<AuthPageStateProps>({
    dialogVisibility: false,
    registerBody: null,
  });

  const alertToast = () => {
    toast.dismiss();
    toast.error(state.toaster?.message);
    return null;
  };

  const handleDialogValueChange = async (value: string) => {
    const { response, responseContent } = await APIFetch({
      endpoint: `/users?validation_code=${value}`,
      method: "POST",
      body: state.registerBody || {},
    });
    if (response.status == 201) {
      setState({
        dialogVisibility: false,
        registerBody: null,
        isLoading: false,
        toaster: {
          visible: true,
          message: "Account created successfully.",
        },
      });
      alertToast();
    } else {
      setState((prev) => ({
        ...prev,
        toaster: {
          visible: true,
          message: responseContent.message,
        },
      }));
      alertToast();
    }
  };

  const handleRegisterFormSubmit = async (
    data: z.infer<typeof registerFormSchema>
  ) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    const {
      response: { status },
      responseContent,
    } = await APIFetch({ endpoint: "/users", method: "POST", body: data });

    if (status == 201)
      setState({
        dialogVisibility: true,
        registerBody: data,
        isLoading: false,
      });
    else {
      setState({
        dialogVisibility: false,
        registerBody: null,
        isLoading: false,
        toaster: {
          visible: true,
          message: responseContent.message,
        },
      });
      alertToast();
    }
  };

  const handleLoginFormSubmit = async (
    data: z.infer<typeof loginFormSchema>
  ) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    const { response, responseContent } = await APIFetch({
      endpoint: "/auth",
      method: "POST",
      body: data,
    });

    if (response.status == 200) {
      setState({
        dialogVisibility: false,
        registerBody: null,
        isLoading: false,
        toaster: {
          visible: true,
          message: "Login successful. Redirecting...",
        },
      });
      alertToast();
      setTimeout(() => {
        redirect("/books");
      }, 600);
    } else {
      setState({
        dialogVisibility: false,
        registerBody: null,
        isLoading: false,
        toaster: {
          visible: true,
          message: responseContent.message,
        },
      });
      alertToast();
    }
  };

  return (
    <>
      <Toaster theme="dark" position="bottom-right" />
      <Container className="bg-primary max-w-lg rounded-md py-6 px-6" center>
        {state.dialogVisibility && (
          <RegisterDialog
            onChange={handleDialogValueChange}
            setState={setState}
          />
        )}
        {state.toaster?.visible && alertToast()}
        <Tabs
          defaultValue="login"
          className="w-full max-w-lg h-[70vh] border-1 border-secondary bg-secondary px-6 py-4 rounded-md"
        >
          <TabsList className="w-full border-1 border-primary">
            <TabsTrigger
              className="data-[state=active]:text-white data-[state=active]:bg-primary transition-[200ms]"
              value="login"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:text-white data-[state=active]:bg-primary transition-[200ms]"
              value="register"
            >
              Register
            </TabsTrigger>
          </TabsList>
          <div className="overflow-y-scroll py-6">
            <TabsContent className="px-4" value="login">
              <LoginForm
                handleSubmit={handleLoginFormSubmit}
                isLoading={state.isLoading}
              />
            </TabsContent>
            <TabsContent className="px-4" value="register">
              <RegisterForm
                handleSubmit={handleRegisterFormSubmit}
                isLoading={state.isLoading}
              />
            </TabsContent>
          </div>
        </Tabs>
      </Container>
    </>
  );
}
