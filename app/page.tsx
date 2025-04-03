"use client"

import type React from "react"

import {useState, useEffect} from "react"
import {Home, Briefcase, GraduationCap, Code, Mail, ArrowLeft, FileText, Layers} from "lucide-react"
import Image from 'next/image'
import {cn} from "@/lib/utils"

export default function Portfolio() {
    const [activeScreen, setActiveScreen] = useState("home")
    const [previousScreen, setPreviousScreen] = useState<string | null>(null)
    const [isMobile, setIsMobile] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // Check if we're on a mobile device
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        // Initial check
        checkMobile()

        // Add event listener for window resize
        window.addEventListener("resize", checkMobile)

        // Avoid hydration mismatch
        setMounted(true)

        // Cleanup
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const navigateTo = (screen: string) => {
        setPreviousScreen(activeScreen)
        setActiveScreen(screen)
    }

    const goBack = () => {
        if (previousScreen) {
            setActiveScreen(previousScreen)
            setPreviousScreen(null)
        }
    }

    // Content to render inside the phone frame or directly on mobile
    const AppContent = () => (
        <div
            className={cn(
                "bg-white dark:bg-gray-900 overflow-hidden relative",
                isMobile ? "h-screen rounded-none" : "rounded-b-[35px] h-[700px]",
            )}
        >

            {/* App Content */}
            <div className="h-full overflow-y-auto pb-15">
                {activeScreen === "home" && <HomeScreen navigateTo={navigateTo} />}
                {activeScreen === "skills" && <SkillsScreen goBack={goBack} />}
                {activeScreen === "projects" && <ProjectsScreen goBack={goBack} />}
                {activeScreen === "experience" && <ExperienceScreen goBack={goBack} />}
                {activeScreen === "education" && <EducationScreen goBack={goBack} />}
                {activeScreen === "contact" && <ContactScreen goBack={goBack} />}
            </div>

            {/* Tab Bar */}
            <div className="h-16 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 flex items-center justify-between w-full px-2 sticky bottom-0 left-0 right-0">
                <TabButton
                    icon={<Home size={20} />}
                    label="Home"
                    isActive={activeScreen === "home"}
                    onClick={() => navigateTo("home")}
                />
                <TabButton
                    icon={<Code size={20} />}
                    label="Skills"
                    isActive={activeScreen === "skills"}
                    onClick={() => navigateTo("skills")}
                />
                <TabButton
                    icon={<Layers size={20} />}
                    label="Projects"
                    isActive={activeScreen === "projects"}
                    onClick={() => navigateTo("projects")}
                />
                <TabButton
                    icon={<Briefcase size={20} />}
                    label="Work"
                    isActive={activeScreen === "experience"}
                    onClick={() => navigateTo("experience")}
                />
                <TabButton
                    icon={<GraduationCap size={20} />}
                    label="Education"
                    isActive={activeScreen === "education"}
                    onClick={() => navigateTo("education")}
                />
            </div>
        </div>
    )

    // If not mounted yet, return null to avoid hydration mismatch
    if (!mounted) return null

    // If on mobile, render the app content directly without the phone frame
    if (isMobile) {
        return <AppContent/>
    }

    // On desktop, render the phone frame with the app content inside
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center p-4 absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#333333_1px,transparent_1px),linear-gradient(to_bottom,#333333_1px,transparent_1px)] bg-[size:4rem_4rem]">
            <div className="max-w-[375px] w-full">
                {/* iPhone Frame */}
                <div className="bg-black dark:bg-[#333333] rounded-[40px] p-2 shadow-xl">
                    {/* Status Bar */}
                    <div className="h-8 bg-gray-800 dark:bg-black text-white flex items-center justify-between px-6 text-xs rounded-t-[40px]">
                        <span>9:41</span>
                        <div className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-white"></span>
                            <span className="h-2 w-2 rounded-full bg-white"></span>
                            <span className="h-2 w-2 rounded-full bg-white"></span>
                            <span className="h-2 w-2 rounded-full bg-white"></span>
                            <span className="ml-1">100%</span>
                        </div>
                    </div>
                    <AppContent/>

                    {/* Home Button */}
                    <div className="mt-2 flex justify-center">
                        <div className="w-24 h-1 bg-gray-600 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TabButton({
                       icon,
                       label,
                       isActive,
                       onClick,
                   }: {
    icon: React.ReactNode
    label: string
    isActive: boolean
    onClick: () => void
}) {
    return (
        <button
            className={cn(
                "flex flex-col items-center justify-center text-xs w-[20%] py-1 rounded-lg transition-colors",
                isActive
                    ? "text-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700",
            )}
            onClick={onClick}
        >
            {icon}
            <span className="mt-1">{label}</span>
        </button>
    )
}

