import face_recognition
import os
import cv2
import numpy as np
from flask import Flask, request, jsonify

app = Flask(__name__)

# Path to the directory where student images are stored
STUDENT_IMAGES_DIR = "./student_images"

# Load known student images and encode them
known_face_encodings = []
known_face_names = []

for filename in os.listdir(STUDENT_IMAGES_DIR):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        image_path = os.path.join(STUDENT_IMAGES_DIR, filename)
        image = face_recognition.load_image_file(image_path)
        encoding = face_recognition.face_encodings(image)[0]
        known_face_encodings.append(encoding)
        known_face_names.append(os.path.splitext(filename)[0])

@app.route('/recognize', methods=['POST'])
def recognize():
    if 'image' not in request.files:
        return jsonify({"success": False, "message": "No image provided"}), 400

    file = request.files['image']
    image = face_recognition.load_image_file(file)

    # Find all face encodings in the uploaded image
    face_encodings = face_recognition.face_encodings(image)

    if not face_encodings:
        return jsonify({"success": False, "message": "No face detected"}), 400

    # Compare the first face found in the image with known faces
    face_encoding = face_encodings[0]
    matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
    face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)

    best_match_index = np.argmin(face_distances)
    if matches[best_match_index]:
        student_name = known_face_names[best_match_index]
        return jsonify({"success": True, "student_name": student_name})

    return jsonify({"success": False, "message": "No match found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
