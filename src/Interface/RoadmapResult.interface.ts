export interface IRoadmapResult<T>{
    result: T;
    errorUrl:string;
    total:number;
    referenceNumber:number;
    message:string;
    status:string;
    timestamp:number;
}