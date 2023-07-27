type Header = {
    title: string;
    path: string;
};

type Faqs = {
    section: string;
    questions: {
        question: string;
        answer: string;
    }[];
};

export const nav_items: Header[] = [
    { title: "Upload File", path: "/upload" },
    
    { title: "FAQS", path: "/faqs" },
];

export const faqs: Faqs[] = [
    {
        section: "Program",
        questions: [
            {
                question: "What is BETA Camp?",
                answer:
                    "Founded by industry professionals and entrepreneurs, BETA Camp is a virtual entrepreneurship bootcamp designed for ambitious high school students. It challenges teens to take action, broaden their horizons, and make a real-world impact through building a revenue-generating startup.",
            },
            {
                question: "What is BETA Camp?",
                answer:
                    "Founded by industry professionals and entrepreneurs, BETA Camp is a virtual entrepreneurship bootcamp designed for ambitious high school students. It challenges teens to take action, broaden their horizons, and make a real-world impact through building a revenue-generating startup.",
            },
        ],
    },
    {
        section: "Application",
        questions: [
            {
                question: "What is BETA Camp?",
                answer:
                    "Founded by industry professionals and entrepreneurs, BETA Camp is a virtual entrepreneurship bootcamp designed for ambitious high school students. It challenges teens to take action, broaden their horizons, and make a real-world impact through building a revenue-generating startup.",
            },
            {
                question: "What is BETA Camp?",
                answer:
                    "Founded by industry professionals and entrepreneurs, BETA Camp is a virtual entrepreneurship bootcamp designed for ambitious high school students. It challenges teens to take action, broaden their horizons, and make a real-world impact through building a revenue-generating startup.",
            },
        ],
    },
];
