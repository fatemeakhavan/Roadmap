export interface ITopic{
    course_id?: number;
    name: string;
    description: string;
    level:number;
    order:number;
    id?: number;
}

export interface ITopicAdd extends ITopic {
    parent_id: number
}

