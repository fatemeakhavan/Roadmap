export interface ITopic{
    course_id?: number;
    description: string;
    group: string;
    id?: number;
    name: string;
    newTopic: boolean;
    parent_id?: number;
    type?: "MAIN" | "DETAIL";
}
