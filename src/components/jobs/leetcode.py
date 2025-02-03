import speech_recognition as sr
import webbrowser
from datetime import datetime
from fuzzywuzzy import fuzz

def open_leetcode_daily():
    today = datetime.now().strftime("%Y-%m-%d")
    url = f"https://leetcode.com/problemset/all/?daily={today}"
    webbrowser.open(url)
    print(f"Opening LeetCode Daily Problem for {today}...")

def listen_for_command():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening for 'open leetcode' command...")
        recognizer.adjust_for_ambient_noise(source)  # Adjust for background noise
        try:
            audio = recognizer.listen(source)
            command = recognizer.recognize_google(audio).lower()
            print(f"Recognized command: {command}")
            if fuzz.ratio(command, "open leetcode") > 80:  # Fuzzy matching
                open_leetcode_daily()
            else:
                print("Command not recognized. Try saying 'open leetcode'.")
        except sr.UnknownValueError:
            print("Sorry, I couldn't understand the audio.")
        except sr.RequestError as e:
            print(f"Could not request results; {e}")

if __name__ == "__main__":
    listen_for_command()
