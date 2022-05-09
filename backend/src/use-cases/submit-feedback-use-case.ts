import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedback-repository";

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ) { }

    async execute(req: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = req;

        if(!type) {
            throw new Error("Type is required.");
        };

        if(!comment) {
            throw new Error("Comment is required")
        };

        if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
            throw new Error("Invalid screenshot format.")
        };

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot,
        });

        await this.mailAdapter.sendMail({
            subject: "Novo Feedback",
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
                `<p>Tipo do Feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `<p>Image: <img src="${screenshot}" alt="" title="" /></p>`,
                `</div>`
            ].join("\n")
        })
    };
};