import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, GenerateVideosOperation } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// POST /api/generate-video
app.post('/api/generate-video', async (req, res) => {
  try {
    const {
      prompt,
      imageBase64,
      mimeType = 'image/png',
      aspectRatio = '16:9',
      resolution = '720p',
      model = 'veo-3.1-fast-generate-preview',
    } = req.body;

    const config: any = {
      numberOfVideos: 1,
      resolution,
      aspectRatio,
    };

    const payload: any = {
      model,
      prompt:
        prompt ||
        'Cinematic portrait coming to life with subtle natural head motion and gentle blinking, photorealistic studio lighting',
      config,
    };

    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      payload.image = {
        imageBytes: cleanBase64,
        mimeType,
      };
    }

    const operation = await ai.models.generateVideos(payload);
    res.json({ operationName: operation.name });
  } catch (err: any) {
    console.error('generateVideos error:', err);
    res.status(500).json({
      error: err.message || 'Failed to start video generation',
    });
  }
});

// POST /api/video-status
app.post('/api/video-status', async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: 'operationName is required' });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });

    res.json({
      done: updated.done,
      response: updated.response,
      error: updated.error,
    });
  } catch (err: any) {
    console.error('video-status error:', err);
    res.status(500).json({ error: err.message || 'Failed to check status' });
  }
});

// POST /api/video-download
app.post('/api/video-download', async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: 'operationName is required' });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });
    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;

    if (!uri) {
      return res.status(404).json({ error: 'Video URI not found in operation' });
    }

    const videoRes = await fetch(uri, {
      headers: { 'x-goog-api-key': apiKey },
    });

    res.setHeader('Content-Type', 'video/mp4');
    if (videoRes.body) {
      videoRes.body.pipeTo(
        new WritableStream({
          write(chunk) {
            res.write(chunk);
          },
          close() {
            res.end();
          },
        })
      );
    } else {
      const buffer = await videoRes.arrayBuffer();
      res.send(Buffer.from(buffer));
    }
  } catch (err: any) {
    console.error('video-download error:', err);
    res.status(500).json({ error: err.message || 'Failed to download video' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
