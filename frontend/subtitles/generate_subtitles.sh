#!/bin/bash
#
# filename: generate_subtitles.sh
#
# description: Generates SRT subtitles using Whisper for all videos, then converts to VTT format.
#

echo "=========================================="
echo "Generating subtitles for videos..."
echo "=========================================="
echo ""

# Set video directory
VIDEO_DIR="../src/assets/videos"

if [ ! -d "$VIDEO_DIR" ]; then
    echo "Error: Video directory not found: $VIDEO_DIR"
    exit 1
fi

echo "Step 1: Transcribing videos with Whisper..."
echo ""

# Find all video files and transcribe them
find "$VIDEO_DIR" -type f \( -name "*.mp4" -o -name "*.avi" -o -name "*.mov" -o -name "*.mkv" -o -name "*.webm" \) | while read video_file; do
    # Get the directory and filename without extension
    dir=$(dirname "$video_file")
    filename=$(basename "$video_file")
    basename_no_ext="${filename%.*}"
    srt_file="$dir/$basename_no_ext.srt"
    
    # Only transcribe if SRT doesn't exist
    if [ ! -f "$srt_file" ]; then
        echo "Transcribing: $filename"
        
        # Check if whisper is installed
        if ! command -v whisper &> /dev/null; then
            echo "Error: whisper not found. Install with: pip install openai-whisper"
            exit 1
        fi
        
        # Run whisper to generate SRT
        whisper "$video_file" \
            --output_format srt \
            --output_dir "$dir" \
            --model base \
            --language en
        
        if [ $? -eq 0 ]; then
            echo "✓ Created: $srt_file"
        else
            echo "✗ Error transcribing: $filename"
        fi
    else
        echo "Skip: $srt_file already exists"
    fi
done

echo ""
echo "Step 2: Converting SRT to VTT format..."
echo ""

# Call the SRT to VTT conversion script
bash ./convert_srt_to_vtt.sh

echo ""
echo "=========================================="
echo "Subtitle generation complete!"
echo "=========================================="
