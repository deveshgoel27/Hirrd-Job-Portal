import { Heart, MapPinIcon, Trash2Icon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { useUser } from "@clerk/clerk-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import { deleteJob, saveJob } from "@/api/apiJobs"
import { useEffect, useState } from "react"
import useFetch from "@/hooks/useFetch"
import { BarLoader } from "react-spinners"

const JobCard = ({
    job, // actual job data
    savedInit = false, // job is saved or not 
    onJobSaved = () => { },   // what action we are performing when a job is saved
    isMyJob = false, // for saved jobs
}) => {
    const [saved,setSaved] = useState(savedInit);

    const { user } = useUser();

    const {loading: loadingDeleteJob , fn: fnDeleteJob} = useFetch(deleteJob,{
        job_id: job.id,
    });

    const {
        loading: loadingSavedJob,
        data: savedJob,
        fn: fnSavedJob,
      } = useFetch(saveJob,{
           alreadySaved : saved
      });
    

    const handleSaveJob = async () => {
      await fnSavedJob({
        user_id : user.id,
        job_id : job.id,
      });
      onJobSaved();
    };
   

      // just trying an example for saving and unsaved 

    // const handleToggleSave = async () => {
    //     if (saved) {
    //       await fnDeleteJob();   // unsave the job
    //     } else {
    //       await fnSavedJob({
    //         user_id: user.id,
    //         job_id: job.id,
    //       });
    //     }
    //     setSaved(!saved); // toggle local state
    //     onJobSaved();     // refresh saved jobs if needed
    //   };
      
     
    const handleDeleteJob = async () => {
        await fnDeleteJob();
        onJobSaved();
      };


    useEffect(()=> {
        if(savedJob !== undefined) setSaved(savedJob?.length > 0);
    }, [savedJob]);


    return (
        <div className=" sm:mr-0">
    <Card className=" ml-10 sm:ml-20 mt-5 flex flex-col   ">
         {loadingDeleteJob && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}
        <CardHeader>
            <CardTitle className="flex justify-between font-bold">
                {job.title}
                {isMyJob && (
                    <Trash2Icon
                        fill="red"
                        size={18}
                        className="text-red-300 cursor-pointer"
                        onClick={handleDeleteJob}
                    />
                )}
            </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 flex-1">
            <div className="flex justify-between">
                {job.company && <img src={job.company.logo_url} className="h-6" />}
                <div className="flex gap-2 items-center">
                    <MapPinIcon size={15} /> {job.location}
                </div>
            </div>
            <hr />
            {job.description.substring(0, job.description.indexOf("."))}
        </CardContent>
        <CardFooter className="flex gap-2">
            <Link to={`/job/${job.id}`} className="flex-1">
                <Button variant="secondary" className="w-full">
                    More Details
                </Button>
            </Link>
             {!isMyJob && (
                <Button
                    variant="outline"
                    className="w-15"
                    onClick={handleSaveJob}
                    disabled={loadingSavedJob || loadingDeleteJob}
                >
                    {saved ? (
                      <Heart size={20} stroke="red" fill="red" />
                    ) : (
                        <Heart size={20} />
                    )}
                </Button>
             )}
        </CardFooter>
    </Card>
    </div>
)}

export default JobCard;