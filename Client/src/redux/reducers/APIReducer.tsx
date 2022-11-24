import { createAsyncThunk } from "@reduxjs/toolkit";

export const PostData = createAsyncThunk(
    'data/post',
    async({url, data}:{url: string, data: any})=>{
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          return response.json
    }
)

export const GetData = createAsyncThunk(
  'data/get',
  async({url}:{url: string}) =>{
    const response = await fetch(url, {
      method: 'GET', 
    })
    return response.json()
  }
)