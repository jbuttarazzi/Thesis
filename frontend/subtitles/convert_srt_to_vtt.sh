#!/bin/bash
#
# filename: convert_srt_to_vtt.sh
#
# description: Converts all .srt subtitle files to WebVTT (.vtt) format for browser compatibility.
#

echo "Converting .srt files to .vtt format..."

find ../src/assets/videos -name "*.srt" -type f | while read srt_file; do
    if [ ! -f "$srt_file" ]; then
        continue
    fi
    
    # Create corresponding .vtt file
    vtt_file="${srt_file%.srt}.vtt"
    
    # Start with WEBVTT header
    echo "WEBVTT" > "$vtt_file"
    echo "" >> "$vtt_file"
    
    # Convert timestamps (replace commas with periods) and copy content
    sed 's/\([0-9][0-9]:[0-9][0-9]:[0-9][0-9]\),\([0-9][0-9][0-9]\)/\1.\2/g' "$srt_file" >> "$vtt_file"
    
    echo "Created: $(basename "$vtt_file")"
done

echo ""
echo "Conversion complete!"
echo "All .vtt files are ready in ./frontend/src/assets/videos/"
