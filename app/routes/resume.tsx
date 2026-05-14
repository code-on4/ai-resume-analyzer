import {Link, useParams} from "react-router";
import type {Route} from "../../.react-router/types/app/routes/+types/home";
import {useEffect} from "react";
import {usePuterStore} from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Resumind | Review" },
        { name: "description", content: "Detailed overview of your resume" },
    ];
}

const Resume = () => {
    const {auth, isLoading, fs, kv} = usePuterStore()
    const {id} = useParams();

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`)
            if (!resume) return;
            const data = JSON.parse(resume)
            const resumeBlob = await fs.read(data.resumePath)
            if(!resumeBlob) return;
            const pdfBlob = new Blob([resumeBlob], {type: "application/pdf"})
            const resumeUrl = URL.createObjectURL(pdfBlob)
            setImageUrl(resumeUrl)
        }
    }, [])

    return (
        // <div>Resume {id}</div>
        <main className={"!pt-0 "}>
            <nav className={"resume-nav"}>
                <Link to={"/"} className={"back-button"}>
                    <img src={"/icons/back.svg"} alt={"Logo"} className={"w-2.5 h-2.5"}/>
                    <span className={"text-gray-800 text-sm font-semibold"}>Back to Homepage</span>
                </Link>
            </nav>
            <div className={"flex flex-row w-full max-lg:flex-col-reverse"}>
                <section className={"feedback-section"}>
                    {imageUrl && resumeUrl && (
                        <div className={"animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit"}>

                           </div>)
                        }
                </section>
            </div>
        </main>
    )
}

export default Resume;
