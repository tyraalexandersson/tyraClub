import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../../../lib/supabaseClient";

const Login = () => {
  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "valid.email@supabase.io",
      password: "example-password",
    });

    async function signUpNewUser() {
      const { data, error } = await supabase.auth.signUp({
        email: "valid.email@supabase.io",
        password: "example-password",
        options: {
          emailRedirectTo: "https://example.com/welcome",
        },
      });
    }

    return (
      <div className="login-container">
        <h1 className="login-header">Login</h1>
      </div>
    );
  }
};

export default Login;
