import React, { useState } from "react";
import axios from "axios"
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
import {useNavigate} from "react-router-dom"

const HomePage = () => {
    const [videoId, setVideoId] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const fetch_details = () => {
        if (videoId.length === 0) {
            setError("Please enter a valid Video Id")
            return;
        }
        setError("")
        navigate(`/search/${videoId}`)
    }
    return (
        <Card>
            <CardHeader>
                <h1 className="text-center text-lg font-bold">Ask Questions About a YouTube Video</h1>
            </CardHeader>
            <CardContent>
                <Field>
                    <FieldLabel htmlFor="input-field-videoid">Enter YouTube Video ID</FieldLabel>
                    <Input
                        id="input-field-videoid"
                        type="text"
                        placeholder="e.g. dQw4w9WgXcQ"
                        value={videoId}
                        onChange={(e) => setVideoId(e.target.value)}
                    />
                    {(error.length > 0) && (<p className="text-red-500">{"* "}{error}</p>)}
                    <FieldDescription>
                        Paste the video ID from a YouTube URL to load the video transcript.
                    </FieldDescription>
                </Field>
            </CardContent>
            <CardFooter className="flex items-center justify-center">
                <Button onClick={fetch_details} variant="outline" className="bg-gray-50">Load Video</Button>
            </CardFooter>
        </Card>
    )
}

export default HomePage