export interface IUser {
    id: number;
    login: string;
    avatar_url: string;
    followers: number;
    following: number;
    public_repos: number;
    name: string | null;
    company: string | null;
    location: string | null;
    twitter_username: string | null;
    bio: string | null;
    blog: string | null;
    message: string | null;
}