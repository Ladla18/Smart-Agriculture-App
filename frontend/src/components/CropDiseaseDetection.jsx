import React, { useState, useRef, useEffect } from "react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Upload, Camera, Loader2, Volume2, Languages } from "lucide-react";
import { diseaseDetectionService } from "../services/diseaseDetectionService";
import { translationService } from "../services/translationService";
import { toast } from "react-hot-toast";

export const CropDiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedResult, setTranslatedResult] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const speechSynthRef = useRef(null);

  useEffect(() => {
    loadModel();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (speechSynthRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const loadModel = async () => {
    try {
      await diseaseDetectionService.loadModel();
      setIsModelLoading(false);
    } catch (error) {
      toast.error("Failed to load disease detection model");
      setIsModelLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setSelectedImage(file);
        setResult(null);
        setTranslatedResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
    } catch (error) {
      toast.error("Failed to access camera");
    }
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);

    canvas.toBlob((blob) => {
      setSelectedImage(blob);
      setPreview(canvas.toDataURL("image/jpeg"));
      setResult(null);
      setTranslatedResult(null);
    }, "image/jpeg");

    // Stop the camera stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const detectDisease = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    try {
      const img = new Image();
      img.src = preview;
      await img.decode(); // Ensure image is loaded

      const detection = await diseaseDetectionService.analyzeImage(img);
      setResult(detection);
      setTranslatedResult(null);
    } catch (error) {
      console.error("Detection error:", error);
      toast.error("Failed to analyze image");
    } finally {
      setIsLoading(false);
    }
  };

  const translateToHindi = async () => {
    if (!result) return;

    setIsTranslating(true);
    try {
      const translatedData = {
        mainPrediction: {
          disease: await translationService.translateToHindi(
            result.mainPrediction.disease
          ),
          probability: result.mainPrediction.probability,
          description: await translationService.translateToHindi(
            result.mainPrediction.description
          ),
          treatments: await Promise.all(
            result.mainPrediction.treatments.map((treatment) =>
              translationService.translateToHindi(treatment)
            )
          ),
        },
        secondaryPredictions: await Promise.all(
          result.secondaryPredictions.map(async (pred) => ({
            disease: await translationService.translateToHindi(pred.disease),
            probability: pred.probability,
          }))
        ),
      };

      setTranslatedResult(translatedData);
    } catch (error) {
      console.error("Translation error:", error);
      toast.error("Failed to translate results");
    } finally {
      setIsTranslating(false);
    }
  };

  const speakText = (text, lang = "en-US") => {
    if (speechSynthRef.current) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.onend = () => setIsPlaying(false);
    speechSynthRef.current = utterance;
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  const getTextToSpeak = (isHindi) => {
    const data = isHindi ? translatedResult : result;
    if (!data) return "";

    return `
      ${isHindi ? "मुख्य पहचान परिणाम" : "Primary Detection Result"}:
      ${data.mainPrediction.disease}.
      ${isHindi ? "विश्वास स्तर" : "Confidence"}: ${(
      data.mainPrediction.probability * 100
    ).toFixed(2)}%.
      ${isHindi ? "विवरण" : "Description"}: ${data.mainPrediction.description}.
      ${isHindi ? "अनुशंसित उपचार" : "Recommended Treatments"}:
      ${data.mainPrediction.treatments.join(", ")}.
    `;
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Card className="p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Crop Disease Detection
        </h2>

        {isModelLoading ? (
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 animate-spin mx-auto" />
            <p className="mt-2">Loading disease detection model...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => fileInputRef.current.click()}
                className="flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Image</span>
              </Button>
              <Button
                onClick={startCamera}
                className="flex items-center space-x-2"
              >
                <Camera className="w-4 h-4" />
                <span>Use Camera</span>
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div className="flex flex-row space-x-6">
              <div className="flex-shrink-0 w-1/2">
                {streamRef.current ? (
                  <div className="space-y-4">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full rounded-lg"
                    />
                    <Button onClick={captureImage} className="w-full">
                      Capture Image
                    </Button>
                  </div>
                ) : (
                  preview && (
                    <div className="space-y-4">
                      <img
                        src={preview}
                        alt="Selected crop"
                        className="w-full rounded-lg"
                      />
                      <Button
                        onClick={detectDisease}
                        disabled={isLoading}
                        className="w-full"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Analyzing...</span>
                          </div>
                        ) : (
                          "Detect Disease"
                        )}
                      </Button>
                    </div>
                  )
                )}
              </div>

              {result && (
                <div className="flex-1 bg-white rounded-lg p-4 shadow-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                      {translatedResult
                        ? "परिणाम (हिंदी में)"
                        : "Primary Detection Result"}
                    </h3>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => {
                          if (translatedResult) {
                            setTranslatedResult(null);
                          } else {
                            translateToHindi();
                          }
                        }}
                        disabled={isTranslating}
                        size="sm"
                        variant="outline"
                      >
                        {isTranslating ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Languages className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        onClick={() => {
                          if (isPlaying) {
                            window.speechSynthesis.cancel();
                            setIsPlaying(false);
                          } else {
                            speakText(
                              getTextToSpeak(!!translatedResult),
                              translatedResult ? "hi-IN" : "en-US"
                            );
                          }
                        }}
                        size="sm"
                        variant="outline"
                      >
                        <Volume2
                          className={`w-4 h-4 ${
                            isPlaying ? "text-green-500" : ""
                          }`}
                        />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">
                        {translatedResult
                          ? "पहचानी गई बीमारी:"
                          : "Detected Disease: "}
                      </span>
                      {translatedResult
                        ? translatedResult.mainPrediction.disease
                        : result.mainPrediction.disease}
                    </p>
                    <p>
                      <span className="font-medium">
                        {translatedResult ? "विश्वास स्तर:" : "Confidence: "}
                      </span>
                      {(
                        (translatedResult || result).mainPrediction
                          .probability * 100
                      ).toFixed(2)}
                      %
                    </p>
                    <p>
                      <span className="font-medium">
                        {translatedResult ? "विवरण:" : "Description: "}
                      </span>
                      {translatedResult
                        ? translatedResult.mainPrediction.description
                        : result.mainPrediction.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">
                      {translatedResult
                        ? "अनुशंसित उपचार:"
                        : "Recommended Treatments:"}
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {(
                        translatedResult || result
                      ).mainPrediction.treatments.map((treatment, index) => (
                        <li key={index}>{treatment}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">
                      {translatedResult
                        ? "अन्य संभावित स्थितियां:"
                        : "Other Possible Conditions:"}
                    </h4>
                    <div className="text-sm text-gray-600">
                      {(translatedResult || result).secondaryPredictions.map(
                        (pred, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{pred.disease}</span>
                            <span>{(pred.probability * 100).toFixed(2)}%</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};
