from dotenv import load_dotenv
load_dotenv()
# loads env variables into the process environment (os.environ)
import os
import requests
from langchain_google_genai import ChatGoogleGenerativeAI
from fastapi import HTTPException


def fetch_thumbnail(videoId : str):
        api_key = os.getenv("YOUTUBE_API_KEY")  #dotenv doesn't work in production
        url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet&id={videoId}&key={api_key}"
        
        data = requests.get(url).json()
        
        # print(data)
        if(len(data["items"]) == 0):
            raise HTTPException(status_code=404, detail="Video not found")
        result = {}
        result["img_url"] = data["items"][0]["snippet"]["thumbnails"]["standard"]["url"]
        result["title"] = data["items"][0]["snippet"]["title"]
        return result 
        
        
    
    
# print(fetch_thumbnail("gIwgSpEg6ZY"))

# def fetch_transcript(videoId : str):
    