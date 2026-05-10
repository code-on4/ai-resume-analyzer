import {Navbar} from "~/components/Navbar";
import {useState} from "react";
import FileUploader from "~/components/FileUploader";

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [statusText, setStatusText] = useState(false)
    const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleFileSelect = (file: File | null) => {
      console.log("gggg")
        setFile(file)
  }
  return (
      <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar/>
        <section className={"main-section"}>
          <div className={"page-heading py-16"}>
            <h1>Smart Feedback for your dream job</h1>
            {
              isProcessing ? (
                  <>
                    <h2>{statusText}</h2>
                    <img src={"/images/resume-scan.gif"} alt={"spinner"} className={"w-full"}/>
                  </>
              ) : <h2>
                Drop your resume for an ATS score and improvement tips
              </h2>
            }
            {
              !isProcessing && (
                  <form id={"resume-upload"} onSubmit={handleSubmit} className={"flex flex-col gap-4 mt-8"}>
                    <div className={"form-div"}>
                      <label htmlFor={"company-name"} className={"form-label"}>Company Name</label>
                      <input type={"text"} id={"company-name"} className={"form-input"} placeholder={"Enter Company Name"}/>
                    </div>
                    <div className={"form-div"}>
                      <label htmlFor={"job-title"} className={"form-label"}>Job Title</label>
                      <input type={"text"} id={"job-title"} className={"form-input"} placeholder={"Enter Job Title"}/>
                    </div>
                    <div className={"form-div"}>
                      <label htmlFor={"job-description"} className={"form-label"}>Job Description</label>
                      <textarea rows={5} id={"job-description"} className={"form-input"} placeholder={"Enter Job Description"}/>
                    </div>
                    <div className={"form-div"}>
                      <label htmlFor={"uploader"} className={"form-label"}>Upload Resume</label>
                      <FileUploader onFileSelect={handleFileSelect} file={file}/>
                    </div>
                    <button type={"submit"} className={"primary-button"}>Analyze Resume</button>
                  </form>
                )
            }
          </div>
        </section>
      </main>
  );
};

export default Upload;
