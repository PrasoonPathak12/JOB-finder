import React, { useState, useEffect } from "react";
import axios from "axios";

function MyJobs() {
    const [myJobs, setMyJobs] = useState([]);
    const [editingMode, setEditingMode] = useState(""); // it is equated to job id
    const [message, setMessage] = useState("");

    // load all the jobs posted by employer
    useEffect(() => {
        const getJobsPostedByMe = async () => {
            try {
                setMessage("Loading...")
                const response = await axios.get(
                    'http://127.0.0.1:3000/api/v1/job/get-employer-posted-jobs',
                    { withCredentials: true }
                );

                setMessage("")
                setMyJobs(response.data.jobs);
            } catch (err) {
                console.log("error getting jobs posted by you : ", err);
            }
        }

        getJobsPostedByMe();
    }, []);

    const handleUpdateJob = async (id) => {
        // get the current updated job
        const updatedJob = myJobs.find((job) => job._id === id);
        axios.put(
            `http://127.0.0.1:3000/api/v1/job/update/${id}`,
            updatedJob,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
        ).then(() => {
            setEditingMode("");
        }).catch((err) => {
            console.log("error updating the job : ", err);
        });
    }

    const handleDeleteJob = async (id) => {
        axios.delete(
            `http://127.0.0.1:3000/api/v1/job/delete/${id}`,
            { withCredentials: true }
        ).then(() => {
            setMyJobs((prevJobs) => prevJobs.filter((job) => job._id != id));
        }).catch((err) => {
            console.log("error updating the job : ", err);
        });
    }

    const handleInputChange = (jobId, field, value) => {
        setMyJobs(
            (prevJobs) => prevJobs.map((job) =>
                job._id === jobId ? { ...job, [field]: value } : job
            )
        );
    }

    const handleEnableEdit = (id) => {
        setEditingMode(id);
    }

    const handleDisableEdit = () => {
        setEditingMode("");
    }

    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold text-center m-4 bg-sky-400 p-2 rounded-md">Your Posted Jobs</h1>
            <h3 className="text-center text-lg mt-2">{message}</h3>
            <div>
                {myJobs.length > 0 ? (
                    <>
                        <div className="m-2">
                            {myJobs.map((element, index) => (
                                <div className="p-2 m-2 bg-slate-300 rounded-md shadow-lg" key={element._id}>
                                    <div
                                        class="w-10 h-10 text-black rounded-full inline-flex items-center justify-center bg-red-500 text-xl font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <div>
                                            <div className="inline-block m-2">
                                                <span><b>Title: </b></span>
                                                <input
                                                    type="text"
                                                    disabled={
                                                        editingMode !== element._id ? true : false
                                                    }
                                                    value={element.title}
                                                    onChange={(e) => handleInputChange(
                                                        element._id,
                                                        "title",
                                                        e.target.value
                                                    )}
                                                    className="w-80 p-2 m-1 border-2 border-solid border-cyan-700 outline-none text-black rounded-md"
                                                />
                                            </div>
                                            <div className="inline-block m-2">
                                                {" "}
                                                <span><b>Country: </b></span>
                                                <input
                                                    type="text"
                                                    disabled={
                                                        editingMode !== element._id ? true : false
                                                    }
                                                    value={element.country}
                                                    onChange={(e) => handleInputChange(
                                                        element._id,
                                                        "country",
                                                        e.target.value
                                                    )}
                                                    className="w-80 p-2 m-1 border-2 border-solid border-cyan-700 outline-none text-black rounded-md"
                                                />
                                            </div>
                                            <div className="inline-block m-2">
                                                <span><b>City: </b></span>
                                                <input
                                                    type="text"
                                                    disabled={
                                                        editingMode !== element._id ? true : false
                                                    }
                                                    value={element.city}
                                                    onChange={(e) => handleInputChange(
                                                        element._id,
                                                        "city",
                                                        e.target.value
                                                    )}
                                                    className="w-80 p-2 m-1 border-2 border-solid border-cyan-700 outline-none text-black rounded-md"
                                                />
                                            </div>
                                            <div className="inline-block m-2">
                                                <span><b>Category: </b></span>
                                                <select
                                                    value={element.category}
                                                    onChange={(e) => handleInputChange(
                                                        element._id,
                                                        "category",
                                                        e.target.value
                                                    )}
                                                    disabled={
                                                        editingMode !== element._id ? true : false
                                                    }
                                                    className="w-80 p-2 m-1 border-2 border-solid border-cyan-700 outline-none text-black rounded-md"
                                                >
                                                    <option value="Graphics & Design">Graphics & Design</option>
                                                    <option value="Mobile App Development">Mobile App Development</option>
                                                    <option value="Frontend Web Development">Frontend Web Development</option>
                                                    <option value="MERN Stack Development">MERN STACK Development</option>
                                                    <option value="Account & Finance">Account & Finance</option>
                                                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                                                    <option value="Video Animation">Video Animation</option>
                                                    <option value="MEAN Stack Development">MEAN STACK Development</option>
                                                    <option value="MEVN Stack Development">MEVN STACK Development</option>
                                                    <option value="Data Entry Operator">Data Entry Operator</option>
                                                </select>
                                            </div>
                                            <div className="inline-block m-2">
                                                <span>
                                                    <b>Salary: </b>{" "}
                                                    {element.fixedSalary ? (
                                                        <input
                                                            type="number"
                                                            disabled={
                                                                editingMode !== element._id ? true : false
                                                            }
                                                            value={element.fixedSalary}
                                                            onChange={(e) => handleInputChange(
                                                                element._id,
                                                                "fixedSalary",
                                                                e.target.value
                                                            )}
                                                            className="w-80 p-2 m-1 border-2 border-solid border-cyan-700 outline-none text-black rounded-md"
                                                        />
                                                    ) : (
                                                        <div>
                                                            <input
                                                                type="number"
                                                                disabled={
                                                                    editingMode !== element._id ? true : false
                                                                }
                                                                value={element.salaryFrom}
                                                                onChange={(e) => handleInputChange(
                                                                    element._id,
                                                                    "salaryFrom",
                                                                    e.target.value
                                                                )}
                                                                className="w-80 p-2 m-1 border-2 border-solid border-cyan-700 outline-none text-black rounded-md"
                                                            />
                                                            <input
                                                                type="number"
                                                                disabled={
                                                                    editingMode !== element._id ? true : false
                                                                }
                                                                value={element.salaryTo}
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        element._id,
                                                                        "salaryTo",
                                                                        e.target.value
                                                                    )}
                                                                className="w-80 p-2 m-1 border-2 border-solid border-cyan-700 outline-none text-black rounded-md"
                                                            />
                                                        </div>
                                                    )}
                                                </span>
                                            </div>
                                            <div className="inline-block m-2">
                                                {" "}
                                                <span><b>Expired: {element.expired}</b></span>
                                                <select
                                                    value={element.expired}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            element._id,
                                                            "expired",
                                                            e.target.value
                                                        )}
                                                    disabled={
                                                        editingMode !== element._id ? true : false
                                                    }
                                                    className="w-80 p-2 m-1 border-2 border-solid border-cyan-700 outline-none text-black rounded-md"
                                                >
                                                    <option value={true}>TRUE</option>
                                                    <option value={false}>FALSE</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="m-2">
                                                <span><b>Location: </b></span>
                                                <input
                                                    value={element.location}
                                                    disabled={
                                                        editingMode !== element._id ? true : false
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            element._id,
                                                            "location",
                                                            e.target.value
                                                        )}
                                                    className="w-80 p-2 m-1 border-2 border-solid border-cyan-700 outline-none text-black rounded-md"
                                                />
                                            </div>
                                            <div className="m-2">
                                                <span><b>Description: </b></span>{" "}
                                                <textarea
                                                    rows="10"
                                                    cols="100"
                                                    value={element.description}
                                                    disabled={
                                                        editingMode !== element._id ? true : false
                                                    }
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            element._id,
                                                            "description",
                                                            e.target.value
                                                        )}
                                                    className="p-2 m-1 border-2 border-solid border-cyan-700 outline-none text-black rounded-md h-44"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="m-2 flex justify-end">
                                        <div className="">
                                            {editingMode === element._id ? (
                                                <>
                                                    <button
                                                        onClick={() => handleUpdateJob(element._id)}
                                                        className="p-2 bg-sky-500 rounded-md shadow-md font-bold text-white w-32 m-2"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => handleDisableEdit()}
                                                        className="p-2 bg-sky-500 rounded-md shadow-md font-bold text-white w-32"
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => handleEnableEdit(element._id)}
                                                    className="p-2 bg-sky-500 rounded-md shadow-md font-bold text-white w-32 m-2"
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleDeleteJob(element._id)}
                                            className="p-2 bg-red-500 rounded-md font-bold text-white m-2 w-32"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-center">
                        {myJobs.length <= 0 ? "You've not posted any job or may be you deleted all of your jobs!" : ""}
                    </p>
                )}
            </div>
        </div>
    );
}

export default MyJobs;