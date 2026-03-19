from fastapi import APIRouter
from app.services.ai_service import generate_answer
from app.models.question import Question

router = APIRouter()

@router.post("/ai/{videoId}")
def get_answer(videoId : str , question : Question):
    return generate_answer(question=question.question , id=videoId)

