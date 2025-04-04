import pytesseract
import pyautogui
import time

# Set up Tesseract executable path
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'  # Update this path based on your installation

def capture_screen(region=None):
    # Capture the screen or a specific region of the screen
    screenshot = pyautogui.screenshot(region=region)
    return screenshot

def recognize_text(image):
    # Recognize text from the image using Tesseract OCR
    text = pytesseract.image_to_string(image)
    return text

def type_text(text):
    # Simulate typing the text
    pyautogui.typewrite(text)

def main():
    # Define the region to capture (left, top, width, height)
    region = (0, 0, 800, 600)
    
    # Capture the screen
    screenshot = capture_screen(region)
    
    # Recognize text from the screenshot
    recognized_text = recognize_text(screenshot)
    print("Recognized Text:", recognized_text)
    
    # Give some time before typing the text
    time.sleep(2)
    
    # Type the recognized text
    type_text(recognized_text)

if __name__ == "__main__":
    main()