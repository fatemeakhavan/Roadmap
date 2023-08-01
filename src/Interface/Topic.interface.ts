export interface ITopic{
    course_id?: number;
    name: string;
    description: string;
    newTopic: boolean;
    group: string;
    level:number;
    order:number;
    id?: number;
}

export interface ITopicAdd extends ITopic {
    parent_id: number
}
