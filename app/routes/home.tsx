import type { Route } from "./+types/home";
import {Navbar} from "~/components/Navbar";
import {resumes} from "../../constants";
import {ResumeCard} from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {useEffect} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job" },
  ];
}

export default function Home() {
  const {auth} = usePuterStore();
  const isAuthenticated = auth.isAuthenticated;
  const navigate = useNavigate()

  useEffect(() => {
    if(!isAuthenticated) navigate("/auth?next=/")
  }, [isAuthenticated]);

  return      (
      <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex flex-col items-center justify-center">
      <Navbar/>
    <section className={"main-section"}>
      <div className="page-heading py-10">
      <h1 className={'capitalize'}>Track your Applications & resume ratings</h1>
      <h2>Review your submissions and check AI-powered feedback</h2>
      </div>
      {resumes.length > 0 &&  <div className={"resumes-section"}>
        {resumes.map((resume, index) => {
          return (
              <ResumeCard key={resume.id} resume={resume}/>
          )
        })}
      </div> }
    </section>
  </main>
  );
}
