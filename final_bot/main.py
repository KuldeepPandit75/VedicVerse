from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # Import CORS
import os
import google.generativeai as genai
from dotenv import load_dotenv
import PyPDF2
import io

# Configure the API key
load_dotenv()
api_key = "AIzaSyAOu5I-ZsaZMTkaV78xIiOfBAazGY-nWV0"
genai.configure(api_key=api_key)

# Create the model configuration
generation_config = {
  "temperature": 0.7,  # Slightly reduced for more focused responses
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

# Global variables to store the chat sessions
chat_session = None
saint_session = None
vedic_math_session = None

app = Flask(__name__)

CORS(app, resources={
    "/predictu": {"origins": ["http://localhost:5173",'https://vedic-verse.vercel.app/']},
    "/saint_guidance": {"origins": ["http://localhost:5173",'https://vedic-verse.vercel.app/']},
    "/vedic_math": {"origins": ["http://localhost:5173",'https://vedic-verse.vercel.app/']}
})

def extract_text_from_pdf(pdf_file):
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

# Initialize chat sessions
if chat_session is None:
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
        system_instruction="user will give you a sanskrit shlok written in sanskrit or english written sanskrit you just need to give its deep and detailed and full translation to the language that is mentioned in the first word and avoid the first word in the translation nothing else no greeting no being smart no improv.",
    )
    chat_session = model.start_chat(history=[])

@app.post("/saint_guidance/upload")
def upload_knowledge():
    global saint_session
    if 'pdf' not in request.files:
        return jsonify({"error": "No PDF file provided"}), 400
    
    pdf_file = request.files['pdf']
    if pdf_file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # Extract text from PDF
    pdf_text = extract_text_from_pdf(pdf_file)
    
    # Initialize saint model with PDF knowledge
    saint_model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
        system_instruction=f"""You are a wise and compassionate saint who guides travelers with spiritual wisdom. 
        Your knowledge comes from the following text: {pdf_text}
        
        As a saint, you should:
        1. Provide guidance based on the knowledge from the provided text
        2. Be compassionate and understanding in your responses
        3. Use simple language to explain complex concepts
        4. Share relevant quotes or teachings when appropriate
        5. Maintain a calm and peaceful tone
        6. Focus on practical wisdom that can help travelers in their journey
        7. Always respond in the same language that the user uses (e.g., if they write in Hindi, respond in Hindi; if they write in Hinglish, respond in Hinglish; if they write in English, respond in English)
        8. Maintain the same level of formality and style as the user's message
        
        Remember to stay within the scope of the knowledge provided in the text."""
    )
    
    saint_session = saint_model.start_chat(history=[])
    return jsonify({"message": "Knowledge base initialized successfully"})

@app.post("/vedic_math/upload")
def upload_vedic_math_knowledge():
    global vedic_math_session
    print(request.files)
    if 'pdf' not in request.files:
        return jsonify({"error": "No PDF file provided"}), 400
    
    pdf_file = request.files['pdf']
    if pdf_file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # Extract text from PDF
    pdf_text = extract_text_from_pdf(pdf_file)
    
    # Initialize Vedic mathematics teacher model with PDF knowledge
    vedic_math_model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
        system_instruction=f"""You are a wise and knowledgeable Vedic mathematics teacher who teaches ancient mathematical techniques. 
        Your knowledge comes from the following text: {pdf_text}
        
        As a Vedic mathematics teacher, you should:
        1. Explain Vedic mathematical concepts clearly and concisely
        2. Provide step-by-step explanations for solving problems using Vedic methods
        3. Compare Vedic methods with conventional methods to highlight their advantages
        4. Use examples to illustrate concepts
        5. Be patient and encouraging when students have questions
        6. Break down complex concepts into simpler parts
        7. Always respond in the same language that the user uses
        8. Maintain a helpful and supportive tone
        
        Remember to stay within the scope of Vedic mathematics knowledge provided in the text."""
    )
    
    vedic_math_session = vedic_math_model.start_chat(history=[])
    return jsonify({"message": "Vedic mathematics knowledge base initialized successfully"})

@app.post("/saint_guidance")
def get_saint_guidance():
    global saint_session
    if saint_session is None:
        return jsonify({"error": "Knowledge base not initialized. Please upload a PDF first."}), 400
    
    text = request.get_json().get("message")
    if not text:
        return jsonify({"error": "No message provided"}), 400
    
    response = saint_session.send_message(text)
    return jsonify({"answer": response.text})

@app.post("/vedic_math")
def get_vedic_math_guidance():
    global vedic_math_session
    if vedic_math_session is None:
        return jsonify({"error": "Vedic mathematics knowledge base not initialized. Please upload a PDF first."}), 400
    
    text = request.get_json().get("message")
    if not text:
        return jsonify({"error": "No message provided"}), 400
    
    response = vedic_math_session.send_message(text)
    return jsonify({"answer": response.text})

@app.post("/predictu")
def predictu():
    global chat_session
    text = request.get_json().get("message")
    print(text)
    response = chat_session.send_message(text)
    message = {"answer": response.text}
    print(message)
    return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=5000)