import { Request, Response } from 'express';
import bd from '../database/db'

class CoctailController{
    async createCoctail(req: Request,res: Response){
        const {name, ingredient, countIngredient,
               author, likes, saved,
               watched, recept, image} = req.body
               
        const newCoctail = await bd.query(
            `INSERT INTO coctails (name, ingredient, countIngredient, 
                                   author, likes, saved,
                                   watched, recept, image)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
            [name, ingredient, countIngredient, author, likes, saved, watched, recept,image])
        res.json(newCoctail.rows)
    }
    async getCoctails(req: Request,res: Response){
        const Coctails = await bd.query(`select * from coctails`)
        res.json(Coctails.rows[0])
    }
    async deleteCoctail(req: Request,res: Response){
        const id = req.params.id
        const Coctail = await bd.query('delete from coctails where id = $1',[id])
        res.json(Coctail.rows[0])
    }
    async getOneCoctail(req: Request,res: Response){
        const id = req.params.id
        const Coctail = await bd.query(`select * from coctails where id = $1`,[id])
        res.json(Coctail.rows[0])
    }
    async updateCoctail(req: Request,res: Response){
        const id = req.params.id
        const {name, recept, ingredient, countIngredient} = req.body
        const updatedCoctail = await bd.query(
            `UPDATE coctails set name = $1, surname = $2 where id = $3`,
            [name,recept, ingredient, countIngredient,id]
        )
        res.json(updatedCoctail.rows[0])
    }

}

export default new CoctailController()