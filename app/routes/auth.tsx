import type {Route} from "../../.react-router/types/app/routes/+types/home";
import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {useNavigate, useLocation} from "react-router";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Resumind | Auth" },
        { name: "description", content: "Log into your account" },
    ];
}

export default function Auth() {
   const {isLoading, auth} = usePuterStore();
   const isAuthenticated = auth.isAuthenticated;
   const navigate = useNavigate()
   const location = useLocation()
    const next = location.search.split("next=")[1] || "/"

    useEffect(() => {
        if(isAuthenticated) navigate(next)
    }, [isAuthenticated, next]);

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
           <div className={"gradient-border shadow-lg"}>
               <section className={"flex flex-col gap-8 bg-white rounded-2xl p-10"}>
                    <div className={"flex flex-col gap-2 items-center text-center"}>
                        <h1> Welcome </h1>
                        <h2>Log In to Continue Your Job Journey</h2>
                    </div>
                   <div>
                       {
                           isLoading ? (
                               <button className={"auth-button animate-pulse"}>Signing In....</button>
                           ) :
                               <>
                               {isAuthenticated ? (
                                   <button className={"auth-button"} onClick={() => auth.signOut()}>Log Out</button>
                               ) :  <button className={"auth-button"} onClick={() => auth.signIn()}>Log In</button>
                               }
                           </>
                       }
                   </div>
               </section>
           </div>
        </main>
    );
}
