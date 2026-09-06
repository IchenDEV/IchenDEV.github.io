#!/usr/bin/env bash
# Compress an image in-place for web use.
# Target: keep same extension, aim for <= 500KB when possible.
set -euo pipefail

file="${1:?usage: recompress-image.sh <file>}"
[[ -f "$file" ]] || exit 0

ext="${file##*.}"
ext_lc="$(printf '%s' "$ext" | tr '[:upper:]' '[:lower:]')"
case "$ext_lc" in
  jpg|jpeg|png|webp|gif) ;;
  *) exit 0 ;;
esac

# Skip tiny files
size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
if (( size <= 500 * 1024 )); then
  exit 0
fi

tmp="$(mktemp "${TMPDIR:-/tmp}/recompress.XXXXXX.${ext_lc}")"
cleanup() { rm -f "$tmp"; }
trap cleanup EXIT

# Progressive quality until under budget or floor reached
resize='1920x1920>'
qualities=(85 78 70 62 55)

for q in "${qualities[@]}"; do
  case "$ext_lc" in
    jpg|jpeg)
      magick "$file" -auto-orient -resize "$resize" -strip -sampling-factor 4:2:0 -interlace Plane -quality "$q" "$tmp"
      ;;
    webp)
      magick "$file" -auto-orient -resize "$resize" -strip -quality "$q" "$tmp"
      ;;
    png)
      # Photos often land as PNG; strip + max compression. If still huge, try JPEG-ish quality via png.
      magick "$file" -auto-orient -resize "$resize" -strip -define png:compression-level=9 -define png:compression-filter=5 -quality "$q" "$tmp"
      ;;
    gif)
      magick "$file" -auto-orient -resize "$resize" -strip "$tmp"
      ;;
  esac

  new_size=$(stat -f%z "$tmp" 2>/dev/null || stat -c%s "$tmp")
  # Prefer compressed only if smaller
  if (( new_size < size )); then
    cp "$tmp" "$file"
    size=$new_size
  fi
  if (( size <= 500 * 1024 )); then
    break
  fi
done

# Last resort for stubborn PNG photos: convert to JPEG bytes is wrong for .png path.
# Instead shrink dimensions further.
if (( size > 500 * 1024 )) && [[ "$ext_lc" == "png" || "$ext_lc" == "jpg" || "$ext_lc" == "jpeg" ]]; then
  for dim in 1600 1280 1024; do
    case "$ext_lc" in
      jpg|jpeg)
        magick "$file" -auto-orient -resize "${dim}x${dim}>" -strip -sampling-factor 4:2:0 -quality 68 "$tmp"
        ;;
      png)
        magick "$file" -auto-orient -resize "${dim}x${dim}>" -strip -define png:compression-level=9 -quality 68 "$tmp"
        ;;
    esac
    new_size=$(stat -f%z "$tmp" 2>/dev/null || stat -c%s "$tmp")
    if (( new_size < size )); then
      cp "$tmp" "$file"
      size=$new_size
    fi
    if (( size <= 500 * 1024 )); then
      break
    fi
  done
fi
