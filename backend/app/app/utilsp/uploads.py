import shutil
from pathlib import Path
from tempfile import NamedTemporaryFile
from fastapi import UploadFile
from app.core.config import settings

def save_upload_file(upload_file: UploadFile) -> Path:
    try:
        suffix = Path(upload_file.filename).suffix
        with NamedTemporaryFile(delete=False, suffix=suffix, dir= settings.UPLOAD_FILES_DIRS) as tmp:
            shutil.copyfileobj(upload_file.file, tmp)
            tmp_path = Path(tmp.name)
    finally:
        upload_file.file.close()
    return tmp_path
