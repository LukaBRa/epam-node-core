import type { ICartItemEntity } from "./ICartEntity";

export interface IOrderEntity {
    id: string,
    userId: string,
    cartId: string,
    items: ICartItemEntity[],
    payment: {
        type: string,
        address: string,
        creditCard: string
    },
    delivery: {
        type: string,
        address: string
    },
    comments: string,
    status: string,
    total: number,
    createdAt: Date,
    updatedAt: Date
}