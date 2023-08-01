export interface IQuestion{
    context: string;
    correctAnswer: string;
    user_id: number;
    topic_id: number;
    id:number;
    answers?: {
        context:string;
        user_id: number;
        question_id:number;
    }[];
}
