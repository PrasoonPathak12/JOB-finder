import React from "react";

function Testimonials() {
    const testimonials = [
        {
            "id": 1,
            "user": "Alice Johnson",
            "testimonial": "Thanks to this amazing platform, I landed my dream job in just two weeks! The user-friendly interface and personalized job recommendations made the process so much easier."
        },
        {
            "id": 2,
            "user": "Michael Smith",
            "testimonial": "I was struggling to find a job for months, but this website turned things around for me. The resume-building tools and interview tips were incredibly helpful. Highly recommend!"
        },
        {
            "id": 3,
            "user": "Sophie Lee",
            "testimonial": "The job alerts feature is a game-changer. I received notifications for positions that matched my skills and interests, and I was able to apply immediately. It was so convenient!"
        },
        {
            "id": 4,
            "user": "David Brown",
            "testimonial": "I appreciate the detailed company profiles and employee reviews on this site. It helped me make informed decisions about where I wanted to apply. Found a fantastic job in no time!"
        },
        {
            "id": 5,
            "user": "Emily Davis",
            "testimonial": "The career advice section provided me with valuable insights and tips on how to improve my job search strategy. I felt more confident and prepared, leading to multiple job offers."
        },
        {
            "id": 6,
            "user": "James Wilson",
            "testimonial": "This website is a must-have for anyone looking for a job. The extensive job listings and advanced search filters made it easy to find positions that were a perfect fit for me."
        }
    ];
    return (
        <div className="flex flex-col justify-center items-center p-6">
            <h3 className="text-xl font-bold m-4 border-2 border-red-500 p-2 bg-red-400">TESTIMONIALS</h3>
            <div className="grid grid-cols-3 gap-4">
                {
                    testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="border-4 border-red-400 p-4 bg-slate-200 flex flex-col justify-center items-center">
                            <p>"{testimonial.testimonial}"</p>
                            <p><b>{testimonial.user}</b></p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Testimonials;