export type FileSystemItem = {
    id: string;
    name: string;
    type: "file" | "folder";
    icon?: string;
    content?: string; // For files
    children?: FileSystemItem[]; // For folders
};

export const TRASH_DATA: FileSystemItem[] = [
    {
        id: "valorant-folder",
        name: "Valorant",
        type: "folder",
        icon: "/icons/pack/folder.svg",
        children: [
            {
                id: "install-log",
                name: "Install.log",
                type: "file",
                icon: "/icons/pixel/file.svg",
                content: "Installation failed. Reason: Skill issue.",
            },
            {
                id: "youtube_link",
                name: "retired.mp4",
                type: "file",
                icon: "/icons/pack/svgs-small/Youtube.svg",
                content: "youtube",
            },
            {
                id: "rank_image",
                name: "rank.png",
                type: "file",
                icon: "/icons/pixel/file.svg",
                content: "image_viewer",
            },
        ],
    },
    {
        id: "old-essay",
        name: "Essay_Draft_v1.txt",
        type: "file",
        icon: "/icons/pixel/file.svg",
        content: "The catcher in the rye is...",
    },
];

export const PROJECTS_DATA: FileSystemItem[] = [
    {
        id: "project-1",
        name: "Personal Website",
        type: "folder",
        icon: "/icons/pack/folder.svg",
        children: [
            {
                id: "readme",
                name: "README.md",
                type: "file",
                icon: "/icons/pixel/file.svg",
                content: "# Personal Website\nBuilt with Next.js and Tailwind.",
            },
            {
                id: "src",
                name: "src",
                type: "folder",
                children: [],
                icon: "/icons/pack/folder.svg",
            }
        ],
    },
    {
        id: "project-2",
        name: "AI Experiments",
        type: "folder",
        children: [],
        icon: "/icons/pack/folder.svg",
    },
];
