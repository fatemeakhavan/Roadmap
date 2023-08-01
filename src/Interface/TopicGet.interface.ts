export interface ITopicGet{
    id:number;
    children: ITopicGet[];
    name:string;
    newTopic:boolean;
    group:string;
    level:number;
    order:number;
}