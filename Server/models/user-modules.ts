export type CoctailType = {
    id: number,
    name: string,
    image: string,
    ingredient: string[],
    countUngredient: number,
    author: string,
    likes: number,
    saved: number,
    watched: number,
    resept: JSON    
}

export type ingredientType = {
    id: number,
    name: string,
    image: string
}