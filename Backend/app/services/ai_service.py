from youtube_transcript_api import YouTubeTranscriptApi ,TranscriptsDisabled
from langchain_classic.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings , ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv
from langchain_core.runnables import RunnableSequence , RunnableLambda
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain.messages import HumanMessage , AIMessage
import os

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")  #dotenv doesn't work in production

splitter = RecursiveCharacterTextSplitter(
    chunk_size = 500 ,
    chunk_overlap = 100 
)

embedding =GoogleGenerativeAIEmbeddings(
    model="gemini-embedding-001" ,
    api_key=api_key
)

vector_store_cache={}
chat_history=[]

prompt=PromptTemplate(
    template=
    """
    You are a helpful assistant.

    Answer the question using ONLY the provided transcript context.
    If the answer cannot be found in the context, say "I don't know".

    Conversation History:
    {chat_history}

    Transcript Context:
    {context}

    Current Question:
    {question}
    """ ,
    input_variables=["chat_history" , "context" , "question"]
)

model = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash" ,
    api_key=api_key
)

parser = StrOutputParser()

def fetch_transcript(id : str):
    transcript=""
    yt = YouTubeTranscriptApi()
    transcript_list = yt.fetch(video_id=id , languages=["en" , "hi"])
    
    for ele in transcript_list:
        transcript+=ele.text
        
    return transcript

def generate_chunks(transcript : str):
    chunks = splitter.create_documents([transcript])
    return chunks

def generate_vectore_store(chunks):
    vector_store = FAISS.from_documents(
        documents=chunks ,
        embedding=embedding
    )
    
    return vector_store

vector_chain = RunnableLambda(fetch_transcript) | RunnableLambda(generate_chunks) | RunnableLambda(generate_vectore_store)
llm_chain = prompt | model | parser

def generate_answer(question : str , id : str):
    
    if( id not in vector_store_cache ):
        vector_store_cache[id] = vector_chain.invoke(id)
        # print("repeat")
        
    vector_store = vector_store_cache[id]
    
    retriever = vector_store.as_retriever(
        search_type="similarity" ,
        search_kwargs = {"k" : 4}
    )
    
    docs = retriever.invoke(question)
    context=""
    for doc in docs :
        context+=doc.page_content
        context+="\n\n"
    # print(context)
    # print(chat_history)
    answer = llm_chain.invoke({"chat_history" : chat_history , "context" : context , "question" : question})
    
    chat_history.append(HumanMessage(question))
    chat_history.append(AIMessage(answer))
    
    return answer
    
    
