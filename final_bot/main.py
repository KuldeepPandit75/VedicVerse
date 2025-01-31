from flask import Flask, render_template, request, jsonify, session
from flask_cors import CORS  # Import CORS
import os
import google.generativeai as genai

# Configure the API key
genai.configure(api_key="AIzaSyBBNkD1EN-d9ibioxvm1y0cYfenY2xyQ1o")

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
app.secret_key = "@1212324dsfdsagjhgjhgjhgjhgjhgjgj"  # Necessary if using Flask session

CORS(app, resources={"/predictu": {"origins": "http://localhost:5173"}})

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

if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0',port=5000)