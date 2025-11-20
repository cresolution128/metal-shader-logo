'use client';

import { Canvas } from '@/hero/canvas';
import { defaultParams } from '@/hero/params';
import { useEffect, useState } from 'react';

const APPLE_LOGO_ID = '01JMFPY99JXXKRQWDAHBY0ARQH';

export default function Home() {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [processing, setProcessing] = useState<boolean>(true);

  useEffect(() => {
    setProcessing(true);

    async function loadImage() {
      try {
        const res = await fetch(`https://p1ljtcp1ptfohfxm.public.blob.vercel-storage.com/${APPLE_LOGO_ID}.png`);
        const blob = await res.blob();
        const bitmap = await createImageBitmap(blob);

        // Create a temporary canvas to turn the image back into imageData for the shader
        const canvas = document.createElement('canvas');
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(bitmap, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
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
