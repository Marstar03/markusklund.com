import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Software Developer at Norsk Helsenett
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Developed an admin interface for managing patient test results.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
            <strong>Tech Stack:</strong> .NET/C#, MongoDB, Docker, Kafka, Auth0.
          </p>
        </div>
      ),
    },
    {
      title: "Early 2024",
      content: (
        <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Teaching Assistant at NTNU
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Assisted students with Java programming & approved assignments for
            the Object-Oriented Programming (TDT4100) course.
          </p>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            DevOps Engineer & Project Leader at Orbit NTNU
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Managed server administration and automation/web projects.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
            <strong>Tech Stack:</strong> JavaScript, Python, Docker, CI/CD,
            Linux, Google Auth.
          </p>
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Summer Job at Hønefoss Home Care
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
            Delivered food & medicine and assisted elderly residents.
          </p>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            CTO, Developer & Recruitment Manager at Abakus Veldedige Forening
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Supported the aid organization Gi Effektivt and led the 2023
            recruitment process.
          </p>
        </div>
      ),
    },
    {
      title: "Early 2022",
      content: (
        <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Started M.Sc. in Computer Science at NTNU
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
            Specialization in **Efficient Computer Systems**.
          </p>
        </div>
      ),
    },
    {
      title: "2019",
      content: (
        <div>
            <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            High School at Tyrifjord
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
            Science-focused curriculum with Math R1 + R2 and Physics 1 + 2.
          </p>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
