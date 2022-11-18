import { createAsyncThunk } from "@reduxjs/toolkit";

type UrlDataType={
    url:string,
    data: any
}
export const PostData = createAsyncThunk(
    'data/post',
    async(URLDATA:UrlDataType)=>{
        const {url, data} = URLDATA
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          return await response.json();
    }
)