function ScreenHeader({title, goBack}: { title: string; goBack?: () => void }) {
    return (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center sticky top-0 z-10 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xs">
            {goBack && (
                <button onClick={goBack} className="mr-2 text-gray-800 dark:text-gray-200">
                    <ArrowLeft size={20}/>
                </button>
            )}
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>
        </div>
    )
}

function ProfilePhoto() {
    return (
        <div className="w-24 h-24 bg-blue-200 rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">
            <Image
                src="/profile.png"
                width={100}
                height={100}
                className="rounded-full"
                alt="profile photo"
            />
        </div>
    )
}

function HomeScreen({ navigateTo }: { navigateTo: (screen: string) => void }) {
    return (
        <div className="h-full">
            <div className="p-6 flex flex-col items-center text-center">
                <ProfilePhoto />

                <h1 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">Meet Vora</h1>
                <h2 className="text-blue-500 dark:text-blue-400 font-medium mb-4">Mobile Application Developer</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Experienced mobile developer specializing in Kotlin, Swift, and React Native.
                </p>

                <div className="grid grid-cols-2 gap-4 w-full">
                    <AppButton icon={<Code size={24} />} label="Skills" onClick={() => navigateTo("skills")} />
                    <AppButton icon={<Layers size={24} />} label="Projects" onClick={() => navigateTo("projects")} />
                    <AppButton icon={<Briefcase size={24} />} label="Experience" onClick={() => navigateTo("experience")} />
                    <AppButton icon={<GraduationCap size={24} />} label="Education" onClick={() => navigateTo("education")} />
                    <AppButton
                        icon={<Mail size={24} />}
                        label="Contact"
                        onClick={() => navigateTo("contact")}
                        className="col-span-2"
                    />
                </div>

                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                    <a
                        href="/Mobile Application Developer - Resume - Meet Vora.pdf"
                        download
                        className="mt-2 inline-flex items-center text-blue-500 dark:text-blue-400 hover:underline"
                    >
                        <FileText size={16} className="mr-1" />
                        Download Resume
                    </a>
                </div>
            </div>
        </div>
    )
}

function AppButton({
                       icon,
                       label,
                       onClick,
                       className,
                   }: {
    icon: React.ReactNode
    label: string
    onClick: () => void
    className?: string
}) {
    return (
        <button
            className={cn(
                "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl p-4 flex flex-col items-center justify-center transition-colors",
                className,
            )}
            onClick={onClick}
        >
            <div className="text-blue-500 dark:text-blue-400 mb-2">{icon}</div>
            <span className="font-medium text-gray-800 dark:text-gray-200">{label}</span>
        </button>
    )
}

