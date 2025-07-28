export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  isVerified?: boolean;
};

export type Comment = {
  id: string;
  user: User;
  text: string;
  timestamp: string;
};

export type Video = {
  id: string;
  user: User;
  videoUrl: string;
  thumbnailUrl: string;
  description: string;
  likes: number;
  comments: Comment[];
  shares: number;
  topic: string;
};

export const MOCK_USERS: User[] = [
  { id: "user-1", name: "Alex_Codes", avatarUrl: "https://placehold.co/100x100.png", isVerified: true },
  { id: "user-2", name: "Bella_Designs", avatarUrl: "https://placehold.co/100x100.png" },
  { id: "user-3", name: "Casey_Eats", avatarUrl: "https://placehold.co/100x100.png", isVerified: true },
  { id: "user-4", name: "Dana_Dances", avatarUrl: "https://placehold.co/100x100.png" },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: "comment-1",
    user: MOCK_USERS[1],
    text: "This is amazing! 🔥",
    timestamp: "2h ago",
  },
  {
    id: "comment-2",
    user: MOCK_USERS[2],
    text: "I can't stop watching this! 😂",
    timestamp: "1h ago",
  },
  {
    id: "comment-3",
    user: MOCK_USERS[3],
    text: "So talented! Keep it up!",
    timestamp: "30m ago",
  },
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: "video-1",
    user: MOCK_USERS[0],
    videoUrl: "",
    thumbnailUrl: "https://placehold.co/576x1024.png",
    description:
      "Just deployed my new side project! Check out this coding timelapse. #devlife #coding #react",
    likes: 1203,
    comments: MOCK_COMMENTS.slice(0, 2),
    shares: 45,
    topic: "Coding Timelapse",
  },
  {
    id: "video-2",
    user: MOCK_USERS[1],
    videoUrl: "",
    thumbnailUrl: "https://placehold.co/576x1024.png",
    description: "My latest UI design concept for a music app. What do you think? #uidesign #figma #design",
    likes: 3450,
    comments: MOCK_COMMENTS.slice(1, 3),
    shares: 210,
    topic: "UI Design Process",
  },
  {
    id: "video-3",
    user: MOCK_USERS[2],
    videoUrl: "",
    thumbnailUrl: "https://placehold.co/576x1024.png",
    description: "Making the perfect carbonara. It's all about the technique! 🍝 #foodie #cooking #pasta",
    likes: 876,
    comments: MOCK_COMMENTS,
    shares: 88,
    topic: "Cooking Carbonara",
  },
  {
    id: "video-4",
    user: MOCK_USERS[3],
    videoUrl: "",
    thumbnailUrl: "https://placehold.co/576x1024.png",
    description: "Freestyle dance session in my studio. Feeling the beat! 💃 #dance #hiphop #freestyle",
    likes: 5600,
    comments: [],
    shares: 780,
    topic: "Freestyle Dance",
  },
    {
    id: "video-5",
    user: MOCK_USERS[0],
    videoUrl: "",
    thumbnailUrl: "https://placehold.co/576x1024.png",
    description:
      "A quick tutorial on how to use the new CSS parent selector. Game changer! #css #webdev #tutorial",
    likes: 2100,
    comments: [MOCK_COMMENTS[0]],
    shares: 150,
    topic: "CSS Tutorial",
  },
  {
    id: "video-6",
    user: MOCK_USERS[3],
    videoUrl: "",
    thumbnailUrl: "https://placehold.co/576x1024.png",
    description:
      "Learning a new choreography. It's challenging but so rewarding. #dancechallenge #kpop",
    likes: 9800,
    comments: MOCK_COMMENTS,
    shares: 1200,
    topic: "Dance Choreography",
  },
];
