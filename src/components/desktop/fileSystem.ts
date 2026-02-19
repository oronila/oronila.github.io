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
                name: "Install.bat",
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
        content: "essay_draft",
    },
];

export const PROJECTS_DATA: FileSystemItem[] = [
    {
        id: "fynopsis-folder",
        name: "Fynopsis",
        type: "folder",
        icon: "/icons/pack/folder.svg",
        children: [
            {
                id: "fynopsis-info",
                name: "about.txt",
                type: "file",
                icon: "/icons/pixel/file.svg",
                content: "about_fynopsis",
            },
            {
                id: "fynopsis-browser",
                name: "fynopsis.ai",
                type: "file",
                icon: "/icons/pack/svgs-small/Google Chrome.svg",
                content: "fynopsis",
            },
        ],
    },
    {
        id: "genesis-folder",
        name: "Genesis",
        type: "folder",
        icon: "/icons/pack/folder.svg",
        children: [
            {
                id: "genesis-info",
                name: "about.txt",
                type: "file",
                icon: "/icons/pixel/file.svg",
                content: "about_genesis",
            },
            {
                id: "genesis-browser",
                name: "genesisut.com",
                type: "file",
                icon: "/icons/pack/svgs-small/Google Chrome.svg",
                content: "genesis",
            },
        ],
    },
    {
        id: "personal-website-folder",
        name: "Personal Website",
        type: "folder",
        icon: "/icons/pack/folder.svg",
        children: [
            {
                id: "personal-website-info",
                name: "about.txt",
                type: "file",
                icon: "/icons/pixel/file.svg",
                content: "about_personal",
            },
            {
                id: "personal-website-browser",
                name: "oronila.github.io",
                type: "file",
                icon: "/icons/pack/svgs-small/Google Chrome.svg",
                content: "personal_website_iframe",
            },
        ],
    },
    {
        id: "nebula-folder",
        name: "Nebula",
        type: "folder",
        icon: "/icons/pack/folder.svg",
        children: [
            {
                id: "nebula-info",
                name: "about.txt",
                type: "file",
                icon: "/icons/pixel/file.svg",
                content: "about_nebula",
            },
            {
                id: "nebula-browser",
                name: "trynebula.ai",
                type: "file",
                icon: "/icons/pack/svgs-small/Google Chrome.svg",
                content: "nebula",
            },
        ],
    },
];

export const DESKTOP_DATA: FileSystemItem[] = [
    {
        id: "about_shortcut",
        name: "About Me",
        type: "file",
        icon: "/icons/pack/svgs-small/Google Docs.svg",
        content: "about", // Special ID for opening app
    },
    {
        id: "projects_shortcut",
        name: "Projects",
        type: "folder", // It's actually a folder in the file system logic
        icon: "/icons/pack/folder.svg",
        children: PROJECTS_DATA,
    },
    {
        id: "resume_shortcut",
        name: "Resume",
        type: "file",
        icon: "/icons/pack/svgs-small/LinkedIn.svg",
        content: "resume",
    },
    {
        id: "terminal_shortcut",
        name: "Terminal",
        type: "file",
        icon: "/icons/pixel/terminal.svg",
        content: "terminal",
    },
    {
        id: "music_shortcut",
        name: "Music",
        type: "file",
        icon: "/icons/pack/svgs-small/Spotify.svg",
        content: "music",
    },
    {
        id: "games_shortcut",
        name: "Games",
        type: "file",
        icon: "/icons/pack/svgs-small/Steam.svg",
        content: "games",
    },
    {
        id: "contact_shortcut",
        name: "Browser",
        type: "file",
        icon: "/icons/pack/svgs-small/Google Chrome.svg",
        content: "contact",
    },
    {
        id: "trash_shortcut",
        name: "Trash",
        type: "folder",
        icon: "/icons/pixel/trash.svg",
        children: TRASH_DATA,
    },
];
