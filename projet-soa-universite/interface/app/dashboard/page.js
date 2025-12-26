"use client"
import { Bar } from "react-chartjs-2"
import course_icon from "@/public/assets/courses.png"
import income_icon from "@/public/assets/income.png"
import student_icon from "@/public/assets/student.png"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);
export default function Dashboard(params) {
    const data = {
    labels: ["Networks", "Databases", "Algorithms", "Web Dev"],
    datasets: [
    {
    label: "Average Grade (/20)",
    data: [14.2, 12.8, 15.6, 16.1],
    backgroundColor: [
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 99, 132, 0.7)",
        "rgba(255, 205, 86, 0.7)",
        "rgba(75, 192, 192, 0.7)",
    ],
    borderRadius: 10,
    },
    ],
    };
    const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
        display: true,
        },
        tooltip: {
        callbacks: {
            label: (ctx) => `${ctx.parsed.y} / 20`,
        },
        },
    },
    scales: {
        y: {
        min: 0,
        max: 20,
        ticks: {
            stepSize: 2,
        },
        title: {
            display: true,
            text: "Average Grade",
        },
        },
        x: {
        title: {
            display: true,
            text: "Course",
        },
        },
    },
    };


    return <div className="overview">
        <header><div className="logo"></div> IP: 192.168.0.8</header>
        <div className="cards">
            <div className="card">
                <img src={income_icon.src}/>
                <div className="text">
                    <h4>120DT</h4>
                    <h1>Total Income</h1>
                </div>
            </div>
            <div className="card">
                <img src={student_icon.src}/>
                <div className="text">
                    <h4>182</h4>
                    <h1>Students</h1>
                </div>
            </div>
            <div className="card">
                <img src={course_icon.src}/>
                <div className="text">
                    <h4>100</h4>
                    <h1>Courses</h1>
                </div>
            </div>
        </div>
        <div className="container">
            <div style={{width:"60%",height:"400px"}}>
                <Bar data={data} options={options}/>
            </div>
            <div>
                
            </div>
        </div>
    </div>
};
