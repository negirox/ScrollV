"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UploadCloud, Wand2, FileVideo, Loader2 } from "lucide-react";
import { generateVideoCaption } from "@/ai/flows/generate-video-caption";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  video: z.any().refine((file) => file instanceof File, "Video file is required."),
  topic: z.string().min(3, "Topic must be at least 3 characters."),
  caption: z.string().optional(),
  description: z.string().optional(),
});

function fileToDataUri(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export function UploadForm() {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      caption: "",
      description: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("video", file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleGenerateCaption = async () => {
    const videoFile = form.getValues("video");
    const topic = form.getValues("topic");

    if (!videoFile || !topic) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload a video and provide a topic first.",
      });
      return;
    }

    setIsGenerating(true);
    try {
        const videoDataUri = await fileToDataUri(videoFile);
        const result = await generateVideoCaption({ videoDataUri, topic });
        form.setValue("caption", result.caption);
        form.setValue("description", result.description);
        toast({
            title: "Success",
            description: "AI captions and description generated!",
        });
    } catch (error) {
        console.error(error);
        toast({
            variant: "destructive",
            title: "AI Generation Failed",
            description: "Could not generate captions. Please try again.",
        });
    } finally {
        setIsGenerating(false);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          return prev;
        }
        return prev + 5;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      setTimeout(() => {
        setIsUploading(false);
        toast({
            title: "Upload Complete!",
            description: `${values.video.name} has been uploaded successfully.`
        })
        form.reset();
        setVideoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
      }, 500)
    }, 4000);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="video"
              render={() => (
                <FormItem>
                  <FormControl>
                    <div
                      className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:bg-accent hover:border-primary transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="video/*"
                        onChange={handleFileChange}
                      />
                      {videoPreview ? (
                        <div className="relative aspect-video max-w-md mx-auto">
                            <video src={videoPreview} controls className="rounded-md w-full h-full" />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <UploadCloud className="h-12 w-12" />
                          <span className="font-semibold text-lg">Click to upload or drag and drop</span>
                          <span className="text-sm">MP4, MOV, AVI, etc. (Max 500MB)</span>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Video Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'My Summer Vacation in Bali'" {...field} />
                  </FormControl>
                  <FormDescription>
                    A short, catchy topic helps people discover your video.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Alert>
              <Wand2 className="h-4 w-4" />
              <AlertTitle>AI Content Assistant</AlertTitle>
              <AlertDescription className="flex justify-between items-center">
                Let AI generate a caption and description for your video based on the topic.
                <Button type="button" size="sm" onClick={handleGenerateCaption} disabled={isGenerating}>
                  {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Wand2 className="mr-2 h-4 w-4" />}
                  Generate
                </Button>
              </AlertDescription>
            </Alert>

            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Caption</FormLabel>
                  <FormControl>
                    <Input placeholder="A witty caption for your video..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about your video. You can include #hashtags here."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isUploading && (
              <div className="space-y-2">
                <p>Uploading...</p>
                <Progress value={uploadProgress} />
              </div>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={isUploading || isGenerating}>
              {isUploading ? "Uploading..." : "Publish Video"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
