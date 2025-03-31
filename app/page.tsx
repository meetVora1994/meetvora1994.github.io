"use client"

import type React from "react"

import {useState, useEffect} from "react"
import {Home, Briefcase, GraduationCap, Code, Mail, ArrowLeft, FileText} from "lucide-react"
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
            <div className="h-full overflow-y-auto pb-5">
                {activeScreen === "home" && <HomeScreen navigateTo={navigateTo}/>}
                {activeScreen === "skills" && <SkillsScreen goBack={goBack}/>}
                {activeScreen === "experience" && <ExperienceScreen goBack={goBack}/>}
                {activeScreen === "education" && <EducationScreen goBack={goBack}/>}
                {activeScreen === "contact" && <ContactScreen goBack={goBack}/>}
            </div>

            {/* Tab Bar */}
            <div className="h-16 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between absolute bottom-0 w-full px-2">
                <TabButton
                    icon={<Home size={20}/>}
                    label="Home"
                    isActive={activeScreen === "home"}
                    onClick={() => navigateTo("home")}
                />
                <TabButton
                    icon={<Code size={20}/>}
                    label="Skills"
                    isActive={activeScreen === "skills"}
                    onClick={() => navigateTo("skills")}
                />
                <TabButton
                    icon={<Briefcase size={20}/>}
                    label="Work"
                    isActive={activeScreen === "experience"}
                    onClick={() => navigateTo("experience")}
                />
                <TabButton
                    icon={<GraduationCap size={20}/>}
                    label="Education"
                    isActive={activeScreen === "education"}
                    onClick={() => navigateTo("education")}
                />
                <TabButton
                    icon={<Mail size={20}/>}
                    label="Contact"
                    isActive={activeScreen === "contact"}
                    onClick={() => navigateTo("contact")}
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
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center p-4">
            <div className="max-w-[375px] w-full">
                {/* iPhone Frame */}
                <div className="bg-black rounded-[40px] p-2 shadow-xl">
                    {/* Status Bar */}
                    <div className="h-8 bg-gray-800 dark:bg-black text-white flex items-center justify-between px-6 text-xs">
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
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center sticky top-0 z-10 bg-white dark:bg-gray-900">
            {goBack && (
                <button onClick={goBack} className="mr-2 text-gray-800 dark:text-gray-200">
                    <ArrowLeft size={20}/>
                </button>
            )}
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>
        </div>
    )
}

function HomeScreen({navigateTo}: { navigateTo: (screen: string) => void }) {
    return (
        <div className="h-full">
            <div className="p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-blue-500 rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    MV
                </div>

                <h1 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">Meet Vora</h1>
                <h2 className="text-blue-500 dark:text-blue-400 font-medium mb-4">Mobile Application Developer</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Experienced mobile developer specializing in Kotlin, Swift, and cross-platform development.
                </p>

                <div className="grid grid-cols-2 gap-4 w-full">
                    <AppButton icon={<Code size={24}/>} label="Skills" onClick={() => navigateTo("skills")}/>
                    <AppButton icon={<Briefcase size={24}/>} label="Experience" onClick={() => navigateTo("experience")}/>
                    <AppButton icon={<GraduationCap size={24}/>} label="Education" onClick={() => navigateTo("education")}/>
                    <AppButton icon={<Mail size={24}/>} label="Contact" onClick={() => navigateTo("contact")}/>
                </div>

                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                    <a
                        href="/Mobile Application Developer - Resume - Meet Vora.pdf"
                        download
                        className="mt-2 inline-flex items-center text-blue-500 dark:text-blue-400 hover:underline"
                    >
                        <FileText size={16} className="mr-1"/>
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
                   }: {
    icon: React.ReactNode
    label: string
    onClick: () => void
}) {
    return (
        <button
            className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl p-4 flex flex-col items-center justify-center transition-colors"
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
            period: "June 2019 - November 2019",
            responsibilities: [
                "Developed a news app using ReactNative with an intuitive UI and smooth performance",
                "Delivered high-quality applications within deadlines while incorporating client feedback",
            ],
        },
        {
            company: "Ecosmob Pvt. Ltd.",
            position: "Mobile Application Developer",
            period: "September 2018 - June 2019",
            responsibilities: [
                "Built VoIP-based Android applications using Kotlin, optimizing call quality and performance",
                "Trained junior developers and contributed to the hiring process for Android engineers",
            ],
        },
        {
            company: "Hodusoft Pvt. Ltd.",
            position: "Mobile Application Developer",
            period: "May 2016 - September 2018",
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
                <div className="w-20 h-20 bg-blue-500 rounded-full mb-4 flex items-center justify-center text-white text-xl font-bold">
                    MV
                </div>
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

