import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios"
import { Youtube } from "lucide-react"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "react-toastify";
import { useRef } from "react";

const QuestionAnswerPage = () => {
    const { id } = useParams()
    const [videoInfo, setVideoInfo] = useState(null)
    const [error, setError] = useState("")
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const bottomRef = useRef(null);
    const API = import.meta.env.VITE_API_URL;
    // console.log("hi")

    useEffect(() => {
        const fetch_thumbnail = async () => {
            try {
                // console.log("This was called")
                const { data } = await axios.get(`${API}video/${id}`)
                // console.log(data)
                setVideoInfo(data)
                setError("")
            } catch (err) {
                // console.log("ye chal rha ")
                setError(err?.response?.data?.detail)
                // console.log(err?.response?.data?.detail)
            }
        }

        fetch_thumbnail()
    }, [id])


    const fetchAnswer = async () => {
        if (question.length === 0) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return toast.error("Please ask a valid question !");
        }

        try {
            setIsLoading(true)
            setAnswer("")
            const body = {
                "question" : question
            }
            const config = {
                headers: {
                    "Content-type": "application/json"
                },
            }
            const { data } = await axios.post(`${API}ai/${id}` , body , config)
            setIsLoading(false)
            setAnswer(data)
        } catch (err) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            // console.log("error aya hai ",err)
            setIsLoading(false)
            setAnswer("")
            return toast.error("Internal Server Error");
        }
    }

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [answer]);

    return (
        <div>
            {(error) ? (<div>
                <p>Please provide a valid video id!</p>
            </div>) : ((videoInfo) ? (
                <>
                    <div className="h-80 flex items-center justify-center mb-2">
                        <img src={videoInfo?.img_url} className="h-full object-fill"></img>
                    </div>
                    <div className="text-center flex items-center justify-center"><h4 className="text-red-500 mr-2 mb-2"><Youtube className="mt-2" /></h4>{" "}{videoInfo?.title}</div>
                    <div className="mt-2 mb-2">
                        <Card>
                            {/* <CardHeader>
                                        <h1 className="text-center text-lg font-bold">Ask Questions About a YouTube Video</h1>
                                    </CardHeader> */}
                            <CardContent>
                                <Field>
                                    <FieldLabel htmlFor="input-field-question">Ask your question</FieldLabel>
                                    <div className="flex ">
                                        <Input
                                            id="input-field-question"
                                            type="text"
                                            placeholder="e.g. Summarize this video"
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                        />
                                        <Button className="bg-red-500 ms-2" variant={"outline"} onClick={() => setQuestion("")}>Clear Question</Button>
                                    </div>
                                    {(isLoading) ? (<Spinner />) : (<Button className="bg-blue-500 mb-2" variant={"outline"} onClick={fetchAnswer}>Ask</Button>)}
                                </Field>
                                {answer && (
                                    <Field>
                                        <FieldLabel htmlFor="textarea-message">Answer</FieldLabel>
                                        <div className="flex h-64">
                                            <Textarea id="textarea-message" value={answer} readOnly className="" />
                                            <Button className="bg-red-500 ms-2" variant={"outline"} onClick={() => setAnswer("")}>Clear Answer</Button>
                                        </div>
                                    </Field>
                                )}
                            </CardContent>
                            {/* <CardFooter className="flex items-center justify-center">
                                        <Button onClick={fetch_details} variant="outline" className="bg-gray-50">Load Video</Button>
                                    </CardFooter> */}
                        </Card>
                    </div>
                </>
            ) : (<>Loading ...</>))}

        </div>
    )
}

export default QuestionAnswerPage