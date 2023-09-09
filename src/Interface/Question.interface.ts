export interface IQuestion{
    context?: string;
    correctAnswer?: string;
    user_id: number;
    topic_id: number;
    id:number;

    answers?: {
        id:number;
        context:string;
        user_firstname:string;
        user_lastname:string;
        user_id: number;
        question_id:number;

    }[];
}
