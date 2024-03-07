import type { ICartItemEntity } from "./ICartItemEntity"

export interface ICartEntity {
    id: string,
    items: ICartItemEntity[]
}