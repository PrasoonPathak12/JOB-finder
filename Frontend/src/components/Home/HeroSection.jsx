import React from "react";
// import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

function HeroSection() {
    const details = [
        {
            id: 1,
            title: "1,23,441",
            subTitle: "Live Job",
            icon: "https://img.icons8.com/ios-filled/50/youtube-live.png"
        },
        {
            id: 2,
            title: "91220",
            subTitle: "Companies",
            icon: "https://img.icons8.com/color/48/group-of-companies.png"
        },
        {
            id: 3,
            title: "2,34,200",
            subTitle: "Job Seekers",
            icon: "https://img.icons8.com/color/48/administrator-male-skin-type-1.png"
        },
        {
            id: 4,
            title: "1,03,761",
            subTitle: "Employers",
            icon: "https://img.icons8.com/color/48/permanent-job.png"
        },
    ];
    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-col flex-1 items-center justify-center">
                    <div className="flex flex-col flex-1 justify-center items-center">
                        <h1 className="font-bold text-3xl">Find a job that suits</h1>
                        <h1 className="font-bold text-3xl">your interests and skills!</h1>
                    </div>
                </div>
                <div className="flex flex-row flex-2 justify-around mt-12 items-center">
                    {details.map((element) => {
                        return (
                            <div className="flex flex-col justify-center items-center" key={element.id}>
                                <img src={element.icon} alt="" />
                                <div className="text-xl flex flex-col justify-center items-center">
                                    <p className="font-bold">{element.title}</p>
                                    <p className="font-semibold">{element.subTitle}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default HeroSection;