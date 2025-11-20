'use client';

import { Canvas } from '@/hero/canvas';
import { defaultParams } from '@/hero/params';
import { parseLogoImage } from '@/hero/parse-logo-image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [processing, setProcessing] = useState<boolean>(true);

  useEffect(() => {
    // Clear URL parameters
    if (typeof window !== 'undefined' && window.location.search) {
      window.history.replaceState({}, '', window.location.pathname);
    }

    setProcessing(true);

    async function loadImage() {
      try {
        const { imageData } = await parseLogoImage('/examples/apple-logo.svg');
        setImageData(imageData);
      } catch (error) {
        console.error(error);
      }

      setProcessing(false);
    }

    loadImage();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="aspect-square w-full max-w-[600px]">
        {imageData && <Canvas imageData={imageData} params={defaultParams} processing={processing} />}
      </div>
    </div>
  );
}
