from dotenv import load_dotenv
import os
from pathlib import Path

env_path = Path(_file_).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
