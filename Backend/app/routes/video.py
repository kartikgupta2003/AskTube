from fastapi import APIRouter
from app.services.youtube_service import fetch_thumbnail

router = APIRouter()

@router.get("/video/{videoId}")
def get_video(videoId : str):
    return fetch_thumbnail(videoId=videoId)

