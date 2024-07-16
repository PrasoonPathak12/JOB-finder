import React from "react";

function Companies() {
    const companies = [
        {
            id: 1,
            title: "Microsoft",
            icon: "https://img.icons8.com/color/48/microsoft.png",
        },
        {
            id: 2,
            title: "Tesla",
            icon: "https://img.icons8.com/color/48/tesla-logo.png",
        },
        {
            id: 3,
            title: "Apple",
            icon: "https://img.icons8.com/ios-filled/50/mac-os.png",
        },
    ];
    return (
        <div className="flex flex-col justify-center items-center">
            <h3 className="text-xl font-bold m-4 border-2 border-red-500 p-2 bg-red-400">TOP COMPANIES</h3>
            <div className="grid grid-cols-3 gap-12">
                {companies.map((element) => {
                    return (
                        <div key={element.id} className="flex flex-row justify-center items-center flex-1">
                            <img src={element.icon} alt="Company Logo" />
                            <div className="text-xl font-bold">
                                <p>{element.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Companies;