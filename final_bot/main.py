from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # Import CORS
import os
import google.generativeai as genai
from dotenv import load_dotenv
import whisper
from transformers import pipeline

# Set FFmpeg path explicitly
FFMPEG_PATH = "C:\\Windows\\System32\\ffmpeg.exe"
os.environ["FFMPEG_BINARY"] = FFMPEG_PATH
os.environ["PATH"] += os.pathsep + os.path.dirname(FFMPEG_PATH)

# Configure the API key
load_dotenv()
api_key = "AIzaSyAOu5I-ZsaZMTkaV78xIiOfBAazGY-nWV0"
genai.configure(api_key=api_key)

# Initialize whisper model
whisper_model = whisper.load_model("base")

# Create the model configuration
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

# Global variable to store the chat session
chat_session = None

app = Flask(__name__)

CORS(app, resources={
    "/predictu": {"origins": "http://localhost:5173"},
    "/translate": {"origins": "http://localhost:5173"}
})

#@app.before_request
#def start_chat_session():
chat_session = None
if chat_session is None:
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,

        #VedicVerse Instruction

        system_instruction="user will give you a sanskrit shlok you just need to give its deep and detailed and full translation to the language that is mentioned in the first word and avoid the first word in the translation nothing else no greeting no being smart no improv. ",
    )
    chat_session = model.start_chat(history=[])

@app.post("/predictu")
def predictu():
    global chat_session
    text = request.get_json().get("message")
    print(text)
    response = chat_session.send_message(text)
    message = {"answer": response.text}
    print(message)
    return jsonify(message)

@app.post('/translate')
def translate_audio():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    file_path = os.path.abspath("uploaded_audio.mp3")
    file.save(file_path)
    
    print(f"Saved file to: {file_path}")
    print(f"File exists: {os.path.exists(file_path)}")
    print(f"FFmpeg path: {FFMPEG_PATH}")
    print(f"FFmpeg exists: {os.path.exists(FFMPEG_PATH)}")
    print(f"Current PATH: {os.environ['PATH']}")
    
    try:
        # Convert Speech to Sanskrit Text with specific parameters
        result = whisper_model.transcribe(
            file_path,
            language="sa",  # Sanskrit language code
            fp16=False,     # Disable half-precision for better accuracy
            task="transcribe",
            initial_prompt="This is a Sanskrit verse or shloka. Please transcribe it accurately.",
            temperature=0.0,  # Lower temperature for more deterministic output
            best_of=1,       # Use single best result
            beam_size=5      # Beam search size for better accuracy
        )
        sanskrit_text = result["text"]
        
        print(f"Transcribed text: {sanskrit_text}")
        
        # Clean up the file
        os.remove(file_path)
        
        return jsonify({'sanskrit_text': sanskrit_text})
    except Exception as e:
        print(f"Error during transcription: {str(e)}")
        # Don't remove the file on error so we can debug
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=5000)