function SkillsScreen({goBack}: { goBack: () => void }) {
    const skillCategories = [
        {
            title: "Programming Languages & Frameworks",
            skills: [
                "Kotlin (Jetpack Compose, XML, KMP)",
                "Swift (SwiftUI, UIKit)",
                "Java",
                "JavaScript",
                "TypeScript",
                "ReactNative",
            ],
        },
        {
            title: "Tools & Platforms",
            skills: ["Android Studio", "Xcode", "VS Code", "WebStorm", "Figma", "Git", "Git-flow", "GitLab", "Docker"],
        },
        {
            title: "Mobile Development",
            skills: [
                "BLE Integration",
                "DevOps (Jenkins, Fastlane, TestFlight, App Center)",
                "MVVM",
                "REST",
                "Google Maps",
                "Push Notifications",
                "Deeplink",
                "SQLite",
                "RoomDB",
                "CoreData",
                "FirestoreDB",
                "Realm",
            ],
        },
        {
            title: "Other",
            skills: ["Agile & Scrum methodologies", "CI/CD automation", "Performance Optimization"],
        },
    ]

    return (
        <div>
            <ScreenHeader title="Skills" goBack={goBack}/>
            <div className="p-4 space-y-6">
                {skillCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                        <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{category.title}</h2>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, skillIndex) => (
                                <span
                                    key={skillIndex}
                                    className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                                >
                  {skill}
                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function ProjectsScreen({ goBack }: { goBack: () => void }) {
    const projects = [
        {
            title: "ORBCOMM Field Support Tool",
            company: "Orbcomm",
            playStore: "https://play.google.com/store/apps/details?id=com.orbcomm.iot.mobile.fst",
            appStore: "https://apps.apple.com/ca/app/orbcomm-field-support-tool/id1469609179",
            details: [
                "Led the transition of the app to Kotlin Multiplatform (KMP) to unify business logic across Android and iOS, improving maintainability and code efficiency.",
                "Originally developed native Android and iOS apps using MVVM architecture for BLE device setup and configuration.",
                "Integrated Google Maps API and REST API for enhanced functionality.",
                "Implemented robust error handling and data synchronization features.",
                "Collaborated with UX/UI designers for an intuitive user experience.",
                "Optimized app performance for speed and reliability.",
            ],
        },
        {
            title: "ORBCOMM Installation for HLAG",
            company: "Orbcomm",
            playStore: "https://play.google.com/store/apps/details?id=com.orbcomm.hapag_lloyd",
            appStore: "https://apps.apple.com/ca/app/orbcomm-installation-for-hlag/id1636718140",
            details: [
                "Developed a tool for pairing CT1000 device containers, optimizing installation speed and reliability.",
                "Utilized Bluetooth and device communication protocols for seamless integration.",
                "Conducted rigorous testing and debugging for a flawless user experience.",
                "Created comprehensive documentation for end-users and support teams.",
                "Integrated feedback to make iterative improvements.",
            ],
        },
        {
            title: "Printing Label Maker",
            company: "Own Application",
            playStore: "https://play.google.com/store/apps/details?id=md.printinglabelmaker",
            details: [
                "Developed an Android app with MVVM architecture and Firebase for cloud storage.",
                "Implemented OTP-based authentication for secure login.",
                "Designed features for label customization and printing.",
                "Ensured smooth synchronization between local and cloud data.",
                "Conducted user testing to enhance the overall experience.",
            ],
        },
        {
            title: "Prachar Weekly",
            company: "Freelance",
            playStore: "https://play.google.com/store/apps/details?id=com.prachar.weekly&hl=en",
            details: [
                "Created a local news app using Kotlin for a news company.",
                "Implemented features for news articles, notifications, and multimedia.",
                "Designed a responsive interface for local readers.",
                "Utilized analytics to track user engagement.",
                "Incorporated user feedback for continuous improvement.",
            ],
        },
        {
            title: "MyEDU Bus Tracker",
            company: "Hodusoft Pvt. Ltd.",
            details: [
                "Developed an Android app for real-time school bus tracking using Firebase for data transfer.",
                "Implemented GPS tracking and real-time notifications.",
                "Designed and optimized the user interface for ease of use.",
                "Integrated analytics to monitor app usage and performance.",
                "Addressed user feedback to enhance app features.",
            ],
        },
        {
            title: "Image English School",
            company: "Hodusoft Pvt. Ltd.",
            details: [
                "Built a communication platform for parents, teachers, and students.",
                "Implemented messaging, notifications, and document sharing features.",
                "Designed an intuitive interface for user interaction.",
                "Managed updates and bug fixes based on user feedback.",
                "Ensured compliance with data protection regulations.",
            ],
        },
        {
            title: "HoduPhone",
            company: "Hodusoft Pvt. Ltd.",
            playStore: "https://play.google.com/store/apps/details?id=com.hodupbx.hoduphone",
            details: [
                "Developed an SIP client app for HoduPBX for cost-effective VoIP communication.",
                "Integrated VoIP features including call forwarding and voicemail.",
                "Optimized performance for minimal latency and high-quality calls.",
                "Coordinated with network engineers for reliable connectivity.",
                "Provided ongoing support and maintenance.",
            ],
        },
    ]

    return (
        <div>
            <ScreenHeader title="Projects" goBack={goBack} />
            <div className="p-4 space-y-6 pb-16">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                    >
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="font-bold text-lg text-gray-900 dark:text-white">{project.title}</h2>
                            <p className="text-sm text-blue-600 dark:text-blue-400">{project.company}</p>

                            {/* App Store Links */}
                            {(project.playStore || project.appStore) && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {project.playStore && (
                                        <a
                                            href={project.playStore}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded"
                                        >
                                            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
                                            </svg>
                                            Play Store
                                        </a>
                                    )}
                                    {project.appStore && (
                                        <a
                                            href={project.appStore}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded"
                                        >
                                            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M8.8086 14.9194l6.1107-11.0368c.0837-.1513.1682-.302.2437-.4584.0685-.142.1267-.2854.1646-.4403.0803-.3259.0588-.6656-.066-.9767-.1238-.3095-.3417-.5678-.6201-.7355a1.4175 1.4175 0 0 0-.921-.1924c-.3207.043-.6135.1935-.8443.4288-.1094.1118-.1996.2361-.2832.369-.092.1463-.175.2979-.259.4492l-.3864.6979-.3865-.6979c-.0837-.1515-.1667-.303-.2587-.4492-.0837-.1329-.1739-.2572-.2835-.369-.2305-.2353-.5233-.3857-.844-.429a1.4181 1.4181 0 0 0-.921.1926c-.2784.1677-.4964.426-.6203.7355-.1246.311-.1461.6508-.066.9767.038.155.0962.2984.1648.4403.0753.1564.1598.307.2437.4584l1.248 2.2543-4.8625 8.7825H2.0295c-.1676 0-.3351-.0007-.5026.0092-.1522.009-.3004.0284-.448.0714-.3108.0906-.5822.2798-.7783.548-.195.2665-.3006.5929-.3006.9279 0 .3352.1057.6612.3006.9277.196.2683.4675.4575.7782.548.1477.043.296.0623.4481.0715.1675.01.335.009.5026.009h13.0974c.0171-.0357.059-.1294.1-.2697.415-1.4151-.6156-2.843-2.0347-2.843zM3.113 18.5418l-.7922 1.5008c-.0818.1553-.1644.31-.2384.4705-.067.1458-.124.293-.1611.452-.0785.3346-.0576.6834.0645 1.0029.1212.3175.3346.583.607.7549.2727.172.5891.2416.9013.1975.3139-.044.6005-.1986.8263-.4402.1072-.1148.1954-.2424.2772-.3787.0902-.1503.1714-.3059.2535-.4612L6 19.4636c-.0896-.149-.9473-1.4704-2.887-.9218m20.5861-3.0056a1.4707 1.4707 0 0 0-.779-.5407c-.1476-.0425-.2961-.0616-.4483-.0705-.1678-.0099-.3352-.0091-.503-.0091H18.648l-4.3891-7.817c-.6655.7005-.9632 1.485-1.0773 2.1976-.1655 1.0333.0367 2.0934.546 3.0004l5.2741 9.3933c.084.1494.167.299.2591.4435.0837.131.1739.2537.2836.364.231.2323.5238.3809.8449.4232.3192.0424.643-.0244.9217-.1899.2784-.1653.4968-.4204.621-.7257.1246-.3072.146-.6425.0658-.9641-.0381-.1529-.0962-.2945-.165-.4346-.0753-.1543-.1598-.303-.2438-.4524l-1.216-2.1662h1.596c.1677 0 .3351.0009.5029-.009.1522-.009.3007-.028.4483-.0705a1.4707 1.4707 0 0 0 .779-.5407A1.5386 1.5386 0 0 0 24 16.452a1.539 1.539 0 0 0-.3009-.9158Z" />
                                            </svg>
                                            App Store
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <ul className="space-y-1">
                                {project.details.map((detail, detailIndex) => (
                                    <li key={detailIndex} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                                        <span className="text-blue-500 dark:text-blue-400 mr-2 mt-1">•</span>
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function ExperienceScreen({goBack}: { goBack: () => void }) {
    const experiences = [
        {
            company: "ORBCOMM",
            position: "Mobile Application Developer",
            period: "March 2021 - Present",
            responsibilities: [
                "Developed Android (Jetpack Compose) and iOS (SwiftUI) apps following MVVM architecture",
                "Led Kotlin Multiplatform (KMP) initiative, reducing code duplication and improving efficiency by 30%",
                "Integrated BLE devices for real-time data transfer and communication",
                "Designed and implemented an offline-first architecture",
                "Optimized CI/CD workflows (GitLab, Fastlane, App Center)",
                "Enhanced app performance",
                "Conducted code reviews and mentored junior developers",
                "Implemented biometric authentication",
                "Collaborated with hardware engineers for IoT integration",
            ],
        },
        {
            company: "Freelancer",
            position: "Mobile Application Developer",
            period: "June 2019 - Nov. 2019",
            responsibilities: [
                "Developed a news app using ReactNative with an intuitive UI and smooth performance",
                "Delivered high-quality applications within deadlines while incorporating client feedback",
            ],
        },
        {
            company: "Ecosmob Pvt. Ltd.",
            position: "Mobile Application Developer",
            period: "Sept. 2018 - June 2019",
            responsibilities: [
                "Built VoIP-based Android applications using Kotlin, optimizing call quality and performance",
                "Trained junior developers and contributed to the hiring process for Android engineers",
            ],
        },
        {
            company: "Hodusoft Pvt. Ltd.",
            position: "Mobile Application Developer",
            period: "May 2016 - Sept. 2018",
            responsibilities: [
                "Developed an education-based mobile app for schools in Java, later migrating it to Kotlin (MVVM)",
                "Created a driver application with real-time school bus tracking using Firebase and Google Maps API",
                "Integrated payment gateways for seamless in-app transactions",
                "Published multiple white-labeled Android applications",
            ],
        },
    ]

    return (
        <div>
            <ScreenHeader title="Experience" goBack={goBack}/>
            <div className="p-4 space-y-6 pb-20">
                {experiences.map((exp, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="font-bold text-lg text-gray-900 dark:text-white">{exp.company}</h2>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                {exp.period}
              </span>
                        </div>
                        <h3 className="text-blue-600 dark:text-blue-400 font-medium mb-2">{exp.position}</h3>
                        <ul className="space-y-1">
                            {exp.responsibilities.map((resp, respIndex) => (
                                <li key={respIndex} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                                    <span className="text-blue-500 dark:text-blue-400 mr-2 mt-1">•</span>
                                    <span>{resp}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

function EducationScreen({goBack}: { goBack: () => void }) {
    const education = [
        {
            institution: "Algonquin College",
            degree: "Computer Programmer Diploma",
            period: "2019 - 2021",
            details: [
                "Expertise in Java, OOP, design patterns, databases (SQL, MySQL, Oracle)",
                "Experience in web & mobile development (JavaScript, PHP, Kotlin, Firebase) and Linux/network programming",
                "Applied agile methodologies and SDLC in real-world projects",
            ],
        },
        {
            institution: "Gujarat Technological University",
            degree: "Bachelor of Engineering - Computer Engineering",
            period: "2011 - 2015",
            details: [
                "Strong foundation in C, C++, Java, data structures, algorithms, and problem-solving",
                "Expertise in computer architecture, cybersecurity, and OS with hands-on Android development",
            ],
        },
    ]

    return (
        <div>
            <ScreenHeader title="Education" goBack={goBack}/>
            <div className="p-4 space-y-6">
                {education.map((edu, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="font-bold text-lg text-gray-900 dark:text-white">{edu.institution}</h2>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                {edu.period}
              </span>
                        </div>
                        <h3 className="text-blue-600 dark:text-blue-400 font-medium mb-2">{edu.degree}</h3>
                        <ul className="space-y-1">
                            {edu.details.map((detail, detailIndex) => (
                                <li key={detailIndex} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                                    <span className="text-blue-500 dark:text-blue-400 mr-2 mt-1">•</span>
                                    <span>{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

function ContactScreen({goBack}: { goBack: () => void }) {
    return (
        <div>
            <ScreenHeader title="Contact" goBack={goBack}/>
            <div className="p-6 flex flex-col items-center">
                <ProfilePhoto/>
                <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">Meet Vora</h2>
                <p className="text-blue-500 dark:text-blue-400 font-medium mb-6">Mobile Application Developer</p>

                <div className="w-full space-y-4">
                    <a
                        href="mailto:meetvora1994@icloud.com"
                        className="flex items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200"
                    >
                        <Mail className="text-blue-500 dark:text-blue-400 mr-3" size={20}/>
                        <span>meetvora1994@icloud.com</span>
                    </a>

                    <a
                        href="https://meetvora1994.github.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200"
                    >
                        <Code className="text-blue-500 dark:text-blue-400 mr-3" size={20}/>
                        <span>meetvora1994.github.io</span>
                    </a>

                    <a
                        href="/Mobile Application Developer - Resume - Meet Vora.pdf"
                        download
                        className="flex items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-800 dark:text-gray-200"
                    >
                        <FileText className="text-blue-500 dark:text-blue-400 mr-3" size={20}/>
                        <span>Download Resume</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

