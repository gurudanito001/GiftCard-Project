"use client"
import { useEffect, useState, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useDispatchMessage from '@/hooks/useDispatchMessage';
import { useSelector } from "react-redux";
import { apiPost } from "@/services/apiService";
import { useRouter } from "next/navigation";
import AppAutoComplete from "@/components/autocomplete";

const CreateDispute = ({userId, tradeId}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatchMessage = useDispatchMessage();
  //const {userData} = useSelector((state) => state.userData);


  const [formData, setFormData] = useState({
    userId: "",
    tradeId: "",
    reason: "",
    mediaProof: "",
    mediaProofType: ""
  })

  const [fileUrl, setFileUrl] = useState("");
  const [isSendingFile, setIsSendingFile] = useState(false);
  const inputFileRef = useRef(null);
  const closeModalRef = useRef(null);

  const createFileUrl = () => {
      const file = inputFileRef.current.files[0];
      console.log(file)
      if (file) {
          setFileUrl(URL.createObjectURL(file));
          console.log(URL.createObjectURL(file))
      } else {
          setFileUrl("")
      }
  }

  useEffect(() =>{
    setFormData( prevState => ({
      ...prevState,
      userId,
      tradeId
    }))
  }, [userId])

  const handleChange = (prop) => (event) => {
    setFormData(prevState => ({
      ...prevState,
      [prop]: event.target.value
    }))
  }

  const createDisputeMutation = useMutation({
    mutationFn: (data)=> apiPost({ url: `/dispute`, data })
    .then(res => {
      dispatchMessage({ message: res.message })
      queryClient.invalidateQueries(["allDisputes"]);
      router.refresh();
      closeModalRef.current.click();
    }).catch(error =>{
      console.log(error)
      dispatchMessage({severity: "error", message: error.message })
    })
  })

  const handleSubmit =  async (event) => {
    event.preventDefault();
    // return console.log(formData)

    if (!inputFileRef.current?.files.length) {
      return dispatchMessage({ severity: "error", message: "No File Selected" });
    }
    
    console.log(inputFileRef.current?.files)
    const file = inputFileRef.current.files[0];
    setIsSendingFile(true)
    const fileUrl = await postFile(file.name, file)
    let data = {...formData};
    data.mediaProof = fileUrl;
    setIsSendingFile(false)
    createDisputeMutation.mutate(data)
  }

  const postFile = async (filename, file) =>{
    const response = await fetch(
      `/api/v1/uploadFiles?filename=${filename}`,
      {
        method: 'POST',
        body: file,
      },
    );
    const newBlob = await response.json();
    console.log(newBlob.url);
    return newBlob.url
  }


  return (
    <>
      <div className="offcanvas-header py-5 px-4">
        <h4 className="mb-0">Create Dispute</h4>
        <button type="button" ref={closeModalRef} className="btn-close"  data-bs-toggle="offcanvas" data-bs-target="#messaging" aria-controls="offcanvasRight">
        </button>
        {/* <button className="btn app-primary-btn py-2 ms-4 mt-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#messaging" aria-controls="offcanvasRight">Start Messaging</button> */}
      </div>

      <form className="d-flex flex-column gap-3 px-4">
        <div>
          <label htmlFor="mediaProofType" className="form-label mb-1">Media Proof Type</label>
          <select className="form-select form-control form-control-sm primary-bg fs-6" value={formData.mediaProofType} onChange={handleChange("mediaProofType")}  aria-label="Default select example">
            <option value="">Select Option</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div>
          <label htmlFor="mediaProof" className="form-label mb-1">Media Proof</label>
          <input className="form-control" id="mediaProof" accept="image/*, video/*" onChange={createFileUrl} ref={inputFileRef} type="file"/>
          {inputFileRef?.current?.files[0]?.name?.includes(".mp4") ?
            <>
              {fileUrl &&
                <video width="320" height="240" controls>
                  <source src={fileUrl} type="video/mp4" />
                  <source src={fileUrl} type="video/ogg" />
                  Your browser does not support the video tag.
                </video>
              }
            </> :
            <>
              {fileUrl &&
                <div>
                  <h6 className='small fw-bold mt-3'>File Preview</h6>
                  <img src={fileUrl} alt="File Preview" className='border rounded' width="100px" />
                </div>
              }
            </>
          }
           
        </div>

        <div>
          <label htmlFor="reason" className="form-label mb-1">Reason</label>
          <textarea id="reason" className="form-control form-control-sm primary-bg" rows={5} value={formData.reason} onChange={handleChange("reason")}></textarea>
        </div>
        
        <button className="btn app-primary-btn d-flex align-items-center justify-content-center py-2"disabled={(isSendingFile || createDisputeMutation.isLoading)} onClick={handleSubmit}> 
          {(isSendingFile || createDisputeMutation.isLoading) ? <CircularProgress size={20} color="inherit" /> : "Create Dispute"}
        </button>
      </form>
    </>
  )
}

export default CreateDispute;