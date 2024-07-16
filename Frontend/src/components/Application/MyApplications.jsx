import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import axios from "axios";

function MyApplications() {
    const { user } = useContext(AppContext);
    const [applications, setApplications] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [resumeImageUrl, setResumeImageUrl] = useState("");

    useEffect(() => {
        const getApplications = async () => {
            try {
                let response = {};
                if (user && user.role === "Job Seeker") {
                    response = await axios.get(
                        'http://127.0.0.1:3000/api/v1/application/my-applications',
                        { withCredentials: true }
                    );
                } else if (user && user.role === "Employer") {
                    response = await axios.get(
                        'http://127.0.0.1:3000/api/v1/application/employer/all',
                        { withCredentials: true }
                    );
                }

                setApplications(response.data.Applications);
            } catch (err) {
                console.log("error in getting the applications : ", err);
            }
        }

        getApplications();
    }, []);

    const deleteApplication = (id) => {
        axios.delete(
            `http://127.0.0.1:3000/api/v1/application/delete/${id}`,
            { withCredentials: true }
        ).then(()=>{
            setApplications((prevApplications)=> prevApplications.filter((application)=> application._id !== id));
        }).catch((err)=>{
            console.log("error in deleting the application : ", err);
        });
    }

    const openModal = (imageUrl) => {
        setResumeImageUrl(imageUrl);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <section>
            {user && user.role === "Job Seeker" ? (
                <div className="p-4">
                    <h1 className="text-2xl font-bold text-center mb-4 bg-sky-400 p-2 rounded-md">My Applications</h1>
                    <div className="grid grid-cols-3 gap-4">
                        {applications.length <= 0 ? (
                            <>
                                {" "}
                                <h4 className="text-2xl align-middle font-bold">No Applications Found!</h4>{" "}
                            </>
                        ) : (
                            applications.map((element) => {
                                return (
                                    <JobSeekerCard
                                        element={element}
                                        key={element._id}
                                        deleteApplication={deleteApplication}
                                        openModal={openModal}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
            ) : (
                <div className="p-4">
                    <h1 className="text-2xl font-bold text-center mb-4 bg-sky-400 p-2 rounded-md">Applications Received</h1>
                    <div className="grid grid-cols-3 gap-4">
                        {applications.length <= 0 ? (
                            <>
                                <h4 className="text-2xl align-middle font-bold">No Applications Found!</h4>
                            </>
                        ) : (
                            applications.map((element) => {
                                return (
                                    <EmployerCard
                                        element={element}
                                        key={element._id}
                                        openModal={openModal}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
            )}
            {modalOpen && (
                <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
            )}
        </section>
    );
}


const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
    return (
        <>
            <div className="bg-slate-300 p-2 flex flex-row items-center shadow-md rounded-md">
                <div className="flex flex-row justify-center items-center">
                    <div>
                        <p>
                            <span><b>Name: </b></span> {element.name}
                        </p>
                        <p>
                            <span><b>Email: </b></span> {element.email}
                        </p>
                        <p>
                            <span><b>Phone: </b></span> {element.phone}
                        </p>
                        <p>
                            <span><b>Address: </b></span> {element.address}
                        </p>
                        <p>
                            <span><b>CoverLetter: </b></span> {element.coverletter}
                        </p>
                        <div className="p-2 bg-red-500 rounded-md font-bold text-white mt-2">
                            <button onClick={() => deleteApplication(element._id)}>
                                Delete Application
                            </button>
                        </div>
                    </div>
                    <div className="w-24">
                        <img
                            src={element.resume.url}
                            alt="resume"
                            onClick={() => openModal(element.resume.url)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

const EmployerCard = ({ element, openModal }) => {
    return (
        <>
            <div className="bg-slate-300 p-2 flex flex-row items-center shadow-md rounded-md">
                <div>
                    <p>
                        <span><b>Name: </b></span> {element.name}
                    </p>
                    <p>
                        <span><b>Email: </b></span> {element.email}
                    </p>
                    <p>
                        <span><b>Phone: </b></span> {element.phone}
                    </p>
                    <p>
                        <span><b>Address: </b></span> {element.address}
                    </p>
                    <p>
                        <span><b>CoverLetter: </b></span> {element.coverletter}
                    </p>
                </div>
                <div className="w-24">
                    <img
                        src={element.resume.url}
                        alt="resume"
                        onClick={() => openModal(element.resume.url)}
                    />
                </div>
            </div>
        </>
    );
}

export default MyApplications;