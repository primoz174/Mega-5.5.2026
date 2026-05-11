#!/usr/bin/env python3
"""
Generate Megama home page images using Gemini Nano Banana.

Setup:
    pip install google-genai
    export GEMINI_API_KEY="your-key"   # or put in .env at project root

Run:
    python3 scripts/generate-images.py            # generate missing only
    python3 scripts/generate-images.py --force    # regenerate everything
    python3 scripts/generate-images.py --pro      # use Nano Banana Pro
    python3 scripts/generate-images.py --only hero-bg cap-01-ndt
"""

import argparse
import os
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "images" / "home"

# Load .env if present
env_file = ROOT / ".env"
if env_file.exists():
    for line in env_file.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip().strip('"\''))

API_KEY = os.environ.get("GEMINI_API_KEY")

MODEL_FAST = "gemini-2.5-flash-image"
MODEL_PRO = "gemini-3-pro-image-preview"

# Shared color/style direction for visual cohesion
STYLE = (
    "photorealistic editorial photography, cinematic, ultra-sharp, shallow depth of field, "
    "cool blue color grading, deep shadows, dramatic side rim lighting, "
    "professional industrial atmosphere, dark moody, no people faces shown clearly, "
    "no text, no logos, no watermarks, no UI overlays"
)

IMAGES = {
    "hero-bg": {
        "ratio": "16:9",
        "prompt": (
            "Wide cinematic shot inside a dimly lit industrial facility: an NDT inspector "
            "in safety gear holds an ultrasonic flaw detector against a large stainless steel "
            "pipeline weld. Steam in the background, exposed pipework, blue rim light from a "
            "control panel. Out-of-focus background. " + STYLE
        ),
    },
    "weld-macro": {
        "ratio": "16:9",
        "prompt": (
            "Extreme macro close-up of a perfect TIG weld bead on polished stainless steel, "
            "ripple pattern crisp, cool blue reflection from environment, micro details visible, "
            "industrial precision aesthetic. " + STYLE
        ),
    },
    "cap-01-ndt": {
        "ratio": "4:3",
        "prompt": (
            "Gloved hands of a technician operating an ultrasonic NDT probe on a thick metal "
            "pipe weld; portable ultrasonic flaw detector screen visible at the edge of frame "
            "showing waveform; warm sodium light mixed with cool blue ambient. " + STYLE
        ),
    },
    "cap-02-nadzori": {
        "ratio": "4:3",
        "prompt": (
            "Welding supervisor in safety helmet and high-vis jacket observing a TIG welder "
            "(welding sparks visible, blue arc glow) on a large industrial assembly; clipboard "
            "in hand, focused on quality control, factory hall background, dramatic light. " + STYLE
        ),
    },
    "cap-03-qaqc": {
        "ratio": "4:3",
        "prompt": (
            "Top-down overhead shot of an engineer's workspace: technical welding drawings, "
            "calipers, a folder labeled with quality stamps (illegible), a hard hat to the side, "
            "dark wood/metal desk, dramatic single-source lighting. " + STYLE
        ),
    },
    "cap-04-svetovanje": {
        "ratio": "4:3",
        "prompt": (
            "Two engineers in safety vests reviewing a large technical drawing in front of a "
            "stainless-steel pressure vessel in an industrial workshop; collaborative consultation "
            "scene, gestural pointing, depth of field on the drawing. " + STYLE
        ),
    },
}


def generate(client, name, spec, model, force):
    out = OUT_DIR / f"{name}.png"
    if out.exists() and not force:
        print(f"  · skip   {name} (exists)")
        return
    from google.genai import types
    print(f"  ↳ gen    {name} ({spec['ratio']}) ...", flush=True)
    t0 = time.time()
    resp = client.models.generate_content(
        model=model,
        contents=[spec["prompt"]],
        config=types.GenerateContentConfig(
            response_modalities=["IMAGE"],
            image_config=types.ImageConfig(aspect_ratio=spec["ratio"]),
        ),
    )
    saved = False
    for cand in resp.candidates or []:
        for part in (cand.content.parts or []):
            if getattr(part, "inline_data", None) and part.inline_data.data:
                out.write_bytes(part.inline_data.data)
                saved = True
                break
        if saved:
            break
    dt = time.time() - t0
    if saved:
        print(f"    ✓ {name}.png  ({out.stat().st_size // 1024} KB, {dt:.1f}s)")
    else:
        print(f"    ✗ {name}: no image returned", file=sys.stderr)


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--force", action="store_true", help="regenerate even if file exists")
    p.add_argument("--pro", action="store_true", help="use Nano Banana Pro (slower, better)")
    p.add_argument("--only", nargs="+", default=None, help="generate only these names")
    args = p.parse_args()

    if not API_KEY:
        print("ERROR: GEMINI_API_KEY not set. Add to .env or export it.", file=sys.stderr)
        sys.exit(1)

    try:
        from google import genai
    except ImportError:
        print("ERROR: pip install google-genai", file=sys.stderr)
        sys.exit(1)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    client = genai.Client(api_key=API_KEY)
    model = MODEL_PRO if args.pro else MODEL_FAST
    print(f"Model: {model}")
    print(f"Out:   {OUT_DIR}\n")

    targets = args.only or list(IMAGES.keys())
    for name in targets:
        if name not in IMAGES:
            print(f"  ! unknown: {name}", file=sys.stderr)
            continue
        try:
            generate(client, name, IMAGES[name], model, args.force)
        except Exception as e:
            print(f"  ✗ {name}: {e}", file=sys.stderr)


if __name__ == "__main__":
    main()
