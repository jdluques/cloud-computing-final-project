"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "lucide-react";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function RegisterButton() {
  const [haveAccount, setHaveAccount] = useState(true);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <User />
          Registrarse
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-5">
        {haveAccount ? (
          <LoginForm onClick={() => setHaveAccount(!haveAccount)} />
        ) : (
          <RegisterForm onClick={() => setHaveAccount(!haveAccount)} />
        )}
      </PopoverContent>
    </Popover>
  );
}
