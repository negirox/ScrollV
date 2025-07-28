import { UploadForm } from "@/components/video/upload-form";

export default function UploadPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary font-headline">Upload Video</h1>
        <p className="text-muted-foreground mt-2">
          Share your moment with the world. Let our AI help you with the details.
        </p>
      </header>
      <UploadForm />
    </div>
  );
}
