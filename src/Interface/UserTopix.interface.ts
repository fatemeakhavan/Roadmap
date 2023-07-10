export interface IUserTopic{
    user_id:"number";
    topic_id:"number";
    status: "DONE" | "IN_PROGRESS" | "SKIP" | "DEFAULT";
}