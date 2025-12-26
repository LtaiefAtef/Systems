import Link from "next/link";
import NavLink from "./nav-link";
export default function Sidebar() {
    return <nav className="side-bar">
        <div className="logo"/>
        <ul className="links">
            <li><NavLink href="/dashboard">Overview</NavLink></li>
            <li><NavLink href="/dashboard/auth-service">Authentication Service</NavLink></li>
            <li><NavLink href="/dashboard/billing-service">Billing Service</NavLink></li>
            <li><NavLink href="/dashboard/course-service">Course Service</NavLink></li>
            <li><NavLink href="/dashboard/grade-service">Grade Service</NavLink></li>
            <li><NavLink href="/dashboard/student-service">Student Service</NavLink></li>
        </ul>
        <Link href="/" className="exit">Exit</Link>
    </nav>
};
