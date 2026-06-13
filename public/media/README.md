# Hero media

The homepage hero is built to play **real documentary footage**.

Drop two files in this folder and the hero uses them automatically - no code change:

| File              | What it is                                  | Recommended specs                        |
| ----------------- | ------------------------------------------- | ---------------------------------------- |
| `hero.mp4`        | Background video (muted, looping)           | 1920×1080, H.264, 8–15s loop, < 6 MB     |
| `hero-poster.jpg` | First frame shown while the video loads     | 1920×1080 JPG                            |

## What to shoot

Authentic, documentary-style, natural light - **not** corporate stock:

- A boda boda rider starting the day
- A market trader opening a stall
- A mother walking with a child
- A nurse assisting a patient
- Everyday community life

Slow, natural movement. No staged smiling actors.

## If no file is present

The hero shows a polished animated cinematic fallback (deep-teal film grain),
so the site always looks complete. The `<video>` simply hides itself on error.

## Tip

Keep the file small so it loads instantly on mobile. Compress with:

```bash
ffmpeg -i raw.mov -vf "scale=1920:-2" -an -c:v libx264 -crf 28 -preset slow -movflags +faststart hero.mp4
```
