import type { Route } from "./+types/home";
import {Navbar} from "~/components/Navbar";
import {ResumeCard} from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job" },
  ];
}

export default function Home() {
  const {auth, kv} = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loadingResume, setLoadingResume] = useState<boolean>(false)
  const isAuthenticated = auth.isAuthenticated;
  const navigate = useNavigate()

  useEffect(() => {
    if(!isAuthenticated) navigate("/auth?next=/")
  }, [isAuthenticated]);

  useEffect(() => {
    const loadResume = async () => {
      setLoadingResume(true);
      const resumes = (await kv.list('resume:*', true) as KVItem[])

      console.log(`resumes`, resumes)
      const parsedResumes = resumes?.map((resume)=> {
        return JSON.parse(resume.value) as Resume
      })

      console.log("parsedResumes", parsedResumes)

      setResumes(parsedResumes || [])
      setLoadingResume(false);
    }
    loadResume()
  }, []);


  return      (
      <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex flex-col items-center justify-center">
      <Navbar/>
    <section className={"main-section"}>
      <div className="page-heading py-10">
      <h1 className={'capitalize'}>Track your Applications & resume ratings</h1>

        {
          !loadingResume && resumes?.length === 0 ? (
              <h2 className={"text-center"}>No Resumes found. Upload your first resume to get feedback</h2>
          ) : (
              <h2>Review your submissions and check the AI-powered feedback</h2>
          )
        }
      </div>
      {
        loadingResume && (
            <div className={"flex flex-col items-center justify-center"}>
              <img src={'/images/resume-scan-2.gif'} className={"w-[200px]"} alt="loading" />
            </div>
          )
      }
      {!loadingResume && resumes.length > 0 &&  <div className={"resumes-section"}>
        {resumes.map((resume, index) => {
          return (
              <ResumeCard key={resume.id} resume={resume}/>
          )
        })}
      </div>}

      {
        !loadingResume && resumes.length === 0 && (
            <div className={"flex flex-col items-center justify-center mt-10 gap-4"}>
              <Link to={"/upload"} className={"w-fit primary-button text-xl font-semibold"}>Upload Resume</Link>
            </div>
          )
      }
    </section>
  </main>
  );
}
