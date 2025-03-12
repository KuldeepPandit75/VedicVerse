from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

# Initialize the Hugging Face NLLB-200 full version model and tokenizer
model_name = "facebook/nllb-200-1.3B"  # Full version with 1.3B parameters
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Move model to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Configure Flask
app = Flask(__name__)
CORS(app, resources={"/predictu": {"origins": "http://localhost:5173"}})

# Function to translate text using NLLB-200
def translate_text(text, target_lang):
    source_lang = 'sa'  # Sanskrit as source language
    tokenizer.src_lang = source_lang  # Set the source language to Sanskrit

    # Encode the text using the tokenizer
    encoded = tokenizer(text, return_tensors="pt", padding=True, truncation=True).to(device)
    
    # Generate translation
    with torch.no_grad():
        generated_tokens = model.generate(
            **encoded, forced_bos_token_id=tokenizer.get_lang_id(target_lang)
        )

    # Decode the translated tokens to text
    translated_text = tokenizer.decode(generated_tokens[0], skip_special_tokens=True)
    return translated_text

@app.post("/predictu")
def predictu():
    # Get the request data
    data = request.get_json()
    message = data.get("message")
    target_language = data.get("target_language")  # The target language for translation

    # Language mapping dictionary for the supported languages in NLLB-200
    lang_dic = {
        "Hindi": "hi", 
        "English": "en", 
        "French": "fr", 
        "Spanish": "es", 
        "Arabic": "ar", 
        "Marathi": "mr", 
        "Bhojpuri": "bho"
    }

    # Translate the message using NLLB-200
    tar_lang_code = lang_dic.get(target_language)
    if tar_lang_code is None:
        return jsonify({"error": "Invalid target language"}), 400
    
    translated_message = translate_text(message, tar_lang_code)
    
    # Return the translated message as the response
    return jsonify({"answer": translated_message})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
