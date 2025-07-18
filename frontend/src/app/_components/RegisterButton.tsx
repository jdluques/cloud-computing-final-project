"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User } from "lucide-react";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function RegisterButton() {
  const [haveAccount, setHaveAccount] = useState(true);
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm">
          Hola, {user.firstName} {user.role === "ADMIN" && "(Admin)"}
        </span>
        <Button variant="outline" onClick={logout}>
          <LogOut size={16} />
          Cerrar Sesión
        </Button>
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <User />
          Registrarse
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-96 p-5">
        {haveAccount ? (
          <LoginForm onClick={() => setHaveAccount(!haveAccount)} />
        ) : (
          <RegisterForm onClick={() => setHaveAccount(!haveAccount)} />
        )}
      </PopoverContent>
    </Popover>
  );
}
