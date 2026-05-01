import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";

export const ResumeCard = ({resume: {id, jobTitle, companyName, resumePath, imagePath, feedback}}: { resume: Resume }) => {
    return  (
        <Link to={`/resume/${id}`} className={"animate-in resume-card fade-in duration-1000"}>
            <div className={"resume-card-header"}>
                <div className={"flex flex-col gap-2"}>
                    <h2 className={"font-bold !text-black break-words"}>{companyName}</h2>
                    <h3 className={"font-bold text-lg text-gray-500 break-words"}>{jobTitle}</h3>
                </div>
                <div className={"flex-shrink-0"}>
                    <ScoreCircle score={feedback.overallScore}/>
                </div>
            </div>
            <div className={"gradient-border animate-in fade-in duration-1000"}>
                <div className={"w-full h-full"}>
                    <img src={imagePath} alt={jobTitle} className={"w-full h-[350px] object-cover object-top max-sm:h-[200px]"} />
                </div>
            </div>
        </Link>
    )
}