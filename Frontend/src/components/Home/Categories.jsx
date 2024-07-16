import React from "react";

function Categories()  {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: "https://img.icons8.com/color/48/design--v1.png"
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: "https://img.icons8.com/color/48/medical-mobile-app.png",
    },
    {
      id: 3,
      title: "Frontend Development",
      subTitle: "200 Open Positions",
      icon: "https://img.icons8.com/ios-glyphs/30/web.png",
    },
    {
      id: 4,
      title: "Backend Development",
      subTitle: "1000+ Open Postions",
      icon: "https://img.icons8.com/color/48/backend-development--v1.png",
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: "https://img.icons8.com/material/24/company-assets-.png",
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: "https://img.icons8.com/ios/50/bot.png",
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: "https://img.icons8.com/office/16/video-editing.png",
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: "https://img.icons8.com/ultraviolet/40/controller.png",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-xl font-bold m-4 border-2 border-red-500 p-2 bg-red-400">POPULAR CATEGORIES</h3>
      <div className="grid grid-cols-4 gap-12">
        {categories.map((element) => {
          return (
            <div key={element.id} className="flex flex-col justify-center items-center">
              <img src={element.icon} alt="Logo" width="32" height="32"/>
              <div className="text-xl">
                <p className="font-bold">{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;