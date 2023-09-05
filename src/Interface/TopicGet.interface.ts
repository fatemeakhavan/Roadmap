export interface ITopicGet{
    id:number;
    status: "DONE" | "IN_PROGRESS" | "SKIP" | "DEFAULT";
    children: ITopicGet[];
    name:string;
    newTopic:boolean;
    group:string;
    level:number;
    order:number;
}