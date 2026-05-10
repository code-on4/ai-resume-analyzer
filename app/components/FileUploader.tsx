import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {formatFileSize} from "~/utils";

interface FileUploaderProps {
    file?: File | null;
    onFileSelect?: (file: File | null) => void;
}
const FileUploader = ({onFileSelect, file}: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null
        onFileSelect?.(file)
    }, [onFileSelect])



    const {getRootProps, getInputProps} = useDropzone({onDrop, multiple: false, accept: {"application/pdf": [".pdf"]}, maxSize:20 * 1024 * 1024})
    const maxFileSize = 20 * 1024 * 1024;

    return (
        <div className={"w-full gradient-border"}>
            <div {...getRootProps()}>
            <input {...getInputProps()} />
           <div className={"space-y-4 cursor-pointer"}>
               {
                   file ? (
                       <div className={"uploader-selected-file"} onClick={(e) => e.stopPropagation()}>
                           <img src={"/images/pdf.png"} alt={"pdf icon"} className={"size-10 mr-4"}/>
                           <div className={"flex items-center space-x-3"}>
                               <div>
                                   <p className={"text-sm font-medium text-gray-700 truncate max-w-xs"}> {file.name} </p>
                                   <p className={"text-lg text-gray-500"}>{formatFileSize(file.size)}</p>
                               </div>
                           </div>
                           <button className={"p-2 cursor-pointer"} onClick={(e) => onFileSelect?.(null)}>
                               <img src={"/icons/cross.svg"} alt={"remove"} className={"w-5 h-4"}/>
                           </button>
                       </div>
                   ):( <div>
                           <div className={"mx-auto w-16 h-16 flex items-center justify-center mb-2"}>
                               <img src={"/icons/info.svg"} alt={"upload icon"} className={"size-20"}/>
                           </div>
                       <p className={"text-sm text-gray-500"}>
                         <span> Click to Upload </span> or drag and drop
                       </p>
                       <p className={"text-lg text-gray-500"}>{`PDF ${formatFileSize(maxFileSize)}`}</p>
                   </div>
                   )}
           </div>
        </div></div>
    )
}

export default FileUploader;
